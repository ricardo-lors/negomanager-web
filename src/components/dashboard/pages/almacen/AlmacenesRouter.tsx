
import { Navigate, Route, Routes } from 'react-router-dom';
import { AlmacenesPage } from './AlmacenesPage';
import { InventarioRouter } from './inventario/InventarioRouter';
import { CajasPage } from './cajas/CajasPage';

export const AlmacenesRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<AlmacenesPage />} />
            <Route path='/inventario/*' element={<InventarioRouter />} />
            <Route path='/cajas' element={<CajasPage />} />

            <Route path='/*' element={<Navigate to="/dashboard/almacenes" replace={true} />} />
        </Routes>
    )
}
