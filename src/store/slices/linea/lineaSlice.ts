import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Departamento, Linea } from '../../../interfaces'

export interface lineaState {
    cargando: boolean,
    lineas: Linea[]
}

const initialState: lineaState = {
    cargando: true,
    lineas: []
}

export const lineaSlice = createSlice({
    name: 'linea',
    initialState,
    reducers: {
        startGetLinea: (state) => {
            state.cargando = true;
        },
        setLineas: (state, action: PayloadAction<Linea[]>) => {
            state.cargando = false;
            state.lineas = action.payload;
        },
        setLinea: (state, action: PayloadAction<Linea>) => {
            state.lineas = [action.payload, ...state.lineas];
        },
        endCargandoLineas: (state) => {
            state.cargando = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    startGetLinea,
    setLineas,
    setLinea, endCargandoLineas } = lineaSlice.actions

// export default clienteSlice.reducer