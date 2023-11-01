import { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';


import { FormularioProducto } from '../../../../interfaces';
import { actualizarProducto, agregarImagenes, crearProducto, obtenerProducto } from '../../../../store/slices/producto';
import { useAppDispatch } from '../../../../hooks';
import { RootState } from '../../../../store';
import { MyCheckbox, MySelect, MyTextInput } from '../../../shared';

export const AgregarModificarProductoPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let { id } = useParams();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { provedores } = useSelector((state: RootState) => state.provedor);
    const { categorias } = useSelector((state: RootState) => state.categoria);


    const [producto, setProducto] = useState<FormularioProducto>();

    useEffect(() => {
        id && obtenerProducto(id).then((pd) => setProducto({
            ...pd,
            codigo: pd!.codigo,
            descripcion: pd!.descripcion!,
            costo: pd!.costo,
            ganancia: pd!.ganancia,
            precio: pd!.precio,
            mayoreo: pd!.mayoreo,
            precio_mayoreo: pd?.precio_mayoreo,
            cantidad_mayoreo: pd?.cantidad_mayoreo,
            inventario: pd!.inventario,
            stock: pd?.stock,
            stock_minimo: pd?.stock_minimo,
            stock_maximo: pd?.stock_maximo,
            activo: pd!.activo,
            provedores: pd!.provedores,
            categorias: pd!.categorias,
            attributos: pd?.attributos,
            imagenes: pd?.imagenes?.map((img) => img.url),
            files: undefined,
        }));
        //   return () => {
        //     second
        //   }
    }, []);

    const { handleSubmit, errors, touched, getFieldProps, values, handleChange, setFieldValue, setValues } = useFormik<FormularioProducto>({
        initialValues: producto ? producto : {
            codigo: '',
            descripcion: '',
            costo: 0,
            ganancia: 20,
            precio: 0,
            mayoreo: false,
            precio_mayoreo: undefined,
            cantidad_mayoreo: undefined,
            inventario: true,
            stock: undefined,
            stock_minimo: undefined,
            stock_maximo: undefined,
            activo: true,
            provedores: [],
            categorias: [],
            imagenes: [],
            files: undefined
        },
        onSubmit: async (values) => {
            const imagenes: string[] = [...values.imagenes!];  //values.imagenes ? [...values.imagenes.map(img => img)] : [];

            if (values.files?.length && values.files.length > 0) {
                for (let i = 0; i < values.files!.length; i++) {
                    const url = await agregarImagenes(values.files![i]);
                    imagenes.push(url.secureUrl);
                }
            }

            if (!producto) {
                console.log('Hice esta accion');
                await dispatch(crearProducto({
                    codigo: values.codigo,
                    descripcion: values.descripcion,
                    costo: values.costo,
                    ganancia: values.ganancia,
                    precio: values.precio,
                    mayoreo: values.mayoreo,
                    precio_mayoreo: values.precio_mayoreo,
                    cantidad_mayoreo: values.cantidad_mayoreo,
                    inventario: values.inventario,
                    stock: values.stock,
                    stock_minimo: values.stock_minimo,
                    stock_maximo: values.stock_maximo,
                    activo: values.activo,
                    categorias: values.categorias,
                    provedores: values.provedores,
                    imagenes
                }, navigate, usuario!.roles[0]));
            } else {
                console.log('Hice esta accion actualizar');
                // await dispatch(actualizarProducto({
                //     id: producto.id,
                //     codigo: values.codigo,
                //     descripcion: values.descripcion,
                //     stock: values.stock,
                //     stock_minimo: values.stock_minimo,
                //     costo: values.costo,
                //     precio: values.precio,
                //     mayoreo: values.mayoreo,
                //     cantidad_mayoreo: values.cantidad_mayoreo,
                //     precio_mayoreo: values.precio_mayoreo,
                //     categorias: values.categorias,
                //     provedores: values.provedores,
                //     imagenes
                // }, navigate, usuario!.roles[0]));
            }

            // navigate(`/dashboard/${usuario!.roles[0]}/inventario`, { replace: true });
        },
        validationSchema: Yup.object({
            codigo: Yup.string().required('Requerido'),
            cantidad_mayoreo: Yup.number().when('mayoreo', { is: true, then: Yup.number().optional().min(1) })
        }),
        enableReinitialize: true
    });

    useEffect(() => {
        const porcentaje = Number(values.ganancia / 100);
        const precio = values.costo + porcentaje * values.costo;
        setFieldValue('precio', precio);
    }, [values.ganancia, values.costo]);

    useEffect(() => {
        // if (values.costo === 0) return;
        // const porcentaje = ((values.precio - values.costo) / ((values.precio + values.costo) / 2)) * 100;
        // setFieldValue('ganancia', porcentaje);
    }, [values.precio]);

    return (
        <div>
            <Link to={`/dashboard/${usuario?.roles[0]}/inventario`} replace className='btn btn-primary' > <i className="bi bi-arrow-left"></i> Cancelar</Link>

            <div className="row">
                <form className="container mt-2" noValidate onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <MyTextInput
                                label="Codigo"
                                className="form-control"
                                {...getFieldProps('codigo')}
                                errors={errors.codigo}
                            />
                        </div>
                    </div>
                    <MyTextInput
                        label="Descripcion"
                        className="form-control"
                        {...getFieldProps('descripcion')}
                    />
                    <div className="row">
                        <div className="col-4">
                            <MyTextInput
                                min='0'
                                name="costo"
                                type="number"
                                label="Costo (Compra)"
                                placeholder='$0.00'
                                className="form-control"
                                value={values.costo === 0 ? '' : values.costo}
                                onChange={getFieldProps('costo').onChange}
                                errors={(touched.costo && errors.costo) || ''}
                            // {...getFieldProps('costo')}
                            />
                        </div>
                        <div className="col-4">
                            <MyTextInput
                                min='0'
                                name="ganancia"
                                type="number"
                                label="Porcentaje %"
                                placeholder='$0.00'
                                className="form-control"
                                value={values.ganancia === 0 ? '' : values.ganancia}
                                onChange={getFieldProps('ganancia').onChange}
                                errors={(touched.ganancia && errors.ganancia) || ''}
                            // {...getFieldProps('costo')}
                            />
                        </div>
                        <div className="col-4">
                            <MyTextInput
                                min='0'
                                name="precio"
                                type="number"
                                label="Precio (Venta)"
                                placeholder='$0.00'
                                className="form-control"
                                value={values.precio === 0 ? '' : values.precio}
                                onChange={getFieldProps('precio').onChange}
                                errors={(touched.precio && errors.precio) || ''}
                            // {...getFieldProps('precio')}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div>
                            <MyCheckbox
                                checked={values.mayoreo!}
                                label="Mayoreo"
                                // onChange={(e) => { }}
                                {...getFieldProps('mayoreo')}
                            />
                        </div>
                        <div className="col-6">
                            <MyTextInput
                                min='0'
                                name='cantidad_mayoreo'
                                type='number'
                                label='Cantidad'
                                placeholder='0'
                                className="form-control"
                                disabled={!values.mayoreo}
                                value={values.cantidad_mayoreo === undefined ? '' : values.cantidad_mayoreo}
                                onChange={getFieldProps('cantidad_mayoreo').onChange}
                                errors={(touched.cantidad_mayoreo && errors.cantidad_mayoreo) || ''}
                            // {...getFieldProps('cantidad_mayoreo')}
                            />
                        </div>
                        <div className="col-6">
                            <MyTextInput
                                min='0'
                                name='precio_mayoreo'
                                type="number"
                                label="Precio (Venta Mayoreo)"
                                placeholder='0'
                                className="form-control"
                                disabled={!values.mayoreo}
                                value={values.precio_mayoreo === undefined ? '' : values.precio_mayoreo}
                                onChange={getFieldProps('precio_mayoreo').onChange}
                                errors={(touched.precio_mayoreo && errors.precio_mayoreo) || ''}
                            // {...getFieldProps('pr ecio_mayoreo')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <MyCheckbox
                                checked={values.inventario!}
                                label="Inventario"
                                // onChange={(e) => { }}
                                {...getFieldProps('inventario')}
                            />
                        </div>
                        <div className="col-4">
                            <MyTextInput
                                min='0'
                                name='stock'
                                type="number"
                                label="Stock"
                                placeholder='0'
                                className="form-control"
                                disabled={!values.inventario}
                                value={values.stock !== undefined ? values.stock : ''}
                                onChange={getFieldProps('stock').onChange}
                                errors={(touched.stock && errors.stock) || ''}
                            // {...getFieldProps('stock')}
                            />
                        </div>
                        <div className="col-4">
                            <MyTextInput
                                min='0'
                                name='stock_minimo'
                                type='number'
                                label='Stock Minimo'
                                placeholder='0'
                                className="form-control"
                                disabled={!values.inventario}
                                value={values.stock_minimo !== undefined ? values.stock_minimo : ''}
                                onChange={getFieldProps('stock_minimo').onChange}
                                errors={(touched.stock_minimo && errors.stock_minimo) || ''}
                            // {...getFieldProps('stock_minimo')}
                            />
                        </div>
                        <div className="col-4">
                            <MyTextInput
                                min='0'
                                name='stock_maximo'
                                type="number"
                                label="Stock Maximo"
                                placeholder='0'
                                className="form-control"
                                disabled={!values.inventario}
                                value={values.stock_maximo !== undefined ? values.stock_maximo : ''}
                                onChange={getFieldProps('stock_maximo').onChange}
                                errors={(touched.stock_maximo && errors.stock_maximo) || ''}
                            // {...getFieldProps('stock_minimo')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <MySelect
                                label="Categoria"
                                className="form-control"
                                multiple={true}
                                // disabled={!values.inventario}
                                {...getFieldProps('categorias')}
                            >
                                {
                                    categorias?.map(opt => (
                                        <option key={opt.id} value={opt.nombre}>{opt.nombre}</option>
                                    ))
                                }
                            </MySelect>
                        </div>
                        <div className="col">
                            <MySelect
                                label="Provedor"
                                className="form-control"
                                multiple={true}
                                {...getFieldProps('provedores')}
                            >
                                {
                                    provedores?.map(opt => (
                                        <option key={opt.id} value={opt.nombre}>{opt.nombre}</option>
                                    ))
                                }
                            </MySelect>
                        </div>

                    </div>
                    <ul className="list-group list-group-horizontal">
                        {
                            values.imagenes?.map((img, i) => <li key={i} className="list-group-item">
                                <img src={img} height='100' width={150} alt="" />
                            </li>)
                        }
                        {
                            values.files &&
                            Array.from(values.files).map((file) => <li key={file.name} className="list-group-item">
                                <img src={URL.createObjectURL(file)} height='100' width={150} alt="" />
                            </li>)
                        }
                        {/* <img src={URL.createObjectURL(file)} height='100' width={150} alt="" /> */}
                        {/* <div className='list-group-item'>
                            <i className="bi bi-file-earmark-plus" style={{ height: 100, width: 150 }}></i>
                        </div> */}
                    </ul>
                    <div className='mb-3'>
                        <label htmlFor="" className='form-label'>Imagenes</label>
                        <input className='form-control' type="file" multiple onChange={(event) => {
                            setFieldValue('files', event.currentTarget.files);
                        }} />
                    </div>
                    <button type="submit" className="btn btn-primary text-decoration-none w-100">Guardar</button>
                </form>
            </div>
        </div>
    )
}
