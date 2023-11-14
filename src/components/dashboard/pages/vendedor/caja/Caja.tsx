import { Route, Routes } from 'react-router-dom'
// import { VentasPage } from './VentasPage'
import { HomePage } from './HomePage'
import { VentaPage } from './VentaPage'

export const Caja = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/venta/:id' element={<VentaPage />} />
        </Routes>
    )
}
