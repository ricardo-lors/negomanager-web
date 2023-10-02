import Swal from "sweetalert2";
import { NuevaVenta, Venta, VentaConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
// import { setVentas, startGetVentas } from "./ventaSlice";

export const obtenerVentaNegocio = (negocioid: string) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        // dispatch(startGetVentas());
        // const { data } = await servicesApiToken(`/venta/negocio/${negocioid}`, {});
        // console.log(data);
        // if (data.ok) {
        //     const ventas = VentaConvert.toVentaList(JSON.stringify(data.data));
        //     dispatch(setVentas(ventas));
        // } else {
        //     Swal.fire('Error', data.data, 'info');
        // }
    }
}

export const crearVenta = async (venta: NuevaVenta): Promise<Boolean> => {
    try {

        if (venta.detalles.length === 0) {
            Swal.fire('Lista de productos vacía', 'Agregue productos, para realizar la compra.', 'warning');
            return false;
        }

        if (venta.total > venta.pago) {
            Swal.fire('Pago Insuficiente', 'El Pago no cubre el total de la venta', 'warning');
            return false;
        }

        const { status } = await servicesApiToken(`/ventas`, { method: 'POST', data: venta });

        if (status === 201) return true;
        return false;
        // if (data.ok) {
        //     Swal.fire('Creado', `${data.mensaje}`, 'success');
        // } else {
        //     Swal.fire('Error', data.mensaje, 'info');
        // }
    } catch (error) {
        Swal.fire('Error', `${error}`, 'error');
        return false;
    }
}


//Parte de creacion de ventas


