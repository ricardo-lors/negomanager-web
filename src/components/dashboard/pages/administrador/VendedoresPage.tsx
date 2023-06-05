import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../hooks";
import { RootState } from "../../../../store";
import { useEffect, useState } from "react";
import { FormikHelpers } from "formik";
import { Usuario, UsuarioForm } from "../../../../interfaces";

// import * as Yup from 'yup';
import { crearUsuario, obtenerUsuarios } from "../../../../store/slices/usuario";
import { FormularioAgregarUsuarios } from "../../../shared/FormularioAgregarUsuarios";

interface VendedoresState {
    usuarios: Usuario[]
}

export const VendedoresPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const [{ usuarios }, setState] = useState<VendedoresState>({
        usuarios: []
    });

    useEffect(() => {
        // negocio.id && dispatch(obtenerProductosNegocio(negocio.id))
        obtenerUsuarios(usuario!.negocio!.id, 'vendedor').then(resp => {
            console.log(resp)
            setState({ usuarios: resp });
        });
    }, [usuario]);

    const onSubmit: (values: UsuarioForm, formikHelpers: FormikHelpers<UsuarioForm>) => void | Promise<any> = async (values) => {
        console.log(values);
        dispatch(crearUsuario({
            nombre: values.nombre,
            contrasena: values.contrasena,
            correo: values.correo,
            roles: values.roles,
        }));
    }

    return (

        <div className="row">
            <div className="col-3 border-end vh-100">
                <div className="text-center">
                    <h2>Vendedores</h2>
                </div>
                <FormularioAgregarUsuarios rol={['vendedor']} submit={onSubmit} />
            </div>
            <div className="col-9">
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
                            usuarios?.map(st => st.roles.includes('vendedor') && <tr key={st.id}>
                                <th>{st.nombre}</th>
                                <th>{st.correo}</th>
                                {/* <th>{st.telefono}</th> */}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
