import { FormInventario, Inventario, QueryParamsInventario } from "../../../interfaces/Inventario.interface";
import { servicesApiToken } from "../../../services/services.api";

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