import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NegocioPage } from './shared';
import { HomePage } from './home/HomePage';
import { AlmacenesPage } from './almacen/AlmacenesPage';
import { UsuariosPage } from './usuarios/UsuariosPage';
import { VentaPage } from './venta/VentaPage';
import { ProvedoresPage } from './provedores/ProvedoresPage';
import { CategoriasPage } from './categorias/CategoriasPage';
import { DepartamentosPage } from './departamentos/DepartamentosPage';
import { LineasPage } from './lineas/LineasPage';
import { VentaRouter } from './venta/routes/VentaRouter';
import { AlmacenesRouter } from './almacen/AlmacenesRouter';

export const DashboardRouter = () => {


    const { usuario } = useSelector((state: RootState) => state.sesion);
    const { almacenes } = useSelector((state: RootState) => state.almacen);

    if (!usuario?.negocio) {
        return (
            <Routes>
                <Route path='/negocio' element={<NegocioPage />} />
                <Route path='/*' element={<Navigate to="/dashboard/negocio" replace={true} />} />
            </Routes>
        );
    }


    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/venta/*' element={<VentaRouter />} />
            <Route path='/almacenes/*' element={<AlmacenesRouter />} />
            <Route path='/usuarios' element={<UsuariosPage />} />
            <Route path='/provedores' element={<ProvedoresPage />} />
            <Route path='/categorias' element={<CategoriasPage />} />
            <Route path='/departamentos' element={<DepartamentosPage />} />
            <Route path='/lineas' element={<LineasPage />} />
            <Route path='/negocio' element={<NegocioPage />} />
            {/* {
            (usuario) && <Navigate to='/dashboard/administrador/negocio' replace={true} />
        } */}
            {/* <Route path='/' element={<HomePage />} /> */}
            {/* Ritas del Inventario */}
            {/* <Route path='/administrador/producto/*' element={<ProductoRouter />} />

            <Route path='/administrador/inventario/producto/:id' element={<AgregarModificarProductoPage />} />
            <Route path='/administrador/inventario/producto' element={<AgregarModificarProductoPage />} />

            <Route path='/administrador/vendedores' element={<VendedoresPage />} />

            <Route path='/administrador/provedores' element={<ProvedoresPage />} />
            <Route path='/administrador/categorias' element={<CategoriasPage />} />

            <Route path='/administrador/sucursal' element={<SucursalPage />} />

            <Route path='/administrador/ventas' element={<VentasPage />} /> */}

            <Route path='/*' element={<Navigate to="/dashboard" replace={true} />} />
        </Routes>
    )
}
