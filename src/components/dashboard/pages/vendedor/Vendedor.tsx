
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage'
import { InventarioPage, AgregarModificarProductoPage, ClientesPage, ProvedoresPage, CategoriasPage, VentasPage } from '../shared';

export const Vendedor = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/vendedor/inventario' element={<InventarioPage />} />
            <Route path='/vendedor/inventario/producto/:id' element={<AgregarModificarProductoPage />} />
            <Route path='/vendedor/inventario/producto' element={<AgregarModificarProductoPage />} />
            <Route path='/vendedor/provedores' element={<ProvedoresPage />} />
            <Route path='/vendedor/categorias' element={<CategoriasPage />} />
            <Route path='/vendedor/clientes' element={<ClientesPage />} />
            <Route path='/vendedor/ventas' element={<VentasPage />} />
        </Routes>
    )
}
