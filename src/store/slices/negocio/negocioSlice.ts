import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { negocio } from '../../../interfaces'

interface negocioState {
    cargando: boolean,
    negocio: negocio
}

const initialState: negocioState = {
    cargando: false,
    negocio: {
        nombre: '',
        descripcion: '',
        correo: '',
        telefono: ''
    }
}

export const negocioSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        startGetNegocio: (state) => {
            state.cargando = true;
        },
        setNegocio: (state, action: PayloadAction<negocio>) => {
            state.negocio = action.payload;
        }
        // increment: (state) => {
        //     state.value += 1
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { startGetNegocio, setNegocio } = negocioSlice.actions

// export default templateSlice.reducer