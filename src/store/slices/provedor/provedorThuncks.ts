import Swal from "sweetalert2";
import { Provedor, ProvedorConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setProvedores, startGetProvedores } from "./provedorSlice";

export const crearProvedor = (provedor: Provedor) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await servicesApiToken(`/provedores`, { method: 'POST', data: provedor });
            dispatch(setProvedores(data));
            Swal.fire('Perfecto', 'Provedor Creado', 'success');
        } catch (error) {
            Swal.fire('Error', `${error}`, 'info');
        }
    }
}

export const obtenerProvedoresNegocio = (negocioid: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startGetProvedores());
        try {
            const { data } = await servicesApiToken(`/provedores/${negocioid}`, {});
            dispatch(setProvedores(data));
        } catch (error) {
            Swal.fire('Error', `${error}`, 'info');
        }
    }
}
