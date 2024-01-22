import { KeyboardEvent, KeyboardEventHandler, useEffect, useState } from 'react';

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Almacen, FormularioProducto } from '../../../../../interfaces';
import { agregarImagenes } from '../../../../../store/slices/producto';
import { useAppDispatch } from '../../../../../hooks';
import { RootState, formatearNumero } from '../../../../../store';
import { MyCheckbox, MySelect, MyTextInput } from '../../../../shared';
import { Tooltip } from 'react-tooltip';
import { handleActualizarProducto, handleAgreggrarProducto, obtenerProducto } from '../../../../../store/slices/inventario';

export const AgregarModificarProductoPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let { id } = useParams();

    const location = useLocation();
    const almacen = location.state as Almacen;

    const { usuario } = useSelector((state: RootState) => state.sesion);
    const { provedores } = useSelector((state: RootState) => state.provedor);
    const { categorias } = useSelector((state: RootState) => state.categoria);

    const [producto, setProducto] = useState<FormularioProducto>();

    useEffect(() => {

        if (usuario?.rol === 'vendedor') {
            if (id) {
                if (!usuario.permisos?.includes('editar_producto'))
                    return navigate(`/dashboard/${usuario.rol}/producto`, { replace: true });
            } else {
                if (!usuario.permisos?.includes('crear_producto'))
                    return navigate(`/dashboard/${usuario.rol}/producto`, { replace: true });
            }
        }

        id && obtenerProducto(id).then((pd) => {
            console.log(pd)
            setProducto({
                ...pd,
                tipo: pd!.tipo,
                codigo: pd!.codigo,
                titulo: pd!.titulo,
                descripcion: pd!.descripcion!,
                costo: pd!.costo,
                precio: pd!.precio,
                mayoreo: pd!.mayoreo,
                precio_mayoreo: pd?.precio_mayoreo ? pd.precio_mayoreo : undefined,
                cantidad_mayoreo: pd?.cantidad_mayoreo ? pd.cantidad_mayoreo : undefined,
                control: pd!.control,
                stock: pd?.stock ? pd.stock : undefined,
                stock_minimo: pd?.stock_minimo ? pd.stock_minimo : undefined,
                stock_maximo: pd?.stock_maximo ? pd.stock_maximo : undefined,
                activo: pd!.activo,
                provedor: pd?.provedor ? pd!.provedor.id! : "",
                categoria: pd!.categoria,
                attributos: pd?.attributos,
                imagenes: pd?.imagenes?.map((img) => img.url),
                files: undefined,
            })
        });
        //   return () => {
        //     second
        //   }
    }, [id, navigate, usuario?.permisos, usuario?.rol]);

    const { handleSubmit, errors, touched, getFieldProps, values, setFieldValue, resetForm } = useFormik<FormularioProducto>({
        initialValues: producto ? producto : {
            tipo: 'producto',
            codigo: '',
            titulo: '',
            descripcion: '',
            costo: 0,
            precio: 0,
            mayoreo: false,
            precio_mayoreo: undefined,
            cantidad_mayoreo: undefined,
            control: true,
            stock: undefined,
            stock_minimo: undefined,
            stock_maximo: undefined,
            activo: true,
            provedor: '',
            categoria: '',
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
                await dispatch(handleAgreggrarProducto({
                    tipo: values.tipo,
                    titulo: values.titulo,
                    codigo: values.codigo,
                    descripcion: values.descripcion,
                    costo: values.costo,
                    precio: values.precio,
                    mayoreo: values.mayoreo,
                    precio_mayoreo: values.precio_mayoreo,
                    cantidad_mayoreo: values.cantidad_mayoreo,
                    control: values.control,
                    stock: values.stock,
                    stock_minimo: values.stock_minimo,
                    stock_maximo: values.stock_maximo,
                    activo: values.activo,
                    categoria: values.categoria,
                    provedor: values.provedor,
                    almacen: almacen.id,
                    imagenes
                }, resetForm));
                // , navigate, usuario!.roles[0]
            } else {
                await dispatch(handleActualizarProducto({
                    id: producto.id,
                    tipo: values.tipo,
                    codigo: values.codigo,
                    titulo: values.titulo,
                    descripcion: values.descripcion,
                    costo: values.costo,
                    precio: values.precio,
                    mayoreo: values.mayoreo,
                    precio_mayoreo: values.precio_mayoreo === 0 ? undefined : values.precio_mayoreo,
                    cantidad_mayoreo: values.cantidad_mayoreo === 0 ? undefined : values.cantidad_mayoreo,
                    control: values.control,
                    stock: values.stock === 0 ? undefined : values.stock,
                    stock_minimo: values.stock_minimo === 0 ? undefined : values.stock_minimo,
                    stock_maximo: values.stock_maximo === 0 ? undefined : values.stock_maximo,
                    activo: values.activo,
                    categoria: values.categoria,
                    provedor: values.provedor,
                    imagenes,

                }));
                // navigate, usuario!.roles[0])
            }

            // navigate(`/dashboard/${usuario!.roles[0]}/inventario`, { replace: true });
        },
        validationSchema: Yup.object({
            codigo: Yup.string().required('Requerido'),
            cantidad_mayoreo: Yup.number().when('mayoreo', { is: true, then: Yup.number().required().min(1) }),
            control: Yup.boolean(),
            stock: Yup.number().when('control', { is: true, then: Yup.number().required().min(1) }),
            stock_minimo: Yup.number().when('control', { is: true, then: Yup.number().required().min(1) }),
            stock_maximo: Yup.number().when('control', { is: true, then: Yup.number().required().min(1) }),
        }),
        enableReinitialize: true
    });

    // useEffect(() => {
    // }, [values.ganancia, values.costo, setFieldValue]);

    // useEffect(() => {
    // }, [values.precio]);

    const onKeyDown = (keyEvent: KeyboardEvent<HTMLFormElement>) => {
        if (keyEvent.code === "Enter") {
            keyEvent.preventDefault();
        }
    }

    return (
        <div>
            <div className='d-flex justify-content-between mb-1 mt-1'>
                <div>
                    {/* <Link
                        data-tooltip-id='btn-cancel-tooltip'
                        data-tooltip-content='Cancelar'
                        data-tooltip-place="right-end"
                        to={`/dashboard/almacenes/inventario`}
                        className='btn btn-outline-secondary' replace ><i className="bi bi-arrow-left"></i></Link>
                    <Tooltip id="btn-cancel-tooltip" /> */}
                    <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></button>
                </div>
                <h2 className='text-center m-0'>{producto ? 'Modificar Producto' : 'Agregar Producto'}</h2>
                <div></div>
            </div>

            <div className='card p-3 mb-2'>
                <div className="row">
                    <form className="container mt-2" noValidate onSubmit={handleSubmit} onKeyDown={onKeyDown}>
                        <div>
                            <MyCheckbox
                                checked={values.activo}
                                label="Activo (Desactiva completamente el producto, por lo cual no se puede usar realizar ventas)."
                                {...getFieldProps('activo')}
                            />
                        </div>
                        <div className="row">
                            <div className="col">
                                <MyTextInput
                                    autoFocus
                                    {...getFieldProps('codigo')}
                                    value={values.codigo !== undefined ? values.codigo : ''}
                                    label="Codigo"
                                    className="form-control"
                                    errors={errors.codigo}
                                />
                            </div>
                        </div>
                        <MyTextInput
                            {...getFieldProps('titulo')}
                            label="Titulo (Descripción breve del producto – aparece en el ticket)"
                            className="form-control"
                            value={values.titulo !== undefined ? values.titulo : ''}
                        />
                        <div className="mb-2">
                            <label className='form-label' htmlFor=''>Descripción detallada</label>
                            <textarea
                                {...getFieldProps('descripcion')}
                                className="form-control"
                                value={values.descripcion !== undefined ? values.descripcion : ''}
                                cols={10}
                                rows={4}
                            />
                            {/* <span className="text-danger">{errors}</span> */}
                        </div>
                        <div className="row">
                            <div className='col-4'>
                                <h5>Tipo de Reagistro</h5>
                                <div className='form-check form-check-inline'>
                                    <input {...getFieldProps('tipo')} className="form-check-input" checked={values.tipo === 'producto'} type="radio" value="producto" />
                                    <label className="form-check-label" /* for="inlineRadio1" */ >Producto</label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <input {...getFieldProps('tipo')} className="form-check-input" type="radio" value="servicio" />
                                    <label className="form-check-label" /* for="inlineRadio1" */ >Servicio</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <MyTextInput
                                    {...getFieldProps('costo')}
                                    min='0'
                                    type="number"
                                    label="Costo (Compra)"
                                    placeholder='$0.00'
                                    className="form-control"
                                    // onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                                    //     // const value = +evt.target.value;
                                    //     // setFieldValue('costo', value);
                                    //     // const porcentaje = Number(values.ganancia / 100);
                                    //     // const precio = value + porcentaje * value;
                                    //     // setFieldValue('precio', precio);
                                    // }}
                                    value={(values.costo !== 0) ? values.costo : ''}
                                    errors={(touched.costo && errors.costo) || ''}

                                />
                            </div>
                            <div className="col-4">
                                <MyTextInput
                                    {...getFieldProps('precio')}
                                    min='0'
                                    type="number"
                                    label="Precio (Venta)"
                                    placeholder='$0.00'
                                    className="form-control"
                                    // onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                                    //     const value = +evt.target.value;
                                    //     if (values.costo === 0) return;
                                    //     const ganancia = value - values.costo;
                                    //     console.log(ganancia);
                                    //     const porcentaje = (ganancia * 100) / values.costo;
                                    //     setFieldValue('ganancia', porcentaje);
                                    //     setFieldValue('precio', value);
                                    // }}
                                    value={(values.precio !== 0) ? values.precio : ''}
                                    errors={(touched.precio && errors.precio) || ''}
                                // 
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div>
                                <MyCheckbox
                                    checked={values.mayoreo!}
                                    label="Mayoreo"
                                    {...getFieldProps('mayoreo')}
                                />
                            </div>
                            <div className="col-6">
                                <MyTextInput
                                    {...getFieldProps('cantidad_mayoreo')}
                                    min='0'
                                    type='number'
                                    label='Cantidad'
                                    placeholder='0'
                                    className="form-control"
                                    disabled={!values.mayoreo}
                                    value={values.cantidad_mayoreo}
                                    errors={(touched.cantidad_mayoreo && errors.cantidad_mayoreo) || ''}
                                />
                            </div>
                            <div className="col-6">
                                <MyTextInput
                                    {...getFieldProps('precio_mayoreo')}
                                    min='0'
                                    type="number"
                                    label="Precio (Venta Mayoreo)"
                                    placeholder='0'
                                    className="form-control"
                                    disabled={!values.mayoreo}
                                    value={(values.precio_mayoreo !== null || values.precio_mayoreo !== undefined) ? values.precio_mayoreo : ''}
                                    errors={(touched.precio_mayoreo && errors.precio_mayoreo) || ''}
                                />
                            </div>
                        </div>
                        {
                            // (usuario?.permisos?.includes('modificar_inventario') || usuario?.roles.includes('administrador'))
                            (!producto || producto && !producto.control) && <div className="row">
                                <div>
                                    <MyCheckbox
                                        checked={values.control!}
                                        label="Control de Inventario"
                                        {...getFieldProps('control')}
                                    />
                                </div>
                                <div className="col-4">
                                    <MyTextInput
                                        {...getFieldProps('stock')}
                                        min='0'
                                        type="number"
                                        label="Stock"
                                        placeholder='0'
                                        className="form-control"
                                        disabled={!values.control}
                                        value={values.stock !== undefined ? values.stock : ''}
                                        errors={(touched.stock && errors.stock) || ''}
                                    />
                                </div>
                                <div className="col-4">
                                    <MyTextInput
                                        {...getFieldProps('stock_minimo')}
                                        min='0'
                                        type='number'
                                        label='Stock Minimo'
                                        placeholder='0'
                                        className="form-control"
                                        disabled={!values.control}
                                        value={values.stock_minimo !== undefined ? values.stock_minimo : ''}
                                        errors={(touched.stock_minimo && errors.stock_minimo) || ''}
                                    />
                                </div>
                                <div className="col-4">
                                    <MyTextInput
                                        {...getFieldProps('stock_maximo')}
                                        min='0'
                                        type="number"
                                        label="Stock Maximo"
                                        placeholder='0'
                                        className="form-control"
                                        disabled={!values.control}
                                        value={values.stock_maximo !== undefined ? values.stock_maximo : ''}
                                        errors={(touched.stock_maximo && errors.stock_maximo) || ''}
                                    />
                                </div>
                            </div>
                        }
                        <div className="row">
                            <div className="col-6">
                                <MySelect
                                    {...getFieldProps('categoria')}
                                    label="Categoria"
                                    className="form-control"
                                // multiple={true}
                                // disabled={!values.inventario}
                                >
                                    <option value="" >Sin categorias</option>
                                    {
                                        categorias?.map(opt => (
                                            <option key={opt.id} value={opt.id}>{opt.nombre}</option>
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
