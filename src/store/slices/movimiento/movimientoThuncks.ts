import { Movimiento, MovimientoParams } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";


export const obtenerMovimientos = async (movimientoParams: MovimientoParams) => {


    const { status, data } = await servicesApiToken(`/movimientos`, { params: movimientoParams });
    console.log(data);

    return data;

}

export const crearMovimiento = async (movimiento: Movimiento) => {

    try {

        const { status, data } = await servicesApiToken(`/movimientos`, { method: 'POST', data: movimiento });
        console.log(data);

        return data;
    } catch (error) {
        console.log(error)
    }


}


// export const crearMovimiento = async (movimiento: Movimiento) => {

//     try {

//         const { status, data } = await servicesApiToken(`/movimientos`, { method: 'POST', data: movimiento });
//         console.log(data);

//         return data;
//     } catch (error) {
//         console.log(error)
//     }


// }