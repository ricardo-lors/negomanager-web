import { UsuarioNuevo, Almacen, Usuario } from '../../interfaces';
import { FormikHelpers, useFormik } from 'formik';
import { MyTextInput } from './MyTextInput';

import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { MySelect } from './MySelect';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useAppDispatch } from '../../hooks';
import { obtenerAlmacen } from '../../store/slices/almacen';

interface UsuarioFormProps {
    rol: string[];
    usuarioSelected?: Usuario;
    onSubmit: (values: UsuarioNuevo, formikHelpers: FormikHelpers<UsuarioNuevo>) => void | Promise<any>
}

export const UsuarioForm = ({ usuarioSelected, rol, onSubmit }: UsuarioFormProps) => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { almacenes } = useSelector((state: RootState) => state.almacen);

    useEffect(() => {
        dispatch(obtenerAlmacen({}));
    }, [])


    const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik<UsuarioNuevo>({
        initialValues: usuarioSelected ? {
            nombre: usuarioSelected.nombre,
            correo: usuarioSelected.correo,
            telefono: usuarioSelected.telefono,
            contrasena: '',
            contrasenaRepeat: '',
            almacen: usuarioSelected.almacen?.id,
            roles: [...rol]
        } : {
            nombre: '',
            correo: '',
            telefono: '',
            contrasena: '',
            contrasenaRepeat: '',
            almacen: '',
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
                            almacenes?.map(opt => (
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
