import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Negocio } from '../../../interfaces'

interface negocioState {
    cargando: boolean;
    negocios: Negocio[];
}

const initialState: negocioState = {
    cargando: true,
    negocios: [],
}

export const negocioSlice = createSlice({
    name: 'negocio',
    initialState,
    reducers: {
        startGetNegocio: (state) => {
            state.cargando = true;
        },
        setNegocios: (state, action: PayloadAction<Negocio[]>) => {
            state.cargando = false;
            state.negocios = action.payload;
        },
        removerNegocio: (state) => {
            state.cargando = initialState.cargando;
            state.negocios = initialState.negocios;
        },
        endCargandoNegocios: (state) => {
            state.cargando = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { startGetNegocio, setNegocios, removerNegocio, endCargandoNegocios } = negocioSlice.actions

// export default templateSlice.reducer