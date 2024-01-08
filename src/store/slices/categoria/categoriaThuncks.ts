import Swal from "sweetalert2";
import { Categoria, CategoriaConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setCategorias, startGetCategorias } from "./categoriaSlice";

export const obtenerCategorias = (negocioid: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await servicesApiToken(`/categorias/${negocioid}`, {});
            dispatch(setCategorias(data));
        } catch (error) {
            console.log(error)
            Swal.fire('Error', `${error}`, 'info');
        }
    }
}

export const crearCategoria = (categoria: Categoria) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await servicesApiToken(`/categorias`, { method: 'POST', data: categoria });
            dispatch(setCategorias(data));
        } catch (error) {
            Swal.fire('Error', `${error}`, 'info');
        }
    }
}
