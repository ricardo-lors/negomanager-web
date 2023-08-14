import { Route, Routes } from "react-router-dom"
import { NegocioPage } from "./NegocioPage"
import { HomePage } from "./HomePage"
import { InventarioPage } from "./InventarioPage"
import { VendedoresPage } from "./VendedoresPage"
import { ProvedoresPage } from "./ProvedoresPage"
import { CategoriasPage } from "./CategoriasPage"
import { NuevoProductoPage } from "./ProductoPage"

export const Administrador = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/admin/inventario' element={<InventarioPage />} />
            <Route path='/admin/inventario/producto/:id' element={<NuevoProductoPage />} />
            <Route path='/admin/inventario/producto' element={<NuevoProductoPage />} />
            <Route path='/admin/vendedores' element={<VendedoresPage />} />
            <Route path='/admin/provedores' element={<ProvedoresPage />} />
            <Route path='/admin/categorias' element={<CategoriasPage />} />
            <Route path='/admin/negocio' element={<NegocioPage />} />
        </Routes>
    )
}
