import Swal from "sweetalert2";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { agregarCaja, agregarCajas } from "./cajaSlice";
import { CajaNueva, QueryParamsCaja } from "../../../interfaces/Caja.interface";
import { revalidarSesion } from "../session";


export const crearCaja = (caja: CajaNueva) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await servicesApiToken(`/caja`, { method: 'POST', data: caja });
            dispatch(agregarCaja(data));
        } catch (error) {
            Swal.fire('Error', `${error}`, 'info');
        }
    }
}

export const obtenerCajas = (queryParamsCaja: QueryParamsCaja) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await servicesApiToken(`/caja`, { params: queryParamsCaja });
            dispatch(agregarCajas(data));
        } catch (error) {
            Swal.fire('Error', `${error}`, 'info');
        }
    }
}


// Funciones de Apertura

export const crearAperturaCaja = (apertura: { dinero_inicial: number; almacen?: string; caja?: string; }) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await servicesApiToken(`/caja/apertura`, { method: 'POST', data: apertura });
            // dispatch(agregarCaja(data));
            dispatch(revalidarSesion());
        } catch (error) {
            console.log(error)
            Swal.fire('Error', `${error}`, 'info');
        }
    }
}