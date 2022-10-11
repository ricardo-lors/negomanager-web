import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Cliente } from '../../../interfaces'

export interface clienteState {
    cargando: boolean,
    clientes: Cliente[]
}

const initialState: clienteState = {
    cargando: false,
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
        }
    },
})

// Action creators are generated for each case reducer function
export const { startGetClientes, setClientes } = clienteSlice.actions

// export default clienteSlice.reducer