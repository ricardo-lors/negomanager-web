import React, { ChangeEvent } from 'react'
import { useAppDispatch } from '../../hooks';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { RootState } from '../../store';
import { registrarUsuario, sesion } from '../../store/slices/usuario';
import { UsuarioNuevo } from '../../interfaces';

import * as Yup from 'yup';
import { comenzarCambioTema } from '../../store/slices/ui';
import { MyTextInput } from '../shared';
import { Link, NavLink } from 'react-router-dom';

export const Registro = () => {

    const dispatch = useAppDispatch();

    const { darkMode } = useSelector((state: RootState) => state.ui);

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<UsuarioNuevo>({
        initialValues: {
            nombre: '',
            correo: '',
            contrasena: '',
            contrasenaRepeat: '',
            // roles: ['administrador']
            rol: 'administrador'
        },
        onSubmit: (values) => {
            console.log(values);
            dispatch(registrarUsuario({
                nombre: values.nombre,
                correo: values.correo,
                telefono: values.telefono,
                contrasena: values.contrasena,
                almacen: values.almacen,
                rol: values.rol
            }));
        },
        validationSchema: Yup.object({
            correo: Yup.string().required('El correo es requerido'),
            contrasena: Yup.string().required('La contraseña es requerida'),
        })
    });

    const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
        const darkMode = e.target.checked;
        dispatch(comenzarCambioTema(darkMode));
    }

    return (
        <div>
            <div className="">
                <div className="form-check form-switch">
                    <i className="bi bi-moon-fill"></i>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked={darkMode ? true : false}
                        onChange={onChangeTheme} />
                    <label className="form-check-label" >Modo Oscuro</label>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                {/* <div className="w-100 mb-auto">
                <img src="/logo1.jpg" alt="" height={50} width={50} />
            </div> */}
                <section className="card d-flex flex-column justify-content-center w-75 w-lg-50" >
                    <div className="px-lg-5 p-4 w-100 align-self-center">
                        <h1 className="text-center">PuntoVPro</h1>
                        <h3 className="">Bienvenido</h3>
                        <hr className="mb-4" />

                        <form className="container mt-4" noValidate onSubmit={handleSubmit}>

                            <MyTextInput
                                {...getFieldProps('nombre')}
                                label="Nombre"
                                placeholder='Nombre de la persona'
                                className="form-control"
                            />

                            <MyTextInput
                                {...getFieldProps('correo')}
                                label="Correo"
                                placeholder='Correo electronico'
                                className="form-control"
                            />

                            <MyTextInput
                                {...getFieldProps('contrasena')}
                                label="Contraseña"
                                placeholder='Ingrese una contraseña'
                                className="form-control"
                                type='password'
                            />

                            <MyTextInput
                                {...getFieldProps('contrasenaRepeat')}
                                label="Repetir contraseña"
                                placeholder='Repita la contraseña'
                                className="form-control"
                                type='password'
                            />

                            <button type="submit" className="btn btn-primary text-decoration-none w-100">Iniciar</button>

                        </form>
                        {/* <p className="text-center text-muted">O inicie session</p>
                    <div className="d-flex justify-content-around">
                        <button className="btn btn-outline-light flex-grow-1 me-2"><i className="bi bi-google lead me-2"></i> Google</button>
                        <button className="btn btn-outline-light flex-grow-1 ms-2"><i className="bi bi-facebook lead me-2"></i> Facebook</button>
                    </div> */}
                    </div>
                    <div className="text-center px-lg-5 pt-lg-3 pb-lg-4 p-4 w-100 mt-auto">
                        <p className="d-inline-block mb-0">¿Ya tienes cuenta?</p> <NavLink to="/login" replace className="text-muted text-decoration-none">Inicia sesion aqui!</NavLink>
                    </div>

                </section >
            </div>
        </div>
    )
}
