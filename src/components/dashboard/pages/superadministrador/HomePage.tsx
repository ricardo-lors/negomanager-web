import { useSelector } from "react-redux";
import { RootState } from "../../../../store";


import * as Yup from 'yup';
import { MyTextInput } from "../../../shared";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../../hooks";
import { crearUsuario } from "../../../../store/slices/usuario";
import { UsuarioNuevo } from "../../../../interfaces";

export const HomePage = () => {

    const dispatch = useAppDispatch();

    const { negocios } = useSelector((state: RootState) => state.negocio);
    const { handleSubmit, errors, touched, getFieldProps } = useFormik<UsuarioNuevo>({
        initialValues: {
            nombre: '',
            correo: '',
            contrasena: '',
            contrasenaRepeat: '',
            rol: 'administrador'
        },
        onSubmit: async (values) => {
            crearUsuario({
                nombre: values.nombre,
                contrasena: values.contrasena,
                correo: values.correo,
                rol: values.rol
            });
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Nombre es nesesario'),
            contrasena: Yup.string().min(6, 'La contraseña debe tener mas de 6 caracteres')
        })
    });

    return (
        <div>

            <form className="container mt-4" noValidate onSubmit={handleSubmit}>
                <div className="col">
                    <h5>Administrador</h5>
                    <MyTextInput
                        label="Nombre"
                        placeholder="Nombre del administrador"
                        className="form-control"
                        {...getFieldProps('nombre')}
                    />

                    <MyTextInput
                        label="Correo"
                        placeholder="correo@gmail.com"
                        className="form-control"
                        {...getFieldProps('correo')}
                    />

                    <MyTextInput
                        type="password"
                        label="Contraseña"
                        className="form-control"
                        errors={(touched.contrasena && errors.contrasena && errors.contrasena) || ''}
                        {...getFieldProps('contrasena')}
                    />

                    <MyTextInput
                        type="password"
                        label="Repetir Contraseña"
                        className="form-control"
                        errors={(touched.contrasenaRepeat && errors.contrasenaRepeat && errors.contrasenaRepeat) || ''}
                        {...getFieldProps('contrasenaRepeat')}
                    />
                </div>
                <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>
            </form>

            <div className="col-12 mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            negocios.map(st => <tr key={st.id}>
                                <th>{st.nombre}</th>
                                <th>{st.descripcion}</th>
                                <th>{st.correo}</th>
                                <th>{st.telefono}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
