import { MovimientoParams } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";


export const obtenerMovimientos = async (movimientoParams: MovimientoParams) => {


    const { status, data } = await servicesApiToken(`/movimientos`, { params: movimientoParams });
    console.log(data);

    return data;

}