import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../hooks";
import { Producto, ProductoConvert } from "../../../../interfaces";
import { RootState } from "../../../../store";
import { crearProducto, obtenerProductosNegocio, obtenerProductosQuery } from "../../../../store/slices/producto";
import * as Yup from 'yup';

import { Modal, MyCheckbox, MySelect, MyTextInput } from "../../../shared";
import { Link } from "react-router-dom";

export const InventarioPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { productos } = useSelector((state: RootState) => state.producto);
    const { categorias } = useSelector((state: RootState) => state.categoria);
    const { provedores } = useSelector((state: RootState) => state.provedor);

    const [{ openModal }, setState] = useState({
        openModal: true,
    });

    useEffect(() => {
        usuario && dispatch(obtenerProductosNegocio({negocio: usuario?.negocio?.id!, take: 10}))
    }, [dispatch]);

    const { handleSubmit: handleSubmitSearch, errors: errorsSearch, touched: touchedSearch, getFieldProps: getFieldPropsSearch, resetForm: resetFormSearch, } = useFormik({
        initialValues: { query: '' },
        onSubmit: async (values) => {
            // dispatch(obtenerProductosQuery(values.query));
            const resp = await obtenerProductosQuery(values.query, `${usuario?.negocio!.id!}`);
            console.log(resp);
            resetFormSearch();
        },
        validationSchema: Yup.object({
            query: Yup.string().required('Requerido')
        }),

    });
    console.log(productos)
    return (
        <div>

            <div className="row mt-3">
                <h2 className="text-center">INVENTARIO</h2>
                <div className="col">
                    {/* <button className="btn btn-primary" onClick={() => setState({ openModal: !openModal })}>Agregar</button>/admin/inventario/nuevo/producto */}
                    <Link to='/dashboard/admin/inventario/producto' replace className="btn btn-primary">Agregar</Link>
                </div>
                <div className="col">
                    <form onSubmit={handleSubmitSearch}>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Buscar..." {...getFieldPropsSearch('query')} />
                            <button type="submit" className="btn btn-primary">Buscar</button>
                        </div>
                        {touchedSearch.query && errorsSearch.query && <span className="text-danger">{errorsSearch.query}</span>}
                    </form>
                </div>
            </div>
            {
                productos.length !== 0
                    ? <div className="album py-2">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {/* <h5>Inventario</h5> */}
                            {
                                productos.map(prod =>
                                    <div key={prod.id} className="col">
                                        <div className="card shadow-sm">
                                            {prod.imagenes![0] && <img src={prod.imagenes![0].url} alt="" />}
                                            <div className="card-body">
                                                <h5 className="card-title">{prod.nombre} - {prod.codigo}</h5>
                                                {/* {
                                                    prod.imagenes!.length > 0 && prod.imagenes!.map((imagen) => <img key={imagen.id} src={imagen.url} height='100' width={150} alt="" />)
                                                } */}
                                                <p className="card-text" >{prod.descripcion}</p>
                                                <p className="card-text" >Stock: {prod.stock} - Precio: {prod.precio}</p>
                                                <Link to={`/dashboard/admin/inventario/producto/${prod.id}`} replace className="btn btn-primary">Modificar</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div >
                    </div >
                    : <div className="text-center">
                        <hr />
                        <h3>Sin Productos</h3>
                        <h4>Agrege algunos</h4>
                    </div>
            }
        </div>
    )
}

/*
<div className="accordion ">
<div className="accordion-item ">
    <h2 className="accordion-header">
        <button className="accordion-button" type="button" onClick={() => setState({ openModal: !openModal })} >
            Agregar Producto
        </button>
    </h2>
    {/* Sow -> Se ve el contenido 
    <div className={`accordion-collapse collapse ${openModal ? 'show' : ""}`} >
        <div className="accordion-body">
            <div className="row">
                <form className="container mt-4" noValidate onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <MyTextInput
                                label="Codigo"
                                className="form-control"
                                {...getFieldProps('codigo')}
                                errors={errors.codigo}
                            />
                        </div>
                        <div className="col-6">
                            <MyTextInput
                                label="Nombre"
                                className="form-control"
                                {...getFieldProps('nombre')}
                            />
                        </div>
                    </div>
                    <MyTextInput
                        label="Descripcion"
                        className="form-control"
                        {...getFieldProps('descripcion')}
                    />
                    <div className="row">
                        <div className="col-6">
                            <MyTextInput
                                label="Stock"
                                type="number"
                                className="form-control"
                                {...getFieldProps('stock')}
                            />
                        </div>
                        <div className="col-6">
                            <MyTextInput
                                label="Stock Minimo"
                                type="number"
                                className="form-control"
                                {...getFieldProps('stock_minimo')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <MyTextInput
                                label="Costo (Compra)"
                                type="number"
                                className="form-control"
                                {...getFieldProps('costo')}
                            />
                        </div>
                        <div className="col-6">
                            <MyTextInput
                                label="Precio (Venta)"
                                type="number"
                                className="form-control"
                                {...getFieldProps('precio')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <MyCheckbox
                            checked={values.mayoreo!}
                            label="Mayoreo"
                            // onChange={(e) => { }}
                            {...getFieldProps('mayoreo')}
                        />
                        <div className="col-6">
                            <MyTextInput
                                label="Cantidad"
                                type="number"
                                className="form-control"
                                disabled={!values.mayoreo}
                                {...getFieldProps('cantidad_mayoreo')}
                            />
                        </div>
                        <div className="col-6">
                            <MyTextInput
                                label="Precio (Venta Mayoreo)"
                                type="number"
                                className="form-control"
                                disabled={!values.mayoreo}
                                {...getFieldProps('precio_mayoreo')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <MySelect
                                label="Categoria"
                                className="form-control"
                                multiple={true}
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
                                        <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                                    ))
                                }
                            </MySelect>
                        </div>

                    </div>
                    <button type="submit" className="btn btn-primary text-decoration-none w-100">Guardar</button>
                </form>
            </div>
        </div>
    </div>
</div>
<div className="accordion-item">
    <h2 className="accordion-header">
        <button className="accordion-button" type="button" onClick={() => setState({ openModal: !openModal })}>
            Inventario
        </button>
    </h2>
    <div className={`accordion-collapse collapse ${!openModal ? 'show' : ""}`} >
        <div className="accordion-body">

            <div className="row mt-3">
                <h2 className="text-center">INVENTARIO</h2>
                <div className="col">
                    <button className="btn btn-primary" onClick={() => setState({ openModal: !openModal })}>Agregar</button>
                </div>
                <div className="col">
                    <form onSubmit={handleSubmitSearch}>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Buscar..." {...getFieldPropsSearch('query')} />
                            <button type="submit" className="btn btn-primary">Buscar</button>
                        </div>
                        {touchedSearch.query && errorsSearch.query && <span className="text-danger">{errorsSearch.query}</span>}
                    </form>
                </div>
            </div>
            {
                productos.length !== 0
                    ? <div className="album py-2">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {/* <h5>Inventario</h5> 
                            {
                                productos.map(prod =>
                                    <div key={prod.id} className="col">
                                        <div className="card shadow-sm">
                                            <div className="card-body">
                                                <h5 className="card-title">{prod.nombre} - {prod.codigo}</h5>
                                                <p className="card-text" >{prod.descripcion}</p>
                                                <p className="card-text" >Stock: {prod.stock} - Precio: {prod.precio}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div >
                    </div >
                    : <div className="text-center">
                        <hr />
                        <h3>Sin Productos</h3>
                        <h4>Agrege algunos</h4>
                    </div>
            }
        </div>
    </div>
</div>
</div>
*/

{/* 
{/* <Modal
isOpen={openModal}
onRequestClose={() => setState({ openModal: false })}
titulo="Agregar Producto"
> */}
{/* <button onClick={closeModal}>close</button> */ }
{/* <form className="container mt-4" noValidate onSubmit={handleSubmit}>
    <div className="row">
        <div className="col-6">
            <MyTextInput
                label="Codigo"
                className="form-control"
                {...getFieldProps('codigo')}
                errors={errors.codigo}
            />
        </div>
        <div className="col-6">
            <MyTextInput
                label="Nombre"
                className="form-control"
                {...getFieldProps('nombre')}
            />
        </div>
    </div>
    <MyTextInput
        label="Descripcion"
        className="form-control"
        {...getFieldProps('descripcion')}
    />
    <div className="row">
        <div className="col-6">
            <MyTextInput
                label="Stock"
                type="number"
                className="form-control"
                {...getFieldProps('stock')}
            />
        </div>
        <div className="col-6">
            <MyTextInput
                label="Stock Minimo"
                type="number"
                className="form-control"
                {...getFieldProps('stock_minimo')}
            />
        </div>
    </div>
    <div className="row">
        <div className="col-6">
            <MyTextInput
                label="Costo (Compra)"
                type="number"
                className="form-control"
                {...getFieldProps('costo')}
            />
        </div>
        <div className="col-6">
            <MyTextInput
                label="Precio (Venta)"
                type="number"
                className="form-control"
                {...getFieldProps('precio')}
            />
        </div>

    </div>
    <div className="row">
        <MyCheckbox
            checked={values.mayoreo!}
            label=" Mayoreo"
            // onChange={(e) => { }}
            {...getFieldProps('mayoreo')}
        />
    </div>
    <MySelect
        label="Categoria"
        className="form-control"
        multiple={true}
        {...getFieldProps('categorias')}
    >
        {
            categorias?.map(opt => (
                <option key={opt.id} value={opt.nombre}>{opt.nombre}</option>
            ))
        }
    </MySelect>
    <MySelect
        label="Provedor"
        className="form-control"
        multiple={true}
        {...getFieldProps('provedores')}
    >
        {
            provedores?.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.nombre}</option>
            ))
        }
    </MySelect>

    <button type="submit" className="btn btn-primary text-decoration-none w-100">Guardar</button>
</form>
</Modal> */}