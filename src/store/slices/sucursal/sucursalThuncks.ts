import Swal from "sweetalert2";
import { NuevaSucursal, Sucursal, SucursalConvert, SucursalParams } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setSucursales, startGetSucursales } from "./sucursalSlice";

export const crearSucursal = async (sucursal: NuevaSucursal): Promise<Sucursal | undefined> => {
    try {
        Swal.fire('Creando sucursal');
        Swal.showLoading();
        const { status, data } = await servicesApiToken(`/sucursales`, { method: 'POST', data: sucursal });
        Swal.close();
        if (status === 201) return data;
        return undefined;
    } catch (error) {
        console.log(error);
        Swal.fire('Error', `${error}`, 'error');
        return undefined;
    }
}

export const obtenerSucursales = (sucursalParams: SucursalParams) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { status, data } = await servicesApiToken(`/sucursales`, { params: sucursalParams });
            if (status === 201) return dispatch(setSucursales([]));
            dispatch(setSucursales(data));
            // if (status === 201) return undefined;
            // return data;
        } catch (error) {
            console.log(error);
            Swal.fire('Error', `${error}`, 'error');
            // return undefined;
        }
    }
}

export const actualizarSucursal = async (id: string, sucursal: Sucursal): Promise<Sucursal | undefined> => {
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
