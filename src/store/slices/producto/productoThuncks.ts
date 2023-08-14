import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { NuevoProducto, Producto, ProductoConvert, QueryParamsProducto } from "../../../interfaces";
import { servicesApiToken, servicesApiTokenFile } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setProductos, startGetProductos } from "./productoSlice";

export const obtenerProductosNegocio = (queryParamsProducto: QueryParamsProducto) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetProductos());
        try {
            const { data } = await servicesApiToken(`/productos`, {params: queryParamsProducto} );
            const productos = ProductoConvert.toProducToList(JSON.stringify(data));
            dispatch(setProductos(productos));
        } catch (e) {
            console.log(e);
            Swal.fire('Error',)
        }
    }
}

export const obtenerProducto = async (id: string) => {
    try {
        const { data } = await servicesApiToken(`/productos/${id}`, {});
        console.log(data);
        // const productos = ProductoConvert.toProducToList(JSON.stringify(data));
    } catch (e) {
        console.log(e);
        Swal.fire('Error',)
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

export const crearProducto = (producto: Producto) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        try {

            // http://localhost:4000/api/files/productos/76a5fd58-d809-471a-bdcb-d1739c655ab6.jpeg

            console.log(producto);
            const { data } = await servicesApiToken(`/productos`, {method: 'POST', data: producto});
            dispatch(setProductos(data));
        } catch (e) {
            if (e instanceof AxiosError) {
                // ✅ TypeScript knows err is Error   
                Swal.fire('Error', `${e.response?.data.message}`, 'error');
            } else {
                console.log('Unexpected error', e);
            }
        }
    }

}

export const obtenerProductoCodigo = async (codigo: string, negocioid: string) => {
    try {
        const { data } = await servicesApiToken(`/productos/${codigo}/${negocioid}`, {});
        // console.log(data);
        // const producto = ProductoConvert.toProducto(data);
        return data;
    } catch (e) {
        console.log(e);
        Swal.fire('Error',)
    }
}

export const obtenerProductosQuery = async (query: string, negocioid: string) => {
    try {
        const params = new URLSearchParams({ query, negocioid });
        console.log(params.toString());
        const { data } = await servicesApiToken(`/producto/buscar/query?${params.toString()}`, {});
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

export const agregarImagenes = async (file: File) => {
    try {

        // http://localhost:4000/api/files/productos/76a5fd58-d809-471a-bdcb-d1739c655ab6.jpeg
        // const formData: any = new FormData();

        // Array(files).map((file) => formData.append("file", file));
        // // formData.append('file', files);

        // console.log(producto);
        const { data } = await servicesApiTokenFile(`/files/producto`, 'POST', { file });

        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
        if (e instanceof AxiosError) {
            // ✅ TypeScript knows err is Error   
            Swal.fire('Error', `${e.response?.data.message}`, 'error');
        } else {
            console.log('Unexpected error', e);
        }
    }

}