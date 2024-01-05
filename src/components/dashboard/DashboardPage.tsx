import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks";
import { RootState } from "../../store";
import { obtenerCategorias } from "../../store/slices/categoria/categoriaThuncks";
import { obtenerProvedoresNegocio } from "../../store/slices/provedor";
import { Navbar } from "../shared/Navbar";
import { Sidebar } from "../shared/Sidebar";
import { AdministradorRouter } from "./pages/administrador/AdministradorRouter";
import { SuperAdministrador } from "./pages/superadministrador/SuperAdministrador";
import { Vendedor } from "./pages/vendedor/Vendedor";
import { obtenerAlmacen } from "../../store/slices/almacen";

export const DashboardPage = () => {

    const { usuario } = useSelector((state: RootState) => state.usuario);

    const dispatch = useAppDispatch();

    useEffect(() => {
        (usuario?.roles.includes('administrador') || usuario?.roles.includes('vendedor')) && dispatch(obtenerAlmacen({}));
        usuario?.negocio && !usuario?.roles.includes('super-administrador') && dispatch(obtenerCategorias(usuario?.negocio!.id!));
        usuario?.negocio && !usuario?.roles.includes('super-administrador') && dispatch(obtenerProvedoresNegocio(usuario?.negocio!.id!));
        // usuario?.negocio && dispatch(obtenerClientes(usuario?.negocio!.id));
        // usuario?.negocio && dispatch(obtenerUsuarios(usuario?.negocio!.id));
    }, [dispatch]);

    const { cargando: cargandoNegocio } = useSelector((state: RootState) => state.negocio);
    const { cargando: cargandoCategoria } = useSelector((state: RootState) => state.categoria);
    const { cargando: cargandoProvedor } = useSelector((state: RootState) => state.provedor);
    const { cargando: cargandoClientes } = useSelector((state: RootState) => state.cliente);
    const { cargando: cargandoSucursales, almacenes } = useSelector((state: RootState) => state.almacen);

    return (
        <>
            {
                cargandoNegocio || cargandoCategoria || cargandoProvedor || cargandoClientes 
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
