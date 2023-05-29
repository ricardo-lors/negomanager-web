import { UsuarioConvert, UsuarioForm } from "../../../interfaces";
import { servicesApi, servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setUsuario, endGetUsuario, removerUsuario } from "./usuarioSlice";
import Swal from 'sweetalert2'
import { AxiosError } from "axios";

export const sesion = (credenciales: UsuarioForm) => {
    return async (dispatch: AppDispatch) => {
        Swal.fire('Cargando');
        Swal.showLoading();
        try {
            const { data } = await servicesApi(`/auth/login`, 'POST', credenciales);
            localStorage.setItem('x-token', data.token);
            const usuario = UsuarioConvert.toUsuario(JSON.stringify(data));
            dispatch(setUsuario(usuario));
            Swal.close();
        } catch (e) {
            dispatch(endGetUsuario());
            console.log(e)
            if (e instanceof AxiosError) {
                // ✅ TypeScript knows err is Error
                if(e.code === "ERR_NETWORK") return Swal.fire('Error', `Error de red, Verifique su conexion`, 'error');

                Swal.fire('Error', `${e.response?.data.message}`, 'error');
            } else {
                console.log('Unexpected error', e);
            }
        }
    }
}

export const revalidarSesion = () => {
    return async (dispatch: AppDispatch) => {
        // dispatch(startGetUsuario());
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
    }
};

export const crearUsuario = (usuario: UsuarioForm) => {
    return async (dispatch: AppDispatch /*, getState: RootState*/) => {
        try {
            const { data } = await servicesApiToken(`/auth/registro`, 'POST', usuario);

            console.log(data);
        } catch (e) {
            console.log(e);
            if (e instanceof AxiosError) {
                // ✅ TypeScript knows err is Error
                Swal.fire('Error', `${e.response?.data.message}`, 'error');
            } else {
                console.log('Unexpected error', e);
            }
        }
    }
};
// http://localhost:4000/api/auth/usuarios?rol=vendedor&negocio=ad2824cc-622f-4796-a989-1a60e2cd00ba
// export const obtenerUsuarios = (negocioid: string, rol: string) => {
//     return async (dispatch: AppDispatch) => {
//         const { data } = await servicesApiToken(`/usuarios?rol=${rol}&negocio=${negocioid}`);
//         if (data.ok) {
//             const usuarios = UsuarioConvert.toUsuarioList(JSON.stringify(data.data));
//             dispatch(setUsuarios(usuarios));
//         } else {
//             Swal.fire('Error', data.data, 'info');
//         }
//     }
// };


export const obtenerUsuarios = async (negocioid: string, rol: string) => {
    try {
        const { data } = await servicesApiToken(`/auth/usuarios?rol=${rol}&negocio=${negocioid}`);
        return data;
    } catch (error) {
        Swal.fire('Error', `error: ${error}`, 'info');
    }
}
