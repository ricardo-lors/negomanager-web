import Swal from "sweetalert2";
import { NuevaVenta, Venta, VentaConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/sesionApi";
import { AppDispatch } from "../../store";
import { setVentas, startGetVentas } from "./ventaSlice";

export const obtenerVentaNegocio = (negocioid: number) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetVentas());
        const { data } = await servicesApiToken.get(`/venta/negocio/${negocioid}`);
        console.log(data);
        if (data.ok) {
            const ventas = VentaConvert.toVentaList(JSON.stringify(data.data));
            dispatch(setVentas(ventas));
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
}

export const crearVenta = async (venta: NuevaVenta) => {
    try {
        const { data } = await servicesApiToken.post(`/venta`, venta);
        if (data.ok) {
            Swal.fire('Creado', data.data, 'success');
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    } catch (error) {
        Swal.fire('Error', `${error}`, 'error');
    }
}
