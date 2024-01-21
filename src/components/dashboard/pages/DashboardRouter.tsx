import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NegocioPage } from './shared';
import { HomePage } from './home/HomePage';
import { UsuariosPage } from './usuarios/UsuariosPage';
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

            <Route path='/*' element={<Navigate to="/dashboard" replace={true} />} />
        </Routes>
    )
}
