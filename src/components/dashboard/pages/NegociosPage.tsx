import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks";
import { RootState } from "../../../store";
import { useEffect } from "react";
import { useFormik } from "formik";

import * as Yup from 'yup';
import { MyTextInput } from "../../shared/MyTextInput";
import { MySelect } from "../../shared/MySelect";
import { crearNegocio, obtenerNegocios } from "../../../store/slices/negocio/thuncks";
import { NuevoNegocio } from "../../../interfaces";

export const NegociosPage = () => {

    const dispatch = useAppDispatch();

    const { negocios } = useSelector((state: RootState) => state.negocio);

    useEffect(() => {
        dispatch(obtenerNegocios());
    }, [])

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<NuevoNegocio>({
        initialValues: {
            nombreNegocio: '',
            descripcionNegocio: '',
            correoNegocio: '',
            telefonoNegocio: '',
            nombre: '',
            correo: '',
            contrasena: '',
            rolid: 2,
        },
        onSubmit: async (values) => {
            dispatch(crearNegocio(values));
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Nombre es nesesario'),
            contrasena: Yup.string().min(6, 'La contraseña debe tener mas de 6 caracteres')
        })
    });

    return (
        <div className="row">
            <div className="border-end vh-100">
                <div className="text-center">
                    <h2>Clientes</h2>
                </div>
                <form className="container mt-4" noValidate onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col-6">
                            <h5>Negocio</h5>
                            <MyTextInput
                                label="Nombre"
                                placeholder="Nombre de la empresa"
                                className="form-control"
                                {...getFieldProps('nombreNegocio')}
                            />

                            <MyTextInput
                                label="Descripcion"
                                placeholder="Escriba una descripcion"
                                className="form-control"
                                {...getFieldProps('descripcionNegocio')}
                            />

                            <MyTextInput
                                label="Correo"
                                placeholder="correo@correo.com"
                                className="form-control"
                                {...getFieldProps('correoNegocio')}
                            />

                            <MyTextInput
                                label="Telefono"
                                placeholder="255 ... ..."
                                className="form-control"
                                {...getFieldProps('telefonoNegocio')}
                            />
                        </div>
                        <div className="col-6">
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
                                label="Contraseña"
                                className="form-control"
                                errors={touched.contrasena && errors.contrasena && errors.contrasena || ''}
                                {...getFieldProps('contrasena')}
                            />

                        </div>
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
            </div >
        </div >
    )
}
