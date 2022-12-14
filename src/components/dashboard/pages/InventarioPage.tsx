import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks";
import { NuevoProducto, Producto, ProductoConvert } from "../../../interfaces";
import { RootState } from "../../../store";
import { crearProducto, obtenerProductosNegocio, obtenerProductosQuery } from "../../../store/slices/producto/thuncks";
import * as Yup from 'yup';


import { Modal, MySelect, MyTextInput } from "../../shared";

export const InventarioPage = () => {

    const dispatch = useAppDispatch();

    const { negocio } = useSelector((state: RootState) => state.negocio);
    const { productos } = useSelector((state: RootState) => state.producto);
    const { categorias } = useSelector((state: RootState) => state.categoria);
    const { provedores } = useSelector((state: RootState) => state.provedor);

    const [{ openModal }, setState] = useState({
        openModal: false,
    });

    useEffect(() => {
        negocio.id && dispatch(obtenerProductosNegocio(negocio.id))
    }, [dispatch, negocio.id]);

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<NuevoProducto>({
        initialValues: {
            codigo: '',
            nombre: '',
            descripcion: '',
            stock: 0,
            costo: 0.0,
            precio: 0.0,
            registro: '',
            provedorid: 0,
            categoriaid: 0,
            negocioid: negocio.id || 0
        },
        onSubmit: async (values) => {
            await crearProducto(values);
            dispatch(obtenerProductosNegocio(negocio.id!));
            setState({ openModal: false });
        },
        validationSchema: Yup.object({
            codigo: Yup.string().required('Requerido')
        })
    });

    const { handleSubmit: handleSubmitSearch, errors: errorsSearch, touched: touchedSearch, getFieldProps: getFieldPropsSearch, resetForm: resetFormSearch, } = useFormik({
        initialValues: { query: '' },
        onSubmit: async (values) => {
            // dispatch(obtenerProductosQuery(values.query));
            const resp = await obtenerProductosQuery(values.query, `${negocio.id}`);
            console.log(resp);
            resetFormSearch();
        },
        validationSchema: Yup.object({
            query: Yup.string().required('Requerido')
        }),

    });

    return (
        <>
            <div className="row mt-3">
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
            <div className="album py-2">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {
                        productos.map(prod =>
                            <div key={prod.id} className="col">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{prod.nombre}</h5>
                                        <p className="card-text" >{prod.descripcion}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Modal
                isOpen={openModal}
                onRequestClose={() => setState({ openModal: false })}
                titulo="Agregar Producto"
            >
                {/* <button onClick={closeModal}>close</button> */}
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
                                className="form-control"
                                {...getFieldProps('stock')}
                            />
                        </div>
                        <div className="col-6">
                            <MyTextInput
                                label="Costo (Compra)"
                                className="form-control"
                                {...getFieldProps('costo')}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <MyTextInput
                                label="Precio (Venta)"
                                className="form-control"
                                {...getFieldProps('precio')}
                            />
                        </div>
                        <div className="col-6">

                            <MySelect
                                label="Categoria"
                                className="form-control"
                                {...getFieldProps('categoriaid')}
                            >
                                <option value={0}>Selet an optionm</option>
                                {
                                    categorias?.map(opt => (
                                        <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                                    ))
                                }
                            </MySelect>
                        </div>
                    </div>

                    <MySelect
                        label="Provedor"
                        className="form-control"
                        {...getFieldProps('provedorid')}
                    >
                        <option value={0}>Selet an optionm</option>
                        {
                            provedores?.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                            ))
                        }
                    </MySelect>

                    <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>
                </form>
            </Modal>
        </>
    )
}
