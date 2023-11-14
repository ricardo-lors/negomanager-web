
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage'
import { InventarioPage, AgregarModificarProductoPage, ClientesPage, ProvedoresPage, CategoriasPage, } from '../shared';
import { Caja } from './caja/Caja';

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

            <Route path='/vendedor/caja/*' element={<Caja />} />

        </Routes>
    )
}
