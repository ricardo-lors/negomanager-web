
import { Navigate, Route, Routes } from 'react-router-dom';
import { AlmacenesPage } from './AlmacenesPage';
import { InventarioRouter } from './inventario/InventarioRouter';
import { CajasPage } from './cajas/CajasPage';
import { CategoriasPage } from './categorias/CategoriasPage';
import { DepartamentosPage } from './departamentos/DepartamentosPage';
import { LineasPage } from './lineas/LineasPage';

export const AlmacenesRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<AlmacenesPage />} />
            <Route path='/inventario/*' element={<InventarioRouter />} />
            <Route path='/cajas' element={<CajasPage />} />
            <Route path='/categorias' element={<CategoriasPage />} />
            <Route path='/departamentos' element={<DepartamentosPage />} />
            <Route path='/lineas' element={<LineasPage />} />

            <Route path='/*' element={<Navigate to="/dashboard/almacenes" replace={true} />} />
        </Routes>
    )
}
