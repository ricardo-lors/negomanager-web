import Swal from "sweetalert2";
import { NegocioConvert, NegocioUsuario } from "../../../interfaces";
import { servicesApiToken } from "../../../services/sesionApi";
import { AppDispatch } from "../../store";
import { setNegocio, setNegocios, startGetNegocio } from "./negocioSlice";


export const crearNegocio = (negocio: NegocioUsuario) => {
    return async (dispatch: AppDispatch) => {
        const { data } = await servicesApiToken.post(`/negocio`, negocio);
        if (data.ok) {

            const { data } = await servicesApiToken.get(`/negocio`);
            if (data.ok) {
                const negocios = NegocioConvert.toNegocioList(JSON.stringify(data.data));
                dispatch(setNegocios(negocios));
                Swal.fire('Creado', data.data, 'success');
            } else {
                Swal.fire('Error', data.data, 'info');
            }
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
}

export const obtenerNegocios = () => {
    return async (dispatch: AppDispatch) => {
        const { data } = await servicesApiToken.get(`/negocio`);
        if (data.ok) {
            const negocios = NegocioConvert.toNegocioList(JSON.stringify(data.data));
            dispatch(setNegocios(negocios));
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
}

export const obtenerNegocio = (negocioid: number) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetNegocio());
        const { data } = await servicesApiToken.get(`/negocio/${negocioid}`);
        if (data.ok) {
            const negocio = NegocioConvert.toNegocio(JSON.stringify(data.data));
            dispatch(setNegocio(negocio));
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
}

