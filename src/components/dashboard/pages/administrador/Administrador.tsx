import { Route, Routes } from "react-router-dom"
import { NegocioPage } from "../shared/NegocioPage"
import { HomePage } from "./HomePage"
import { VendedoresPage } from "./VendedoresPage"
import { ProvedoresPage } from "../shared/ProvedoresPage"
import { CategoriasPage } from "../shared/CategoriasPage"
import { InventarioPage, AgregarModificarProductoPage } from "../shared"
import { ClientesPage } from "../shared/ClientesPage"

export const Administrador = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            {/* Ritas del Inventario */}
            <Route path='/administrador/inventario' element={<InventarioPage />} />
            <Route path='/administrador/inventario/producto/:id' element={<AgregarModificarProductoPage />} />
            <Route path='/administrador/inventario/producto' element={<AgregarModificarProductoPage />} />

            <Route path='/administrador/vendedores' element={<VendedoresPage />} />
            <Route path='/administrador/clientes' element={<ClientesPage />} />

            <Route path='/administrador/provedores' element={<ProvedoresPage />} />
            <Route path='/administrador/categorias' element={<CategoriasPage />} />
            <Route path='/administrador/negocio' element={<NegocioPage />} />
        </Routes>
    )
}
