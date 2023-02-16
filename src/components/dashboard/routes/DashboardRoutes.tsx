import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom'
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
            </Routes>
        </>
    )
}
