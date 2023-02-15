import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom'
import { RootState } from '../../../store';
import {
    CategoriasPage,
    ClientesPage,
    ComprasPage,
    InventarioPage,
    NegocioPage,
    NegociosPage,
    ProductosPage,
    ProvedoresPage,
    PuntoVentaPage,
    VentasPage
} from '../pages';
import { VendedoresPage } from '../pages/VendedoresPage';

export const DashboardRoutes = () => {

    const { usuario } = useSelector((state: RootState) => state.usuario);

    return (
        <>
            <Routes>
                <Route path="/puntoventa" element={<PuntoVentaPage />} />
                <Route path="/categorias" element={<CategoriasPage />} />
                <Route path="/clientes" element={<ClientesPage />} />
                <Route path="/compras" element={<ComprasPage />} />
                <Route path="/inventario" element={<InventarioPage />} />
                <Route path="/negocio" element={<NegocioPage />} />
                <Route path="/negocios" element={<NegociosPage />} />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/provedores" element={<ProvedoresPage />} />
                <Route path="/ventas" element={<VentasPage />} />
                <Route path="/vendedores" element={<VendedoresPage />} />

                <Route path="/" element={
                    usuario?.roles.includes('super-administrador')
                        ? <Navigate to='/dashboard/negocios' replace={true} />
                        : usuario?.roles.includes('administrador')
                            ? <Navigate to='/dashboard/inventario' replace={true} />
                            : <Navigate to='/dashboard/puntoventa' replace={true} />
                } />

                {/* <Navigate to="/marvel" /> */}
            </Routes>
        </>
    )
}
