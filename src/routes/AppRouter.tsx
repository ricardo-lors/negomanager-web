import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { DashboardPage } from '../components/dashboard/DashboardPage';
import { useAppDispatch } from '../hooks';
import { RootState } from '../store';
import { endGetUsuario, revalidarSesion } from '../store/slices/usuario';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { comenzarCambioTema } from '../store/slices/ui';
import { Registro } from '../components/auth/Registro';

export const AppRouter = () => {

    const dispatch = useAppDispatch();

    const { cargando } = useSelector((state: RootState) => state.usuario);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        
        if (theme === 'dark') {
            dispatch(comenzarCambioTema(true));
        } else {
            dispatch(comenzarCambioTema(false));
        }
        // const html = document.getElementById('htmlprin');
        // html?.setAttribute('data-bs-theme', `${theme}`);

        if (localStorage.getItem('x-token')) {
            dispatch(revalidarSesion());
        } else {
            dispatch(endGetUsuario());
        }
    }, [dispatch, cargando]);


    if (cargando) {
        return <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />

                <Route path="/registro" element={
                    <PublicRoute>
                        <Registro />
                    </PublicRoute>
                } />

                <Route path="/dashboard/*" element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                } />

                <Route path='/*' element={<Navigate to="/dashboard" replace={true} />} />
            </Routes>
        </BrowserRouter>
    )
}
