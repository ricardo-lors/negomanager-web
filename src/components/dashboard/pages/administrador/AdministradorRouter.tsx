import { Navigate, Route, Routes } from "react-router-dom"
import { NegocioPage } from "../shared/NegocioPage"
import { HomePage } from "./HomePage"
import { VendedoresPage } from "./VendedoresPage"
import { ProvedoresPage } from "../shared/ProvedoresPage"
import { CategoriasPage } from "../shared/CategoriasPage"
import { InventarioPage, AgregarModificarProductoPage, VentasPage } from "../shared"
import { SucursalPage } from "./SucursalPage"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store"
import { ProductoRouter } from "../shared/producto/ProductoRouter"

export const AdministradorRouter = () => {

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { sucursales } = useSelector((state: RootState) => state.sucursal);

    if (!usuario?.negocio || sucursales.length === 0) {
        return (
            <Routes>
                <Route path='/administrador/negocio' element={<NegocioPage />} />
                <Route path='/*' element={<Navigate to="/dashboard/administrador/negocio" replace={true} />} />
            </Routes>
        );
    }

    return (
        <Routes>
            {/* {
                (usuario) && <Navigate to='/dashboard/administrador/negocio' replace={true} />
            } */}
            <Route path='/administrador' element={<HomePage />} />
            {/* Ritas del Inventario */}
            <Route path='/administrador/producto/*' element={<ProductoRouter />} />


            <Route path='/administrador/inventario' element={<InventarioPage />} />
            <Route path='/administrador/inventario/producto/:id' element={<AgregarModificarProductoPage />} />
            <Route path='/administrador/inventario/producto' element={<AgregarModificarProductoPage />} />

            <Route path='/administrador/vendedores' element={<VendedoresPage />} />

            <Route path='/administrador/provedores' element={<ProvedoresPage />} />
            <Route path='/administrador/categorias' element={<CategoriasPage />} />

            <Route path='/administrador/negocio' element={<NegocioPage />} />
            <Route path='/administrador/sucursal' element={<SucursalPage />} />

            <Route path='/administrador/ventas' element={<VentasPage />} />

            <Route path='/*' element={<Navigate to="/dashboard/administrador" replace={true} />} />
        </Routes>
    )
}
