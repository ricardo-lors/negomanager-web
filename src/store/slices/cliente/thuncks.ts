import Swal from "sweetalert2";
import { Cliente, ClienteConvert } from "../../../interfaces";
import { servicesApiToken } from "../../../services/sesionApi";
import { AppDispatch } from "../../store";
import { setClientes, startGetClientes } from "./clienteSlice";

export const obtenerClientes = (negocioid: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch(startGetClientes());
        const { data } = await servicesApiToken.get(`/cliente/negocio/${negocioid}`);
        if (data.ok) {
            const clientes = ClienteConvert.toClienteList(JSON.stringify(data.data));
            dispatch(setClientes(clientes));
        } else {
            Swal.fire('Error', data.data, 'info');
        }
    }
}

export const crearCliente = (cliente: Cliente) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { data } = await servicesApiToken.post(`/cliente`, cliente);
            if (data.ok) {
                const { data } = await servicesApiToken.get(`/cliente/negocio/${cliente.negocioid}`);
                if (data.ok) {
                    const clientes = ClienteConvert.toClienteList(JSON.stringify(data.data));
                    dispatch(setClientes(clientes));
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
