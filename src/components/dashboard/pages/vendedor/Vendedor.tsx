
import { Route, Routes } from 'react-router-dom'
import { CategoriasPage } from '../administrador/CategoriasPage'
import { InventarioPage } from '../administrador/InventarioPage'
import { ProvedoresPage } from '../administrador/ProvedoresPage'
import { HomePage } from './HomePage'

export const Vendedor = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/vendedor/inventario' element={<InventarioPage />} />
            <Route path='/vendedor/provedores' element={<ProvedoresPage />} />
            <Route path='/vendedor/categorias' element={<CategoriasPage />} />
        </Routes>
    )
}
