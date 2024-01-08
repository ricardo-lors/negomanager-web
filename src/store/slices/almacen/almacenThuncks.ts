import Swal from "sweetalert2";
import { NuevoAlmacen, Almacen, SucursalParams } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setAlmacenes, startGetAlmacenes, } from "./almacenSlice";

export const crearAlmacen = async (almacen: NuevoAlmacen): Promise<Almacen | undefined> => {
    try {
        Swal.fire('Creando sucursal');
        Swal.showLoading();
        const { status, data } = await servicesApiToken(`/almacenes`, { method: 'POST', data: almacen });
        Swal.close();
        if (status === 201) return data;
        return undefined;
    } catch (error) {
        console.log(error);
        Swal.fire('Error', `${error}`, 'error');
        return undefined;
    }
}

export const obtenerAlmacenes = (sucursalParams: SucursalParams) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { status, data } = await servicesApiToken(`/almacenes`, { params: sucursalParams });
            if (status === 201) return dispatch(setAlmacenes([]));
            dispatch(setAlmacenes(data));
        } catch (error) {
            console.log(error);
            Swal.fire('Error', `${error}`, 'error');
            // return undefined;
        }
    }
}

export const actualizarAlmacen = async (id: string, sucursal: Almacen): Promise<Almacen | undefined> => {
    try {
        Swal.fire('Aplicando cambios');
        Swal.showLoading();
        const { status, data } = await servicesApiToken(`/sucursales/${id}`, { method: 'PATCH', data: sucursal });
        Swal.close();
        if (status === 200) return data;
        return undefined;
    } catch (error) {
        console.log(error)
        Swal.fire('Error', `${error}`, 'error');
        return undefined;
    }
}
