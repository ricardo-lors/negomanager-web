import { Routes, Route } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { DashboardPage } from '../components/dashboard/DashboardPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    return (
        <>
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
            </Routes>
        </>
    )
}
