import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import { obtenerCategorias } from "../../store/slices/categoria/categoriaThuncks";
import { endCargandoProvedores, obtenerProvedoresNegocio } from "../../store/slices/provedor";
import { Navbar } from "../shared/Navbar";
import { Sidebar } from "../shared/Sidebar";
import { AdministradorRouter } from "./pages/administrador/AdministradorRouter";
import { SuperAdministrador } from "./pages/superadministrador/SuperAdministrador";
import { Vendedor } from "./pages/vendedor/Vendedor";
import { endCargandoAlmacen, obtenerAlmacenes } from "../../store/slices/almacen";
import { endCargandoNegocios, obtenerNegocios } from "../../store/slices/negocio";
import { endCargandoCategorias } from "../../store/slices/categoria";
import { endCargandoClientes } from "../../store/slices/cliente";

export const DashboardPage = () => {

    const { usuario } = useSelector((state: RootState) => state.sesion);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (usuario!.roles.includes('super-administrador')) {
            dispatch(obtenerNegocios());
            dispatch(endCargandoAlmacen());
            dispatch(endCargandoCategorias());
            dispatch(endCargandoProvedores());
            dispatch(endCargandoClientes());
        }
        if (usuario!.roles.includes('administrador')) {
            dispatch(endCargandoNegocios());
            usuario?.negocio && dispatch(obtenerAlmacenes({}));
            usuario?.negocio && dispatch(obtenerCategorias(usuario!.negocio!.id!));
            usuario?.negocio && dispatch(obtenerProvedoresNegocio(usuario!.negocio!.id!));
            // usuario?.negocio && dispatch(obtenerClientes(usuario!.negocio!.id!));
            dispatch(endCargandoClientes());
        }
        if (usuario!.roles.includes('vendedor')) {
            dispatch(endCargandoNegocios());
            usuario?.negocio && dispatch(obtenerAlmacenes({}));
            usuario?.negocio && dispatch(obtenerCategorias(usuario!.negocio!.id!));
            usuario?.negocio && dispatch(obtenerProvedoresNegocio(usuario!.negocio!.id!));
            // usuario?.negocio && dispatch(obtenerClientes(usuario!.negocio!.id!));
            dispatch(endCargandoClientes());
        }
    }, [dispatch]);

    const { cargando: cargandoNegocios } = useSelector((state: RootState) => state.negocio);
    const { cargando: cargandoCategoria } = useSelector((state: RootState) => state.categoria);
    const { cargando: cargandoProvedor } = useSelector((state: RootState) => state.provedor);
    const { cargando: cargandoClientes } = useSelector((state: RootState) => state.cliente);
    const { cargando: cargandoAlmacenes } = useSelector((state: RootState) => state.almacen);

    return (
        <>
            {
                cargandoNegocios || cargandoCategoria || cargandoProvedor || cargandoClientes || cargandoAlmacenes
                    ? <div className='d-flex justify-content-center align-items-center vh-100'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    : <>
                        <Navbar />
                        <div className="container-fluid">
                            <Sidebar />
                            {
                                usuario?.roles.includes('super-administrador')
                                    ? <SuperAdministrador />
                                    : usuario?.roles.includes('administrador')
                                        ? <AdministradorRouter />
                                        : <Vendedor />
                            }
                        </div>
                    </>
            }
            <div id="modal"></div>
        </>
    )
}
