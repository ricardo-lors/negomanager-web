import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { DashboardPage } from '../components/dashboard/DashboardPage';
import { useAppDispatch } from '../hooks';
import { RootState } from '../store';
import { revalidarSesion } from '../store/slices/usuario';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('x-token')) {
            dispatch(revalidarSesion());
        }
    }, [dispatch]);

    const { cargando } = useSelector((state: RootState) => state.usuario);

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
                <Route path="login/*" element={
                    <PublicRoute>
                        <Routes>
                            <Route path="/*" element={<Login />} />
                        </Routes>
                    </PublicRoute>
                } />

                <Route path="dashboard/*" element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                } />

                <Route path='/' element={<Navigate to="/dashboard" replace={true} />} />
            </Routes>
        </BrowserRouter>
    )
}
