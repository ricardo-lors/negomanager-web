import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks";
import { RootState } from "../../../store";
import { useEffect } from "react";
import { useFormik } from "formik";
import { Usuario, UsuarioForm } from "../../../interfaces";

import * as Yup from 'yup';
import { MyTextInput } from "../../shared/MyTextInput";
import { crearUsuario } from "../../../store/slices/usuario";

export const VendedoresPage = () => {

    const dispatch = useAppDispatch();

    const { usuarios } = useSelector((state: RootState) => state.usuario);

    useEffect(() => {
        // negocio.id && dispatch(obtenerProductosNegocio(negocio.id))
    }, [])

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<UsuarioForm>({
        initialValues: {
            nombre: '',
            correo: '',
            contrasena: '',
            roles: []
        },
        onSubmit: async (values) => {
            console.log(values);
            dispatch(crearUsuario(values));
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Requerido')
        })
    });

    return (
        <div className="row">
            <div className="col-3 border-end vh-100">
                <div className="text-center">
                    <h2>Vendedores</h2>
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

                    <MyTextInput
                        label="Contraseña"
                        className="form-control"
                        {...getFieldProps('contrasena')}
                    />

                    <MyTextInput
                        label="Repetir contraseña"
                        className="form-control"
                        {...getFieldProps('contrasenaRepeat')}
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
                            usuarios?.map(st => st.roles.includes('vendedor') && <tr key={st.id}>
                                <th>{st.nombre}</th>
                                <th>{st.correo}</th>
                                {/* <th>{st.telefono}</th> */}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
