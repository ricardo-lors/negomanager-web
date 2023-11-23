import { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';


import { FormularioProducto } from '../../../../../interfaces';
import { actualizarProducto, agregarImagenes, crearProducto, obtenerProducto } from '../../../../../store/slices/producto';
import { useAppDispatch } from '../../../../../hooks';
import { RootState } from '../../../../../store';
import { MyCheckbox, MySelect, MyTextInput } from '../../../../shared';
import { Tooltip } from 'react-tooltip';

export const AgregarModificarProductoPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let { id } = useParams();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { provedores } = useSelector((state: RootState) => state.provedor);
    const { categorias } = useSelector((state: RootState) => state.categoria);


    const [producto, setProducto] = useState<FormularioProducto>();

    useEffect(() => {

        if (usuario?.roles.includes('vendedor')) {
            if (!usuario.permisos?.includes('crear_producto') || !usuario.permisos?.includes('editar_producto'))
                return navigate(`/dashboard/${usuario.roles[0]}/producto`, { replace: true });
        }

        id && obtenerProducto(id).then((pd) => {
            console.log(pd)
            setProducto({
                ...pd,
                titulo: pd!.titulo,
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
                provedor: pd?.provedor ? pd!.provedor.id! : "",
                categorias: pd!.categorias,
                attributos: pd?.attributos,
                imagenes: pd?.imagenes?.map((img) => img.url),
                files: undefined,
            })
        });
        //   return () => {
        //     second
        //   }
    }, [id, navigate, usuario?.permisos, usuario?.roles]);

    const { handleSubmit, errors, touched, getFieldProps, values, setFieldValue } = useFormik<FormularioProducto>({
        initialValues: producto ? producto : {
            codigo: '',
            titulo: '',
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
            provedor: '',
            categorias: [],
            imagenes: [],
            files: undefined
        },
        onSubmit: async (values) => {
            console.log(values)
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
                    titulo: values.titulo,
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
                    provedor: values.provedor,
                    imagenes
                }, navigate, usuario!.roles[0]));
            } else {
                console.log({
                    id: producto.id,
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
                    provedor: values.provedor,
                    imagenes
                })
                await dispatch(actualizarProducto({
                    id: producto.id,
                    codigo: values.codigo,
                    titulo: values.titulo,
                    descripcion: values.descripcion,
                    costo: values.costo,
                    ganancia: values.ganancia,
                    precio: values.precio,
                    mayoreo: values.mayoreo,
                    precio_mayoreo: values.precio_mayoreo === 0 ? undefined : values.precio_mayoreo,
                    cantidad_mayoreo: values.cantidad_mayoreo === 0 ? undefined : values.cantidad_mayoreo,
                    inventario: values.inventario,
                    stock: values.stock === 0 ? undefined : values.stock,
                    stock_minimo: values.stock_minimo === 0 ? undefined : values.stock_minimo,
                    stock_maximo: values.stock_maximo === 0 ? undefined : values.stock_maximo,
                    activo: values.activo,
                    categorias: values.categorias,
                    provedor: values.provedor,
                    imagenes
                }, navigate, usuario!.roles[0]));
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
    }, [values.ganancia, values.costo, setFieldValue]);

    useEffect(() => {
        // if (values.costo === 0) return;
        // const porcentaje = ((values.precio - values.costo) / ((values.precio + values.costo) / 2)) * 100;
        // setFieldValue('ganancia', porcentaje);
    }, [values.precio]);

    return (
        <div>
            {/* <button
                className="btn btn-primary me-1"
                data-tooltip-id="btn-agnore-tooltip"
                data-tooltip-content="Agregar producto no registrado"
                data-tooltip-place="right-end"
                onClick={() => setOpenModals(prev => ({ ...prev, modalAgregarProductoNoRegistrado: true }))} >
                <i className="bi bi-bag-plus-fill"></i> Agregar
            </button>
            <Tooltip id="btn-agnore-tooltip" /> */}
            <div className='d-flex justify-content-between mb-1 mt-1'>
                <div>
                    <Link
                        data-tooltip-id='btn-cancel-tooltip'
                        data-tooltip-content='Cancelar'
                        data-tooltip-place="right-end"
                        to={`/dashboard/${usuario?.roles[0]}/producto`}
                        className='btn btn-outline-secondary' replace ><i className="bi bi-arrow-left"></i></Link>
                    <Tooltip id="btn-cancel-tooltip" />
                </div>
                <h2 className='text-center m-0'>{producto ? 'Modificar Producto' : 'Agregar Producto'}</h2>
                <div></div>
            </div>


            <div className='card p-3 mb-2'>

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
                            label="Titulo (Descripción breve del producto – aparece en el ticket)"
                            className="form-control"
                            {...getFieldProps('titulo')}
                        />
                        {/* <MyTextInput
                            label="Descripción detallada"
                            className="form-control"
                            {...getFieldProps('descripcion')}
                        /> */}
                        <div className="mb-2">
                            <label className='form-label' htmlFor=''>Descripción detallada</label>
                            <textarea
                                className="form-control"
                                // value={values.descripcion}
                                cols={10}
                                rows={4}
                                {...getFieldProps('descripcion')} />
                            {/* <span className="text-danger">{errors}</span> */}
                        </div>


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
                        {
                            (usuario?.permisos?.includes('modificar_inventario') || usuario?.roles.includes('administrador')) && <div className="row">
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
                        }
                        <div className="row">
                            <div className="col-6">
                                <MySelect
                                    label="Categoria"
                                    className="form-control"
                                    multiple={true}
                                    // disabled={!values.inventario}
                                    {...getFieldProps('categorias')}
                                >
                                    <option value="" >Sin categorias</option>
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
                                    // multiple={true}
                                    style={{ height: '50' }}
                                    {...getFieldProps('provedor')}
                                >
                                    <option value="" >Sin Provedor</option>
                                    {
                                        provedores?.map(opt => (
                                            <option key={opt.id} value={opt.id}>{opt.nombre}</option>
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
        </div>
    )
}
