import { UsuarioConvert } from "../../../interfaces";
import { servicesApi, servicesApiToken } from "../../../services/sesionApi";
import { AppDispatch } from "../../store";
import { startGetUsuario, setUsuario, endGetUsuario } from "./usuarioSlice";
import Swal from 'sweetalert2'

export const sesion = (credenciales: { correo: string, contrasena: string }) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetUsuario());
        const { data } = await servicesApi.post(`/sesion`, credenciales);
        if (data.ok) {
            localStorage.setItem('x-token', data.token);
            const usuario = UsuarioConvert.toUsuario(JSON.stringify(data.data));
            dispatch(setUsuario(usuario));
        } else {
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
