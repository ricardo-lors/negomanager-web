import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../../../hooks";
import { Producto, ProductoConvert } from "../../../../interfaces";
import { AppDispatch, RootState } from "../../../../store";
import { crearProducto, obtenerProductos, obtenerProductosQuery } from "../../../../store/slices/producto";
import * as Yup from 'yup';

import { Modal, MyCheckbox, MySelect, MyTextInput } from "../../../shared";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export const InventarioPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const productosList = useRef(null);

    const handleimprimirProductosList = useReactToPrint({
        content: () => productosList.current,
        pageStyle: ''
    });

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { productos } = useSelector((state: RootState) => state.producto);
    const { categorias } = useSelector((state: RootState) => state.categoria);
    const { provedores } = useSelector((state: RootState) => state.provedor);

    const [{ openModal }, setState] = useState({
        openModal: true,
    });

    useEffect(() => {
        usuario && dispatch(obtenerProductos({ negocio: usuario?.negocio?.id!, take: 10 }))
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

    return (
        <div>

            <div className="row mt-3">
                <h2 className="text-center">INVENTARIO</h2>
                <div className="col">
                    {/* <button className="btn btn-primary" onClick={() => setState({ openModal: !openModal })}>Agregar</button>/admin/inventario/nuevo/producto */}
                    <Link
                        to='/dashboard/admin/inventario/producto'
                        className="btn btn-primary me-2"
                        data-bs-toggle="tooltip" data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="This top tooltip is themed via CSS variables."
                        replace
                    >
                        <i className="bi bi-plus-square" />
                    </Link>
                    <button
                        className="btn btn-primary"
                        onClick={handleimprimirProductosList}
                        data-bs-toggle="tooltip" data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="This top tooltip is themed via CSS variables."
                    ><i className="bi bi-printer"></i></button>
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
                    ? <div ref={productosList} className="album py-2">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {/* <h5>Inventario</h5> album py-2 */}
                            {
                                productos.map(prod =>
                                    <div key={prod.id} className="col">
                                        <div className="card shadow-sm">
                                            {prod.imagenes![0] && <img className="card-img-top" src={prod.imagenes![0].url} alt="" />}
                                            <div className="card-body">
                                                <h5 className="card-title">{prod.nombre} - {prod.codigo}</h5>
                                                {/* {
                                                    prod.imagenes!.length > 0 && prod.imagenes!.map((imagen) => <img key={imagen.id} src={imagen.url} height='100' width={150} alt="" />)
                                                } */}
                                                <p className="card-text" >{prod.descripcion}</p>
                                                <p className="card-text" >Stock: {prod.stock} - Precio: {prod.precio}</p>
                                                <Link to={`/dashboard/admin/inventario/producto/${prod.id}`} replace className="btn btn-primary"><i className="bi bi-pencil-square"></i></Link>
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
