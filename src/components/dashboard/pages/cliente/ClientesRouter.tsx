import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ClientesPage } from './ClientesPage'
import { ClientePage } from './ClientePage'
// import { ClientesPage } from '../shared'

export const ClientesRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<ClientesPage />} />
            <Route path='/cliente' element={<ClientePage />} />
            <Route path='/cliente/:id' element={<ClientePage />} />
            {/* <Route path='/agregar' element={<AgregarModificarProductoPage />} />
            <Route path='/:id' element={<AgregarModificarProductoPage />} />
            <Route path='/traspaso' element={<TraspasosPage />} /> */}
        </Routes>
    )
}
