import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../hooks"
import { RootState } from "../../store"
import { obtenerCategorias } from "../../store/slices/categoria/thuncks"
import { obtenerClientes } from "../../store/slices/cliente/thuncks"
import { obtenerNegocio } from "../../store/slices/negocio/thuncks"
import { obtenerProvedoresNegocio } from "../../store/slices/provedor"
import { obtenerUsuarios } from "../../store/slices/usuario"
import { Navbar } from "../shared/Navbar"
import { Sidebar } from "../shared/Sidebar"
import { DashboardRoutes } from "./routes/DashboardRoutes"

export const DashboardPage = () => {

    const { usuario } = useSelector((state: RootState) => state.usuario);

    const dispatch = useAppDispatch();

    useEffect(() => {
        usuario.negocioid && dispatch(obtenerNegocio(usuario.negocioid!));
        usuario.negocioid && dispatch(obtenerCategorias(usuario.negocioid!));
        usuario.negocioid && dispatch(obtenerProvedoresNegocio(usuario.negocioid!));
        usuario.negocioid && dispatch(obtenerClientes(usuario.negocioid!));
        usuario.rolid === 2 && dispatch(obtenerUsuarios(usuario.negocioid!));
    }, [dispatch]);

    const { cargando: cargandoNegocio } = useSelector((state: RootState) => state.negocio);
    const { cargando: cargandoCategoria } = useSelector((state: RootState) => state.categoria);
    const { cargando: cargandoProvedor } = useSelector((state: RootState) => state.provedor);
    const { cargando: cargandoClientes } = useSelector((state: RootState) => state.cliente);

    if (cargandoNegocio || cargandoCategoria || cargandoProvedor || cargandoClientes) {
        return <h1>Cargando data</h1>
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <Sidebar />
                <DashboardRoutes />
            </div>
        </>
    )
}


{/* <div className="container-fluid">
<div className="row">
    <Sidebar />
    <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <DashboardRoutes />
    </div>
</div>
</div> */}