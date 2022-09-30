import Swal from "sweetalert2";
import { ProvedorConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/sesionApi";
import { AppDispatch } from "../../store";
import { setProvedores, startGetProvedores } from "./provedorSlice";


export const obtenerProvedoresNegocio = (negocioid: number) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetProvedores());
        const { data } = await servicesApiToken.get(`/provedor/negocio/${negocioid}`);
        if (data.ok) {
            const provedores = ProvedorConvert.toProvedorList(JSON.stringify(data.data));
            setProvedores(provedores);
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
}
