import { UsuarioConvert, UsuarioNuevo, UsuarioLogin, Usuario, QueryParamsUsuario } from "../../../interfaces";
import { servicesApi, servicesApiToken, servicesApiTokenFile } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { agregarSesion } from "./sesionSlice";
import Swal from 'sweetalert2'
import { AxiosError } from "axios";

export const sesion = (credenciales: UsuarioLogin) => {
    return async (dispatch: AppDispatch) => {
        Swal.fire('Cargando');
        Swal.showLoading();
        try {
            const { data } = await servicesApi(`/auth/login`, 'POST', credenciales);
            console.log(data);
            localStorage.setItem('x-token', data.token);
            const usuario = UsuarioConvert.toUsuario(JSON.stringify(data));
            dispatch(agregarSesion(usuario));
            Swal.close();
        } catch (e) {
            console.log(e)
            if (e instanceof AxiosError) {
                // ✅ TypeScript knows err is Error
                if (e.code === "ERR_NETWORK") return Swal.fire('Error', `Error de red, Verifique su conexion`, 'error');

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
            const { data } = await servicesApiToken(`/auth/check-status`, {});
            localStorage.setItem('x-token', data.token);
            const usuario = UsuarioConvert.toUsuario(JSON.stringify(data));
            console.log(usuario);
            dispatch(agregarSesion(usuario));
        } catch (error) {
            console.log(error);
            Swal.fire('Error', "Sesion cerrada, vuelva a iniciar", 'info');
            localStorage.removeItem('x-token');
            // dispatch(endGetUsuario());
        }
    }
};

// export const removerSesion = () => {
//     return async (dispatch: AppDispatch) => {
//         localStorage.removeItem('x-token');
//         // dispatch(removerUsuario());
//     }
// };
