import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks";
import { Cliente } from "../../../interfaces";
import { RootState } from "../../../store";

import * as Yup from 'yup';
import { MyTextInput } from "../../shared/MyTextInput";
import { crearCliente } from "../../../store/slices/cliente";

export const ClientesPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { clientes } = useSelector((state: RootState) => state.cliente);

    useEffect(() => {
        // negocio.id && dispatch(obtenerProductosNegocio(negocio.id))
    }, [])

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<Cliente>({
        initialValues: {
            nombre: '',
            correo: '',
            telefono: '',
            negocio: usuario!.negocio!
        },
        onSubmit: async (values) => {
            console.log(values);
            dispatch(crearCliente(values));
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Requerido')
        })
    });

    return (
        <div className="row">
            <div className="col-3 border-end vh-100">
                <div className="text-center">
                    <h2>Clientes</h2>
                </div>
                <form className="container mt-4" noValidate onSubmit={handleSubmit}>

                    <MyTextInput
                        label="Nombre"
                        className="form-control"
                        {...getFieldProps('nombre')}
                    />

                    <MyTextInput
                        label="Correo"
                        className="form-control"
                        {...getFieldProps('correo')}
                    />

                    <MyTextInput
                        label="Telefono"
                        className="form-control"
                        {...getFieldProps('telefono')}
                    />
                    <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>

                </form>
            </div >
            <div className="col-9">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map(st => <tr key={st.id}>
                                <th>{st.nombre}</th>
                                <th>{st.correo}</th>
                                <th>{st.telefono}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
