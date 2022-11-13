import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Venta } from '../../../interfaces'

export interface ventaState {
    cargando: boolean,
    ventas: Venta[]
}

const initialState: ventaState = {
    cargando: false,
    ventas: []
}

export const ventaSlice = createSlice({
    name: 'venta',
    initialState,
    reducers: {
        startGetVentas: (state) => {
            state.cargando = true;
        },
        // setVentas: (state, actions: PayloadAction<Venta>) => {
        //     state.cargando = false;
        //     state.logueado = true;
        //     state.usuario = actions.payload;
        // },
        endGetVentas: (state) => {
            state.cargando = false;
        },
        setVentas: (state, actions: PayloadAction<Venta[]>) => {
            // state.cargando = false;
            // state.logueado = true;
            state.ventas = actions.payload;
        },
        removerVentas: (state) => {
            state.cargando = initialState.cargando;
            state.ventas = initialState.ventas;
        },
    },
})

// Action creators are generated for each case reducer function
export const { startGetVentas, setVentas, endGetVentas, removerVentas } = ventaSlice.actions

// export default usuarioSlice.reducer