import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProductoPage } from './ProductoPage'
import { AgregarModificarProductoPage } from './AgregarModificarProductoPage'
import { InventarioPage } from './InventarioPage';

export const ProductoRouter = () => {
    return (
        <Routes >

            <Route path='/' element={<ProductoPage />} />
            <Route path='/agregar' element={<AgregarModificarProductoPage />} />
            <Route path='/:id' element={<AgregarModificarProductoPage />} />
            <Route path='/inventario' element={<InventarioPage />} />

        </Routes>
    )
}
