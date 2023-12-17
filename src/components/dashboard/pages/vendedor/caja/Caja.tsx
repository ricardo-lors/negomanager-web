import { Route, Routes } from 'react-router-dom'
// import { VentasPage } from './VentasPage'
import { HomePage } from './HomePage'
import { VentaPage } from './VentaPage'
import { MovimientoPage } from './MovimientoPage'

export const Caja = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/venta' element={<VentaPage />} />
            <Route path='/movimiento' element={<MovimientoPage />} />
        </Routes>
    )
}
