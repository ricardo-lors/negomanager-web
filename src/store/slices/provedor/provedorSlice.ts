import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Provedor } from '../../../interfaces'

export interface provedorState {
    cargando: boolean,
    provedores: Array<Provedor>
}

const initialState: provedorState = {
    cargando: false,
    provedores: []
}

export const provedorSlice = createSlice({
    name: 'provedor',
    initialState,
    reducers: {
        startGetProvedores: (state) => {
            state.cargando = true;
        },
        setProvedores: (state, actions: PayloadAction<Array<Provedor>>) => {
            state.provedores = actions.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { startGetProvedores, setProvedores } = provedorSlice.actions

// export default provedorSlice.reducer