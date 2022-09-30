import Swal from "sweetalert2";
import { ProductoConverto, ProvedorConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/sesionApi";
import { AppDispatch } from "../../store";
import { setProductos, startGetProductos } from "./productoSlice";


export const obtenerProductosNegocio = (negocioid: number) => {
    return async (dispatch: AppDispatch /*,getState: () => RootState*/) => {
        dispatch(startGetProductos());
        const { data } = await servicesApiToken.get(`/producto/negocio/${negocioid}`);
        if (data.ok) {
            const productos = ProductoConverto.toProducToList(JSON.stringify(data.data));
            setProductos(productos);
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
}
