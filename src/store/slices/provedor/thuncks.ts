import Swal from "sweetalert2";
import { Provedor, ProvedorConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/sesionApi";
import { AppDispatch } from "../../store";
import { setProvedores, startGetProvedores } from "./provedorSlice";

export const crearProvedor = (provedor: Provedor) => {
    return async (dispatch: AppDispatch) => {
        const { data } = await servicesApiToken.post(`/provedor`, provedor);
        if (data.ok) {
            Swal.fire('Creado', `${data.data}`, 'success');
        } else {
            Swal.fire('Error', `${data.data}`, 'info');
        }
    }
}

export const obtenerProvedoresNegocio = (negocioid: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startGetProvedores());
        const { data } = await servicesApiToken.get(`/provedor/negocio/${negocioid}`);
        if (data.ok) {
            console.log(data);
            const provedores = ProvedorConvert.toProvedorList(JSON.stringify(data.data));
            dispatch(setProvedores(provedores));
        } else {
            Swal.fire('Error', `${data.data}`, 'info');
        }
    }
}
