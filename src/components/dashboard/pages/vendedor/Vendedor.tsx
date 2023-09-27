
import { Route, Routes } from 'react-router-dom'
import { CategoriasPage } from '../administrador/CategoriasPage'
import { ProvedoresPage } from '../administrador/ProvedoresPage'
import { HomePage } from './HomePage'
import { ClientesPage } from '../';
import { InventarioPage, AgregarModificarProductoPage } from '../shared';

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
        </Routes>
    )
}
