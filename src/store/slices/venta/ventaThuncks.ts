import Swal from "sweetalert2";
import { NuevaVenta, Venta, VentaConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { getMeesageError } from "../../errors/errors";
import { AxiosError } from "axios";
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

export const obtenerVentaId = async (id: string) => {
    try {
        const { data } = await servicesApiToken(`/ventas/${id}`, {});
        return data;
    } catch (e) {
        const message = getMeesageError(e);
        Swal.fire('Error', message, 'error');
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

        const { status, data } = await servicesApiToken(`/ventas`, { method: 'POST', data: venta });
        console.log(data);
        if (status === 201) return true;
        return false;
        // if (data.ok) {
        //     Swal.fire('Creado', `${data.mensaje}`, 'success');
        // } else {
        //     Swal.fire('Error', data.mensaje, 'info');
        // }
    } catch (error) {
        console.log(error);
        Swal.fire('Error', `${error}`, 'error');
        return false;
    }
}


export const cancelarVenta = async (id: string) => {
    try {

        Swal.fire('Cancelando movimiento');
        Swal.showLoading();
        const { status, data } = await servicesApiToken(`/ventas/${id}`, { method: 'DELETE' });
        console.log(status);
        console.log(data);
        Swal.close();
        return data;
    } catch (e) {
        console.log(e)
        if (e instanceof AxiosError) {
            // ✅ TypeScript knows err is Error
            if (e.code === "ERR_NETWORK") return Swal.fire('Error', `Error de red, Verifique su conexion`, 'error');

            Swal.fire('Error', `${e.response?.data.message}`, 'error');
        } else {
            console.log('Unexpected error', e);
        }
    }


}
//Parte de creacion de ventas


