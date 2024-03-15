import Swal from "sweetalert2";
import { Cliente, ClienteConvert, QueryParamsCliente } from "../../../interfaces";
import { servicesApiToken } from "../../../services/services.api";
import { AppDispatch } from "../../store";
import { setClientes, startGetClientes } from "./clienteSlice";
import { NavigateFunction, redirect } from "react-router-dom";

export const obtenerClientes = () => {
    return async (dispatch: AppDispatch) => {
        const { status, data } = await servicesApiToken(`/clientes`, {});
        console.log(data);
        // if () {
        const clientes = ClienteConvert.toClienteList(JSON.stringify(data));
        dispatch(setClientes(clientes));
        // } else {
        // Swal.fire('Error', data.data, 'info');
        // }
    }
}
export const obtenerClientesBusqueda = async (queryParamsCliente: QueryParamsCliente) => {
    const { status, data } = await servicesApiToken(`/clientes`, { params: queryParamsCliente });
    return data;
    // if () {
    // const clientes = ClienteConvert.toClienteList(JSON.stringify(data));
    // dispatch(setClientes(clientes));
    // } else {
    // Swal.fire('Error', data.data, 'info');
    // }
}

export const crearCliente = (cliente: Cliente, navigate: NavigateFunction) => {
    return async (dispatch: AppDispatch) => {
        try {
            const { status, data } = await servicesApiToken(`/clientes`, { method: 'POST', data: cliente });
            console.log(data);
            console.log(status);
            if (status === 201) {
                return navigate('/dashboard/clientes')
                // const { data } = await servicesApiToken(`/cliente/negocio/${cliente.negocio.id}`, {});
                // if (data.ok) {
                //     const clientes = ClienteConvert.toClienteList(JSON.stringify(data.data));
                //     dispatch(setClientes(clientes));
                // } else {
                //     Swal.fire('Error', data.data, 'info');
                // }    
            } else {
                Swal.fire('Error', data.data, 'info');
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', `${error}`, 'info');
        }
    }
}
