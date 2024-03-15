import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NegocioPage } from './shared';
import { HomePage } from './home/HomePage';
import { ProvedoresPage } from './provedores/ProvedoresPage';
import { VentaRouter } from './venta/routes/VentaRouter';
import { AlmacenesRouter } from './almacen/AlmacenesRouter';
import { ClientesRouter } from './cliente/ClientesRouter';
import { UsuariosRouter } from './usuarios/UsuariosRouter';

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
            <Route path='/usuarios/*' element={<UsuariosRouter />} />
            <Route path='/clientes/*' element={<ClientesRouter />} />
            <Route path='/provedores' element={<ProvedoresPage />} />
            <Route path='/negocio' element={<NegocioPage />} />

            <Route path='/*' element={<Navigate to="/dashboard" replace={true} />} />
        </Routes>
    )
}
