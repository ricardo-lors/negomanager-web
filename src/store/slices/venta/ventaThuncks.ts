import Swal from "sweetalert2";
import { NuevaVenta, Venta, VentaConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setVentas, startGetVentas } from "./ventaSlice";

export const obtenerVentaNegocio = (negocioid: string) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetVentas());
        const { data } = await servicesApiToken(`/venta/negocio/${negocioid}`,{});
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
        const { data } = await servicesApiToken(`/ventas`, {method: 'POST', data: venta});
        console.log(data);
        if (data.ok) {
            Swal.fire('Creado', `${data.mensaje}`, 'success');
        } else {
            Swal.fire('Error', data.mensaje, 'info');
        }
    } catch (error) {
        console.log(error)
        Swal.fire('Error', `${error}`, 'error');
    }
}
