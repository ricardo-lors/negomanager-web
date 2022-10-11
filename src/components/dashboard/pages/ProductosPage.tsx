import { useFormik } from "formik";
import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import { useAppDispatch } from "../../../hooks";
import { Producto } from "../../../interfaces";
import { RootState } from "../../../store";
import { crearProducto, obtenerProductosNegocio } from "../../../store/slices/producto/thuncks";
import { MySelect } from "../../shared/MySelect";
import { MyTextInput } from "../../shared/MyTextInput";

export const ProductosPage = () => {

    const dispatch = useAppDispatch();

    const { negocio } = useSelector((state: RootState) => state.negocio);
    const { provedores } = useSelector((state: RootState) => state.provedor);
    const { categorias } = useSelector((state: RootState) => state.categoria);
    const { productos } = useSelector((state: RootState) => state.producto);

    useEffect(() => {
        negocio.id && dispatch(obtenerProductosNegocio(negocio.id))
    }, [])

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<Producto>({
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
            values.registro = moment().format('YYYY-MM-DD HH:mm:ss');
            console.log(values);
            await crearProducto(values);
            dispatch(obtenerProductosNegocio(negocio.id!));
        },
        validationSchema: Yup.object({
            codigo: Yup.string().required('Requerido')
        })
    });

    return (
        <div className="row">
            <div className="col-3 border-end vh-100">
                <div className="text-center">
                    <h2>Productos</h2>
                </div>
                <form className="container mt-4" noValidate onSubmit={handleSubmit}>

                    <MyTextInput
                        label="Codigo"
                        className="form-control"
                        {...getFieldProps('codigo')}
                    />
                    <MyTextInput
                        label="Nombre"
                        className="form-control"
                        {...getFieldProps('nombre')}
                    />
                    <MyTextInput
                        label="Descripcion"
                        className="form-control"
                        {...getFieldProps('descripcion')}
                    />
                    <MyTextInput
                        label="Stock"
                        className="form-control"
                        {...getFieldProps('stock')}
                    />
                    <MyTextInput
                        label="Costo"
                        className="form-control"
                        {...getFieldProps('costo')}
                    />
                    <MyTextInput
                        label="Precio"
                        className="form-control"
                        {...getFieldProps('precio')}
                    />

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
            </div >
            <div className="col-9">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">precio</th>
                            {/* <th scope="col">Total</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map(st => <tr key={st.id}>
                                <th>{st.nombre}</th>
                                <th>{st.descripcion}</th>
                                <th>{st.precio}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
