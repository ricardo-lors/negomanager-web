import { FormCorte } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";

export const crearCorte = async (corte: FormCorte) => {
    try {
        const { status, data } = await servicesApiToken(`/cortes`, { method: 'POST', data: corte });
        console.log(data);

        return data;
    } catch (error) {
        console.log(error)
    }
}

// export const obtenerCorte = async (queryParamsInventario: QueryParamsInventario) => {
//     try {
//         const { status, data } = await servicesApiToken(`/inventario`, { method: 'GET', params: queryParamsInventario });
//         console.log(data);

//         return data;
//     } catch (error) {
//         console.log(error)
//     }
// }