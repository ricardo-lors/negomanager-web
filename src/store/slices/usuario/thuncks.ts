import { Usuario, UsuarioConvert, UsuarioForm } from "../../../interfaces";
import { servicesApi, servicesApiToken } from "../../../services/services.api";
import { AppDispatch, RootState } from "../../store";
import { startGetUsuario, setUsuario, endGetUsuario, setUsuarios, removerUsuario } from "./usuarioSlice";
import Swal from 'sweetalert2'
import { removerNegocio } from "../negocio";
import { AxiosError } from "axios";

export const sesion = (credenciales: UsuarioForm) => {
    return async (dispatch: AppDispatch) => {
        // dispatch(startGetUsuario());
        Swal.fire('Cargando');
        Swal.showLoading();
        try {
            const { data } = await servicesApi(`/auth/login`, 'POST', credenciales);
            localStorage.setItem('x-token', data.token);
            const usuario = UsuarioConvert.toUsuario(JSON.stringify(data));
            dispatch(setUsuario(usuario));
            Swal.close();
        } catch (e) {
            console.log(e)
            if (e instanceof AxiosError) {
                // ✅ TypeScript knows err is Error
                Swal.fire('Error', `${e.response?.data.message}`, 'error');
            } else {
                console.log('Unexpected error', e);
            }
            // 👈️ err is unknown
            // if (typeof e === 'object' && e !== null) {
            //     console.log(e.toString());
            //     Swal.fire('Error', `${e.response}`, 'error');
            // } else {
            //     console.log('Unexpected error', e);
            // }

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
        try {
            const { data } = await servicesApiToken(`/auth/registro`, 'POST', usuario);

            console.log(data);
        } catch (error) {

        }
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
