import Swal from "sweetalert2";
import { NegocioConvert, NuevoNegocio } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setNegocio, setNegocios, startGetNegocio } from "./negocioSlice";


export const crearNegocio = (negocio: NuevoNegocio) => {
    return async (dispatch: AppDispatch) => {
        const { data } = await servicesApiToken(`/negocio`, 'POST', negocio);
        if (data.ok) {

            const { data } = await servicesApiToken(`/negocio`);
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
        try {
            const { data } = await servicesApiToken(`/negocios`);
            const negocios = NegocioConvert.toNegocioList(JSON.stringify(data));
            dispatch(setNegocios(negocios));
        } catch (e) {
            console.log(e);
            Swal.fire('Error')
        }
    }
}

export const obtenerNegocio = (negocioid: string) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetNegocio());
        const { data } = await servicesApiToken(`/negocio/${negocioid}`);
        if (data.ok) {
            const negocio = NegocioConvert.toNegocio(JSON.stringify(data.data));
            dispatch(setNegocio(negocio));
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
}

