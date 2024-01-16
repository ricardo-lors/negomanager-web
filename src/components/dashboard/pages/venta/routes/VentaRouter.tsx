import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { VentaPage } from '../VentaPage'
import { VerificarCaja } from './VerificarCaja'
import { AperturaCaja } from '../AperturaCaja'
import { CajaAbierta } from './CajaAbierta'
import { CajaCerrada } from './CajaCerrada'

export const VentaRouter = () => {


    return (
        <Routes>
            <Route path='/' element={
                <CajaAbierta>
                    <VentaPage />
                </CajaAbierta>
            } />
            <Route path='/apertura' element={
                <CajaCerrada>
                    <AperturaCaja />
                </CajaCerrada>
            } />

            <Route path='/*' element={<Navigate to="/dashboard/venta" replace={true} />} />
        </Routes>
    )
}
