import { FormularioUsuario } from '../../interfaces';
import { FormikHelpers, useFormik } from 'formik';
import { MyTextInput } from './MyTextInput';

import * as Yup from 'yup';

interface UsuarioFormProps {
    rol: string[];
    onSubmit: (values: FormularioUsuario, formikHelpers: FormikHelpers<FormularioUsuario>) => void | Promise<any>
}

export const UsuarioForm = ({ rol, onSubmit }: UsuarioFormProps) => {

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<FormularioUsuario>({
        initialValues: {
            nombre: '',
            correo: '',
            telefono: '',
            contrasena: '',
            contrasenaRepeat: '',
            roles: [...rol]
        },
        onSubmit: onSubmit,
        validationSchema: Yup.object({
            nombre: Yup.string().required('Requerido'),
            correo: Yup.string().required('Requerido'),
            contrasena: Yup.string().required('Requerido'),
            contrasenaRepeat: Yup.string().required('Requerido'),
            // TODO: Validar que ambas contraseñas sean iguales
        })
    });

    return (
        <div>
            <form className="container mt-4" noValidate onSubmit={handleSubmit}>

                <MyTextInput
                    label="Nombre"
                    placeholder='Nombre de la persona'
                    className="form-control"
                    {...getFieldProps('nombre')}
                />

                <MyTextInput
                    label="Correo"
                    placeholder='Correo electronico'
                    className="form-control"
                    {...getFieldProps('correo')}
                />

                <MyTextInput
                    label="Telefono"
                    placeholder='Numero de telefono'
                    className="form-control"
                    {...getFieldProps('telefono')}
                />

                <MyTextInput
                    label="Contraseña"
                    placeholder='Ingrese una contraseña'
                    className="form-control"
                    type='password'
                    {...getFieldProps('contrasena')}
                />

                <MyTextInput
                    label="Repetir contraseña"
                    placeholder='Repita la contraseña'
                    className="form-control"
                    type='password'
                    {...getFieldProps('contrasenaRepeat')}
                />
                <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>

            </form>
        </div>
    )

}
