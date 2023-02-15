import axios from "axios";
import Swal from "sweetalert2";
import { NuevoProducto, Producto, ProductoConvert, ProvedorConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setProductos, startGetProductos } from "./productoSlice";


export const obtenerProductosNegocio = (negocioid: string) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetProductos());
        try {
            const { data } = await servicesApiToken(`/productos/${negocioid}`);
            // const { data } = await axios.get(`http://localhost:4000/api/productos/${negocioid}`, {
            //     headers: { Authorization: `Bearer ${localStorage.getItem('x-token')}` }
            // })
            const productos = ProductoConvert.toProducToList(JSON.stringify(data));
            dispatch(setProductos(productos));
        } catch (e) {
            console.log(e);
            Swal.fire('Error',)
        }
    }
}

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

export const crearProducto = async (producto: NuevoProducto) => {
    try {
        const { data } = await servicesApiToken(`/producto`, 'POST', producto);
        if (data.ok) {
            Swal.fire('Creado', `${data.data}`, 'success');
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    } catch (error) {
        Swal.fire('Error', `${error}`, 'error');
    }
}

export const obtenerProductoCodigo = async (codigo: string, negocioid: string) => {
    try {
        const { data } = await servicesApiToken(`/producto/negocio/${codigo}/${negocioid}'`);
        if (data.ok) {
            return data.data;
        } else {
            Swal.fire('Error', `${data.data}`, 'info');
        }
    } catch (error) {
        Swal.fire('Error', `${error}`, 'error');
    }
}

export const obtenerProductosQuery = async (query: string, negocioid: string) => {
    try {
        const params = new URLSearchParams({ query, negocioid });
        console.log(params.toString());
        const { data } = await servicesApiToken(`/producto/buscar/query?${params.toString()}`);
        console.log(data);
        if (data.ok) {
            return data.data;
        } else {
            Swal.fire('Error', `${data.data}`, 'info');
        }
    } catch (error) {
        Swal.fire('Error', `${error}`, 'error');
    }
};