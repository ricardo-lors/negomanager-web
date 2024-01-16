import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { NuevoActualizarProducto, Producto, ProductoConvert, QueryParamsProducto } from "../../../interfaces";
import { servicesApiToken, servicesApiTokenFile } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setProductos, startGetProductos } from "./productoSlice";
import { NavigateFunction } from "react-router-dom";
import { getMeesageError } from "../../errors/errors";

export const obtenerProductos = (queryParamsProducto: QueryParamsProducto) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetProductos());
        try {
            const { data } = await servicesApiToken(`/productos`, { params: queryParamsProducto });
            console.log(data);
            const productos = ProductoConvert.toProducToList(JSON.stringify(data));
            dispatch(setProductos(productos));
        } catch (e) {
            console.log(e);
            Swal.fire('Error',)
        }
    }
}

export const obtenerProducto = async (id: string): Promise<Producto | undefined> => {
    try {
        const { data } = await servicesApiToken(`/productos/${id}`, {});
        return data;
    } catch (e) {
        console.log(e);
        Swal.fire('Error',)
        return undefined;
    }
}

// const { data } = await axios.get(`http://localhost:4000/api/productos/${negocioid}`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem('x-token')}` }
// })

// export const obtenerProductosQuery = async (query: string) => {
//     return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
//         dispatch(startGetProductos());
//         const { data } = await servicesApiToken.get(`/producto/negocio/${negocioid}`);
//         if (data.ok) {
//             const productos = ProductoConverto.toProducToList(JSON.stringify(data.data));
//             dispatch(setProductos(productos));
//         } else {
//             Swal.fire('Error', data.data, 'info');
//         }
//     }
//     try {
//         const params = new URLSearchParams({ query });
//         console.log(params);
//         const { data } = await servicesApiToken.get(`/producto/buscar'`);
//         if (data.ok) {
//             return data.data;
//         } else {
//             Swal.fire('Error', `${data.data}`, 'info');
//         }
//     } catch (error) {
//         Swal.fire('Error', `${error}`, 'error');
//     }
// };

////////////////////////
////////////////////////
///////No Tonks/////////
////////////////////////
////////////////////////

export const crearProducto = (producto: NuevoActualizarProducto, navigate: NavigateFunction, rol: String) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        try {
            const { data } = await servicesApiToken(`/productos`, { method: 'POST', data: producto });
            dispatch(setProductos([data]));
            navigate(`/dashboard/${rol}/producto`, { replace: true });
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

export const actualizarProducto = (producto: NuevoActualizarProducto, navigate: NavigateFunction, rol: String) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        try {
            const { data } = await servicesApiToken(`/productos/${producto.id}`, { method: 'PATCH', data: producto });
            dispatch(setProductos([data]));
            navigate(`/dashboard/${rol}/producto`, { replace: true });
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

export const obtenerProductoCodigo = async (codigo: string, sucursalid: string, negocioid: string) => {
    try {
        const { data } = await servicesApiToken(`/inventario/${codigo}/${sucursalid}/${negocioid}`, {});
        console.log(data);
        return data;
    } catch (e) {
        const message = getMeesageError(e);
        Swal.fire('Error', message, 'error');
    }
}

export const obtenerProductosQuery = async (queryParamsProducto: QueryParamsProducto) => {
    try {
        const { data } = await servicesApiToken(`/productos`, { params: queryParamsProducto });
        console.log(data);
        const productos = ProductoConvert.toProducToList(JSON.stringify(data));
        return productos;
    } catch (e) {
        console.log(e);
        Swal.fire('Error',)
    }
};

export const agregarImagenes = async (file: File) => {
    try {
        const { data } = await servicesApiTokenFile(`/files/producto`, 'POST', { file });
        return data;
    } catch (e) {
        if (e instanceof AxiosError) {
            Swal.fire('Error', `${e.response?.data.message}`, 'error');
        } else {
            console.log('Unexpected error', e);
        }
        console.log(e);
    }

}