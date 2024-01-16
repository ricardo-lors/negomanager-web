
import { Route, Routes } from 'react-router-dom';
import { AgregarModificarProductoPage } from './AgregarModificarProductoPage';
import { InventarioPage } from './InventarioPage';
import { TraspasosPage } from './TraspasosPage';

export const InventarioRouter = () => {
    return (
        <Routes >

            <Route path='/' element={<InventarioPage />} />
            <Route path='/agregar' element={<AgregarModificarProductoPage />} />
            <Route path='/:id' element={<AgregarModificarProductoPage />} />
            <Route path='/traspaso' element={<TraspasosPage />} />

        </Routes>
    )
}
