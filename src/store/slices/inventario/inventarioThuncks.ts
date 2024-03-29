import { AxiosError } from "axios";
import { FormularioProducto, NuevoActualizarProducto, Producto, ProductoConvert, QueryParamsProducto } from "../../../interfaces";
import { FormInventario, Inventario, QueryParamsInventario } from "../../../interfaces/Inventario.interface";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch, RootState } from "../../store";
import { actualizarProducto, agregarProducto, agregarProductos } from "./inventarioSlice";
import Swal from "sweetalert2";
import { FormikState } from "formik";

export const handleAgreggrarProducto = (producto: NuevoActualizarProducto, resetForm: () => void) => {
    return async (dispatch: AppDispatch /*, getState: () => RootState */) => {
        try {
            Swal.fire('Guardando, por favor espere');
            Swal.showLoading();
            const { data } = await servicesApiToken('/inventario', { method: 'POST', data: producto });
            dispatch(agregarProducto(data));
            Swal.fire('Guardado correctamente', '', 'success');
            resetForm();
        } catch (e) {
            if (e instanceof AxiosError) {
                Swal.fire('Error', `${e.response?.data.message}`, 'error');
            } else if (e instanceof Error) {
                Swal.fire('Error', `${e.message}`, 'error');
                console.log('Unexpected error', e);
            }
        }
    }
}

export const handleObtenerProductos = (queryParamsInventario: QueryParamsProducto) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        // dispatch(startGetProductos());
        try {
            const { data } = await servicesApiToken(`/inventario`, { params: queryParamsInventario });
            console.log(data);
            // const productos = ProductoConvert.toProducToList(JSON.stringify(data));
            dispatch(agregarProductos(data));
        } catch (e) {
            console.log(e);
            Swal.fire('Error',)
        }
    }
}

export const handleActualizarProducto = (producto: NuevoActualizarProducto) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await servicesApiToken(`/inventario/${producto.id}`, { method: 'PATCH', data: producto });
            dispatch(actualizarProducto(data));
            // navigate(`/dashboard/${rol}/producto`, { replace: true });
        } catch (e) {
            if (e instanceof AxiosError) {
                Swal.fire('Error', `${e.response?.data.message}`, 'error');
            } else if (e instanceof Error) {
                Swal.fire('Error', `${e.message}`, 'error');
                console.log('Unexpected error', e);
            }
        }
    }
}


export const crearMovimientoInventario = async (inventario: FormInventario) => {
    try {
        const { status, data } = await servicesApiToken(`/inventario`, { method: 'POST', data: inventario });
        console.log(data);

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const obtenerMovimientoInventario = async (queryParamsInventario: QueryParamsInventario) => {
    try {
        const { status, data } = await servicesApiToken(`/inventario`, { method: 'GET', params: queryParamsInventario });
        console.log(data);

        return data;
    } catch (error) {
        console.log(error)
    }
}


export const obtenerProducto = async (id: string): Promise<Producto | undefined> => {
    try {
        const { data } = await servicesApiToken(`/inventario/${id}`, {});
        return data;
    } catch (e) {
        console.log(e);
        Swal.fire('Error',)
        return undefined;
    }
}


export const obtenerProductosQuery = async (queryParamsProducto: QueryParamsProducto) => {
    try {
        const { data } = await servicesApiToken(`/inventario`, { params: queryParamsProducto });
        console.log(data);
        const productos = ProductoConvert.toProducToList(JSON.stringify(data));
        return productos;
    } catch (e) {
        console.log(e);
        Swal.fire('Error',)
    }
};