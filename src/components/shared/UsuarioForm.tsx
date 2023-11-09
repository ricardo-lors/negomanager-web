import { FormularioUsuario, Sucursal, Usuario } from '../../interfaces';
import { FormikHelpers, useFormik } from 'formik';
import { MyTextInput } from './MyTextInput';

import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { MySelect } from './MySelect';
import { obtenerSucursales } from '../../store/slices/sucursal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface UsuarioFormProps {
    rol: string[];
    usuarioSelected?: Usuario;
    onSubmit: (values: FormularioUsuario, formikHelpers: FormikHelpers<FormularioUsuario>) => void | Promise<any>
}

export const UsuarioForm = ({ usuarioSelected, rol, onSubmit }: UsuarioFormProps) => {

    const { usuario } = useSelector((state: RootState) => state.usuario);

    const [sucursales, setSucursales] = useState<Sucursal[]>();

    useEffect(() => {

        obtenerSucursales({}).then(sc => setSucursales(sc));

    }, [])


    const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik<FormularioUsuario>({
        initialValues: usuarioSelected ? {
            nombre: usuarioSelected.nombre,
            correo: usuarioSelected.correo,
            telefono: usuarioSelected.telefono,
            contrasena: '',
            contrasenaRepeat: '',
            sucursal: usuarioSelected.sucursal?.id,
            roles: [...rol]
        } : {
            nombre: '',
            correo: '',
            telefono: '',
            contrasena: '',
            contrasenaRepeat: '',
            sucursal: '',
            roles: [...rol]
        },
        onSubmit: (values, elper) => {
            onSubmit(values, elper);
            resetForm();
        },
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
            <form className="container mt-2" noValidate onSubmit={handleSubmit}>

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
                {
                    usuario?.roles.includes('administrador') &&
                    < MySelect
                        label="Sucursal"
                        className="form-control"
                        // multiple={true}
                        {...getFieldProps('sucursal')}
                    >
                        {
                            sucursales?.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                            ))
                        }
                    </MySelect>
                }
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
        </div >
    )

}
