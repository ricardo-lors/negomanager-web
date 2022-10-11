import Swal from "sweetalert2";
import { Producto, ProductoConverto, ProvedorConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/sesionApi";
import { AppDispatch } from "../../store";
import { setProductos, startGetProductos } from "./productoSlice";


export const obtenerProductosNegocio = (negocioid: number) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetProductos());
        const { data } = await servicesApiToken.get(`/producto/negocio/${negocioid}`);
        if (data.ok) {
            const productos = ProductoConverto.toProducToList(JSON.stringify(data.data));
            dispatch(setProductos(productos));
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
}

////////////////////////
////////////////////////
///////No Tonks/////////
////////////////////////
////////////////////////

export const crearProducto = async (producto: Producto) => {
    try {
        const { data } = await servicesApiToken.post(`/producto`, producto);
        if (data.ok) {
            Swal.fire('Creado', data.data, 'success');
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    } catch (error) {
        Swal.fire('Error', `${error}`, 'error');
    }
}

export const obtenerProductoCodigo = async (codigo: String, negocioid: number) => {
    try {
        const { data } = await servicesApiToken.get(`/producto/negocio/${codigo}/${negocioid}'`);
        if (data.ok) {
            return data.data;
        } else {
            Swal.fire('Error', `${data.data}`, 'info');
        }
    } catch (error) {
        Swal.fire('Error', `${error}`, 'error');
    }
}