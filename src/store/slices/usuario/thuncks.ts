import { Usuario, UsuarioConvert, UsuarioForm } from "../../../interfaces";
import { servicesApi, servicesApiToken } from "../../../services/sesionApi";
import { AppDispatch } from "../../store";
import { startGetUsuario, setUsuario, endGetUsuario, setUsuarios, removerUsuario } from "./usuarioSlice";
import Swal from 'sweetalert2'
import { removerNegocio } from "../negocio";

export const sesion = (credenciales: { correo: string, contrasena: string }) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetUsuario());
        const { data } = await servicesApi.post(`/sesion`, credenciales);
        if (data.ok) {
            localStorage.setItem('x-token', data.token);
            const usuario = UsuarioConvert.toUsuario(JSON.stringify(data.data));
            dispatch(setUsuario(usuario));
        } else {
            dispatch(endGetUsuario());
            Swal.fire('Error', data.data, 'info');
        }
    }
}

export const revalidarSesion = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(startGetUsuario());
        const { data } = await servicesApiToken.get(`/renovar`);
        if (data.ok) {
            localStorage.setItem('x-token', data.token);
            const usuario = UsuarioConvert.toUsuario(JSON.stringify(data.data));
            dispatch(setUsuario(usuario));
        } else {
            Swal.fire('Error', data.data, 'info');
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
    return async (dispatch: AppDispatch) => {
        const { data } = await servicesApiToken.post(`/usuario`, usuario);
        if (data.ok) {
            const { data } = await servicesApiToken.get(`/usuario/negocio/${usuario.negocioid}`);
            if (data.ok) {
                const usuarios = UsuarioConvert.toUsuarioList(JSON.stringify(data.data));
                dispatch(setUsuarios(usuarios));
                Swal.fire('Creado', data.data, 'success');
            } else {
                Swal.fire('Error', data.data, 'info');
            }
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
};

export const obtenerUsuarios = (negocioid: number) => {
    return async (dispatch: AppDispatch) => {
        const { data } = await servicesApiToken.get(`/usuario/negocio/${negocioid}`);
        if (data.ok) {
            const usuarios = UsuarioConvert.toUsuarioList(JSON.stringify(data.data));
            dispatch(setUsuarios(usuarios));
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
};
