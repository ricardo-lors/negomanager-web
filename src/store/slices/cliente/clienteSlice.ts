import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Cliente } from '../../../interfaces'

export interface clienteState {
    cargando: boolean,
    clientes: Cliente[]
}

const initialState: clienteState = {
    cargando: true,
    clientes: []
}

export const clienteSlice = createSlice({
    name: 'cliente',
    initialState,
    reducers: {
        startGetClientes: (state) => {
            state.cargando = true;
        },
        setClientes: (state, action: PayloadAction<Cliente[]>) => {
            state.cargando = false;
            state.clientes = action.payload;
        },
        endCargandoClientes: (state) => {
            state.cargando = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { startGetClientes, setClientes, endCargandoClientes } = clienteSlice.actions

// export default clienteSlice.reducer