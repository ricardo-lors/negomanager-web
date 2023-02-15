import { Usuario, UsuarioConvert, UsuarioForm } from "../../../interfaces";
import { servicesApi, servicesApiToken } from "../../../services/services.api";
import { AppDispatch, RootState } from "../../store";
import { startGetUsuario, setUsuario, endGetUsuario, setUsuarios, removerUsuario } from "./usuarioSlice";
import Swal from 'sweetalert2'
import { removerNegocio } from "../negocio";

export const sesion = (credenciales: UsuarioForm) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startGetUsuario());
        try {
            const { data } = await servicesApi(`/auth/login`, 'POST', credenciales);
            localStorage.setItem('x-token', data.token);
            const usuario = UsuarioConvert.toUsuario(JSON.stringify(data));
            dispatch(setUsuario(usuario));
        } catch (e) {
            console.log(e);
            Swal.fire('Error')
        }
    }
}

export const revalidarSesion = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(startGetUsuario());
        try {
            const { data } = await servicesApiToken(`/auth/check-status`);
            localStorage.setItem('x-token', data.token);
            const usuario = UsuarioConvert.toUsuario(JSON.stringify(data));
            dispatch(setUsuario(usuario));
        } catch (error) {
            console.log(error);
            Swal.fire('Error', "Sesion cerrada, vuelva a iniciar", 'info');
            localStorage.removeItem('x-token');
            dispatch(endGetUsuario());
        }
    }
};

export const removerSesion = () => {
    return async (dispatch: AppDispatch) => {
        localStorage.removeItem('x-token');
        dispatch(removerUsuario());
        dispatch(removerNegocio());
    }
};

export const crearUsuario = (usuario: UsuarioForm) => {
    return async (dispatch: AppDispatch /*, getState: RootState*/) => {
        const { data } = await servicesApiToken(`/auth/registro`, 'POST', usuario);
        console.log(data);
        // if (data.ok) {
        //     const { data } = await servicesApiToken.get(`/usuario/negocio/${negocioid}`);
        //     if (data.ok) {
        //         const usuarios = UsuarioConvert.toUsuarioList(JSON.stringify(data.data));
        //         dispatch(setUsuarios(usuarios));
        //         Swal.fire('Creado', data.data, 'success');
        //     } else {
        //         Swal.fire('Error', data.data, 'info');
        //     }
        // } else {
        //     Swal.fire('Error', data.data, 'info');
        // }
    }
};

export const obtenerUsuarios = (negocioid: string) => {
    return async (dispatch: AppDispatch) => {
        const { data } = await servicesApiToken(`/usuario/negocio/${negocioid}`);
        if (data.ok) {
            const usuarios = UsuarioConvert.toUsuarioList(JSON.stringify(data.data));
            dispatch(setUsuarios(usuarios));
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
};
