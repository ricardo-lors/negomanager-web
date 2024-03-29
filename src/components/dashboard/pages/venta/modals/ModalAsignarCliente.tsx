import { useState, ChangeEvent } from "react";
import { Cliente, Usuario } from "../../../../../interfaces";
import { buscarUsuarios } from "../../../../../store/slices/usuario";
import { useDispatch } from "react-redux";
import { asignarCliente } from "../../../../../store/slices/venta";
import { obtenerClientesBusqueda } from "../../../../../store/slices/cliente";

export const ModalAsignarCliente = () => {

    const dispatch = useDispatch();

    const [clientes, setClientes] = useState<Cliente[]>([]);

    const onChange = async (values: ChangeEvent<HTMLInputElement>) => {
        const clientes = await obtenerClientesBusqueda({
            nombre: values.target.value,
            correo: values.target.value
        });
        setClientes(clientes);
    }

    // const onSubmit = () => {

    // }


    return (
        <>
            <form >
                <div className="input-group">
                    {/* {...getFieldProps('query')} */}
                    <input name="query" type="text" className="form-control" placeholder="Buscar..." onChange={onChange} />
                    <button type="submit" className="btn btn-primary">Buscar</button>
                </div>
                {/* {touched.query && errors.query && <span className="text-danger">{errors.query}</span>} */}
            </form>
            <div className="container border overflow-auto mt-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.length > 0
                                ?
                                clientes.map((cl, i) => <tr onClick={() => { dispatch(asignarCliente(clientes[i])); }} key={cl.id}>
                                    <th>{cl.nombre}</th>
                                    <th>{cl.correo}</th>
                                </tr>)
                                : <tr>
                                    <th>Escriba el nombre del usuario</th>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
