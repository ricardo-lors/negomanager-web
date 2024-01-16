
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage'
import { AgregarModificarProductoPage, ClientesPage, CategoriasPage, } from '../shared';
import { Caja } from './caja/Caja';
import { InventarioRouter } from '../almacen/inventario/InventarioRouter';

export const Vendedor = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/vendedor/producto/*' element={<InventarioRouter />} />


            {/* <Route path='/vendedor/inventario' element={<InventarioRouter />} /> */}


            <Route path='/vendedor/inventario/producto/:id' element={<AgregarModificarProductoPage />} />
            <Route path='/vendedor/inventario/producto' element={<AgregarModificarProductoPage />} />

            <Route path='/vendedor/categorias' element={<CategoriasPage />} />
            <Route path='/vendedor/clientes' element={<ClientesPage />} />

            <Route path='/vendedor/caja/*' element={<Caja />} />

        </Routes>
    )
}
