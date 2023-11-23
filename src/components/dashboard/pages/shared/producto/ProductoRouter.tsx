import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProductoPage } from './ProductoPage'
import { AgregarModificarProductoPage } from './AgregarModificarProductoPage'

export const ProductoRouter = () => {
    return (
        <Routes >

            <Route path='/' element={<ProductoPage />} />
            <Route path='/agregar' element={<AgregarModificarProductoPage />} />
            <Route path='/:id' element={<AgregarModificarProductoPage />} />

        </Routes>
    )
}
