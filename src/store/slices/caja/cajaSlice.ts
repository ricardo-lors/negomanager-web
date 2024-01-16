import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Caja } from '../../../interfaces/Caja.interface'

export interface CajaState {
    cargando: boolean,
    cajas: Caja[]
}

const initialState: CajaState = {
    cargando: true,
    cajas: []
}

export const cajaSlice = createSlice({
    name: 'caja',
    initialState,
    reducers: {
        comenzarObtenerCajas: (state) => {
            state.cargando = true;
        },
        agregarCajas: (state, actions: PayloadAction<Caja[]>) => {
            state.cargando = false;
            state.cajas = actions.payload;
        },
        agregarCaja: (state, actions: PayloadAction<Caja>) => {
            state.cajas = [actions.payload, ...state.cajas];
        },
        finalizarObtenerCajas: (state) => {
            state.cargando = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { comenzarObtenerCajas, agregarCajas, agregarCaja, finalizarObtenerCajas } = cajaSlice.actions

// export default categoriaSlice.reducer