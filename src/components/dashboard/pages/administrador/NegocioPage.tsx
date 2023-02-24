import { useState } from "react";
import { useSelector } from "react-redux"
import * as Yup from 'yup';
import { useFormik } from "formik";

import { RootState } from "../../../../store";
import { MyTextInput } from "../../../shared/MyTextInput";
import { NuevoNegocio } from "../../../../interfaces";
import { useAppDispatch } from "../../../../hooks";
import { crearNegocio } from "../../../../store/slices/negocio/thuncks";

export const NegocioPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.usuario);

    const { negocio } = usuario!;

    const [state, setState] = useState({
        modificar: negocio !== null ? true : false
    });

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<NuevoNegocio>({
        initialValues: {
            nombre: negocio !== null ? negocio!.nombre : '',
            descripcion: negocio !== null ? negocio!.descripcion : '',
            correo: negocio !== null ? negocio!.correo : '',
            telefono: negocio !== null ? negocio!.telefono : '',
        },
        onSubmit: async (values) => {
            console.log(values);
            dispatch(crearNegocio(values));
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Nombre es nesesario'),
            contrasena: Yup.string().min(6, 'La contraseña debe tener mas de 6 caracteres')
        })
    });

    return (
        <div className="row">
            {usuario!.negocio === null && <div className="alert alert-danger" role="alert">
                Debe dar de alta su negocio
            </div>
            }
            <form className="container mt-4" noValidate onSubmit={handleSubmit}>

                <h5>Negocio</h5>
                <MyTextInput
                    label="Nombre"
                    placeholder="Nombre de la empresa"
                    className="form-control"
                    disabled={state.modificar}
                    {...getFieldProps('nombre')}
                />

                <MyTextInput
                    label="Descripcion"
                    placeholder="Escriba una descripcion"
                    className="form-control"
                    disabled={state.modificar}
                    {...getFieldProps('descripcion')}
                />

                <MyTextInput
                    label="Correo"
                    placeholder="correo@correo.com"
                    className="form-control"
                    disabled={state.modificar}
                    {...getFieldProps('correo')}
                />

                <MyTextInput
                    label="Telefono"
                    placeholder="255 ... ..."
                    className="form-control"
                    disabled={state.modificar}
                    {...getFieldProps('telefono')}
                />

                <button disabled={state.modificar} type="submit" className="btn btn-primary text-decoration-none w-100">Guardar</button>
            </form>
        </div>
    )
}
