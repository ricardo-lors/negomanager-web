import Swal from "sweetalert2";
import { Categoria, CategoriaConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/sesionApi";
import { AppDispatch } from "../../store";
import { setCategorias, startGetCategorias } from "./categoriaSlice";

export const obtenerCategorias = (negocioid: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startGetCategorias());
        const { data } = await servicesApiToken.get(`/categoria/negocio/${negocioid}`);
        if (data.ok) {
            const categorias = CategoriaConvert.toCategoriaList(JSON.stringify(data.data));
            dispatch(setCategorias(categorias));
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
}

export const crearCategoria = (categoria: Categoria) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await servicesApiToken.post(`/categoria`, categoria);
            if (data.ok) {
                const { data } = await servicesApiToken.get(`/categoria/negocio/${categoria.negocioid}`);
                if (data.ok) {
                    const categorias = CategoriaConvert.toCategoriaList(JSON.stringify(data.data));
                    dispatch(setCategorias(categorias));
                } else {
                    Swal.fire('Error', data.data, 'info');
                }
            } else {
                Swal.fire('Error', data.data, 'info');
            }
        } catch (error) {
            Swal.fire('Error', `${error}`, 'info');
        }
    }
}
