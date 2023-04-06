import { FormikHelpers, useFormik } from "formik";
import { Usuario, UsuarioForm } from "../../interfaces";

import * as Yup from 'yup';
import { MyTextInput } from "./MyTextInput";
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface AgregarUsuarioProps {
    rol: string[];
    submit: (values: UsuarioForm, formikHelpers: FormikHelpers<UsuarioForm>) => void | Promise<any>
}

export const FormularioAgregarUsuarios = ({ rol, submit }: AgregarUsuarioProps) => {


    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.usuario);

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<UsuarioForm>({
        initialValues: {
            nombre: '',
            correo: '',
            contrasena: '',
            contrasenaRepeat: '',
            negocio: usuario!.negocio,
            roles: [...rol]
        },
        onSubmit: submit,
        validationSchema: Yup.object({
            nombre: Yup.string().required('Requerido')
        })
    });

    return (
        <div>
            <h3>Nuevo Cliente</h3>
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
        </div>
    )
}
