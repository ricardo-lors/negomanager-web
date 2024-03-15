import { Departamento } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setDepartamento, setDepartamentos } from "./departamentoSlice";

export const obtenerDepartamentos = () => {
    return async (dispatch: AppDispatch) => {
        const { status, data } = await servicesApiToken(`/departamentos`, {});
        console.log(data);
        dispatch(setDepartamentos(data));
    }
}

export const crearDepartamento = (departamento: Departamento) => {
    return async (dispatch: AppDispatch) => {
        const { status, data } = await servicesApiToken(`/departamentos`, { method: 'POST', data: departamento });
        dispatch(setDepartamento(data));
        console.log(data);
    }
}