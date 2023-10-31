import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useEffect, useState } from "react";
import { FormularioUsuario, Usuario } from "../../../../interfaces";

// import * as Yup from 'yup';
import { crearUsuario, obtenerUsuarios } from "../../../../store/slices/usuario";
import { UsuarioForm } from "../../../shared";

interface ClientesState {
    usuarios: Usuario[]
}

export const ClientesPage = () => {

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const [{ usuarios }, setState] = useState<ClientesState>({
        usuarios: []
    });

    useEffect(() => {
        obtenerUsuarios(usuario!.negocio!.id, 'cliente').then(listaUsuarios => {
            setState({ usuarios: listaUsuarios });
        });
    }, [usuario]);

    const onSubmit = async (values: FormularioUsuario) => {
        console.log(values);
        const listaUsuarios = await crearUsuario({
            nombre: values.nombre,
            correo: values.correo,
            telefono: values.telefono,
            contrasena: values.contrasena,
            roles: values.roles
        });
        setState({ usuarios: listaUsuarios });
    }

    return (
        <div className="row">
            <div className="col-md-3 border-end h-100 mb-3">
                <div className="text-center">
                    <h2>Clientes</h2>
                </div>
                <UsuarioForm rol={['cliente']} onSubmit={onSubmit} />
            </div>
            <div className="col" style={{ overflow: 'auto' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios?.map(st => st.roles.includes('cliente') && <tr key={st.id}>
                                <th>{st.nombre}</th>
                                <th>{st.correo}</th>
                                <th>{st.telefono}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

{/* <div className="row m-0 p-0">
<div className="col-md-5 border-end h-100">
    <h3></h3>
</div>
<div className="col">
    <div >
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Telefono</th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios?.map(st => st.roles.includes('cliente') && <tr key={st.id}>
                        <th>{st.nombre}</th>
                        <th>{st.correo}</th>
                        <th>{st.telefono}</th>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
</div>
</div> */}

