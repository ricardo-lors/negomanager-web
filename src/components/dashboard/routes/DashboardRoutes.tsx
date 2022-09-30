import { Route, Routes } from 'react-router-dom'
import {
    CategoriasPage,
    ClientesPage,
    ComprasPage,
    InventarioPage,
    NegocioPage,
    ProductosPage,
    ProvedoresPage,
    PuntoVentaPage,
    VentasPage
} from '../pages';

export const DashboardRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<PuntoVentaPage />} />
                <Route path="/categorias" element={<CategoriasPage />} />
                <Route path="/clientes" element={<ClientesPage />} />
                <Route path="/compras" element={<ComprasPage />} />
                <Route path="/inventario" element={<InventarioPage />} />
                <Route path="/negocio" element={<NegocioPage />} />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/provedores" element={<ProvedoresPage />} />
                <Route path="/ventas" element={<VentasPage />} />
            </Routes>
        </>
    )
}
