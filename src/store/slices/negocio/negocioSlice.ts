import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Negocio } from '../../../interfaces'

interface negocioState {
    cargando: boolean;
    negocios: Negocio[];
    negocio: Negocio;
}

const initialState: negocioState = {
    cargando: false,
    negocios: [],
    negocio: {
        nombre: '',
        descripcion: '',
        correo: '',
        telefono: ''
    }
}

export const negocioSlice = createSlice({
    name: 'negocio',
    initialState,
    reducers: {
        startGetNegocio: (state) => {
            state.cargando = true;
        },
        setNegocio: (state, action: PayloadAction<Negocio>) => {
            state.cargando = false;
            state.negocio = action.payload;
        },
        setNegocios: (state, action: PayloadAction<Negocio[]>) => {
            state.cargando = false;
            state.negocios = action.payload;
        },
        removerNegocio: (state) => {
            state.cargando = initialState.cargando;
            state.negocios = initialState.negocios;
            state.negocio = initialState.negocio;

        },
    },
})

// Action creators are generated for each case reducer function
export const { startGetNegocio, setNegocio, setNegocios, removerNegocio } = negocioSlice.actions

// export default templateSlice.reducer