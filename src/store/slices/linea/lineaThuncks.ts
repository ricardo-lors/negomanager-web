import { Departamento, Linea } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setLinea, setLineas } from "./lineaSlice";

export const obtenerLineas = () => {
    return async (dispatch: AppDispatch) => {
        const { status, data } = await servicesApiToken(`/lineas`, {});
        console.log(data);
        dispatch(setLineas(data));
    }
}

export const crearLinea = (linea: Linea) => {
    return async (dispatch: AppDispatch) => {
        const { status, data } = await servicesApiToken(`/lineas`, { method: 'POST', data: linea });
        dispatch(setLinea(data));
        console.log(data);
    }
}