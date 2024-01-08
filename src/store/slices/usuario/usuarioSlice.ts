import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../../../interfaces'

export interface usuarioState {
    cargando: boolean,
    usuarios: Usuario[]
}

const initialState: usuarioState = {
    cargando: true,
    usuarios: []
}

export const usuarioSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
        startGetUsuario: (state) => {
            state.cargando = true;
        },
        setUsuario: (state, actions: PayloadAction<Usuario>) => {
            state.cargando = false;
            state.usuarios = [actions.payload, ...state.usuarios];
        },
        setUsuarios: (state, actions: PayloadAction<Usuario[]>) => {
            state.cargando = false;
            state.usuarios = actions.payload;
        },
        endGetUsuario: (state) => {
            state.cargando = false;
        },
        removerSession: (state) => {
            state.cargando = initialState.cargando;
            state.usuarios = initialState.usuarios;
        },
    },
})

// Action creators are generated for each case reducer function
export const { startGetUsuario, setUsuario, endGetUsuario } = usuarioSlice.actions

// export default usuarioSlice.reducer