import { UsuarioConvert, UsuarioNuevo, UsuarioLogin, Usuario, QueryParamsUsuario } from "../../../interfaces";
import { servicesApi, servicesApiToken, servicesApiTokenFile } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setUsuario, endGetUsuario } from "./usuarioSlice";
import Swal from 'sweetalert2'
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export const sesion = (credenciales: UsuarioLogin) => {
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
                if (e.code === "ERR_NETWORK") return Swal.fire('Error', `Error de red, Verifique su conexion`, 'error');

                Swal.fire('Error', `${e.response?.data.message}`, 'error');
            } else {
                console.log('Unexpected error', e);
            }
        }
    }
}

export const registrarUsuario = (usuario: UsuarioNuevo) => {
    return async (dispatch: AppDispatch) => {
        try {
            Swal.fire('Agregando el usuario nuevo');
            Swal.showLoading();
            const { data, status } = await servicesApiToken(`/auth/registro/usuario`, { method: 'POST', data: usuario });
            Swal.close();
            if (status === 201) {
                localStorage.setItem('x-token', data.token);
                const usuarioNuevo = UsuarioConvert.toUsuario(JSON.stringify(data));
                dispatch(setUsuario(usuarioNuevo));
            }
        } catch (e) {
            console.log(e);
            if (e instanceof AxiosError) {
                // ✅ TypeScript knows err is Error
                Swal.fire('Error', `${e.response?.data.message}`, 'error');
            } else {
                console.log('Unexpected error', e);
            }
            return undefined;
        }
    }
}

export const crearUsuario = async (usuario: UsuarioNuevo, navigate: NavigateFunction): Promise<Usuario | undefined> => {
    try {
        Swal.fire('Agregando el usuario nuevo');
        Swal.showLoading();
        const { data } = await servicesApiToken(`/auth/registro`, { method: 'POST', data: usuario });
        Swal.close();
        navigate("/dashboard/usuarios");
        // return data;
    } catch (e) {
        console.log(e);
        if (e instanceof AxiosError) {
            // ✅ TypeScript knows err is Error
            Swal.fire('Error', `${e.response?.data.message}`, 'error');
        } else {
            console.log('Unexpected error', e);
        }
        return undefined;
    }
}


export const actualizarUsuario = async (id: string, usuario: UsuarioNuevo): Promise<Usuario | undefined> => {
    try {
        Swal.fire('Guardando cambios');
        Swal.showLoading();
        const { data } = await servicesApiToken(`/auth/usuarios/${id}`, { method: 'PATCH', data: usuario });
        Swal.close();
        return data;
    } catch (e) {
        console.log(e);
        if (e instanceof AxiosError) {
            // ✅ TypeScript knows err is Error
            Swal.fire('Error', `${e.response?.data.message}`, 'error');
        } else {
            console.log('Unexpected error', e);
        }
        return undefined;
    }
}
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


// export const obtenerUsuarios = async (negocioid: string, rol: string): Promise<Usuario[]> => {
//     try {
//         const { data } = await servicesApiToken(`/auth/usuarios?rol=${rol}&negocio=${negocioid}`, {});
//         return data;
//     } catch (error) {
//         Swal.fire('Error', `error: ${error}`, 'info');
//         return [];
//     }
// }

export const buscarUsuarios = async (queryParamsUsuario: QueryParamsUsuario): Promise<Usuario[]> => {
    try {
        const { data } = await servicesApiToken(`/auth/usuarios/search`, { params: queryParamsUsuario });
        return data;
    } catch (e) {
        console.log(e);
        Swal.fire('Error');
        return [];
    }
}

// export const crearTurno = (turno: Turno) => {
//     return async (dispatch: AppDispatch) => {
//         Swal.fire('Cargando');
//         Swal.showLoading();
//         try {
//             const { data } = await servicesApiToken(`/turnos`, { method: 'POST', data: turno });
//             localStorage.setItem('x-token', data.token);
//             const usuario = UsuarioConvert.toUsuario(JSON.stringify(data));
//             dispatch(setUsuario(usuario));
//             Swal.close();
//         } catch (e) {
//             dispatch(endGetUsuario());
//             console.log(e)
//             if (e instanceof AxiosError) {
//                 // ✅ TypeScript knows err is Error
//                 if (e.code === "ERR_NETWORK") return Swal.fire('Error', `Error de red, Verifique su conexion`, 'error');

//                 Swal.fire('Error', `${e.response?.data.message}`, 'error');
//             } else {
//                 console.log('Unexpected error', e);
//             }
//         }
//     }
// }
