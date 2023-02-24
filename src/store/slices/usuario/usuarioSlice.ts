import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../../../interfaces'

export interface usuarioState {
    cargando: boolean,
    logueado: boolean,
    usuarios?: Usuario[]
    usuario?: Usuario
}

const initialState: usuarioState = {
    cargando: true,
    logueado: false,
}

export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
        startGetUsuario: (state) => {
            state.cargando = true;
        },
        setUsuario: (state, actions: PayloadAction<Usuario>) => {
            state.cargando = false;
            state.logueado = true;
            state.usuario = actions.payload;
        },
        endGetUsuario: (state) => {
            state.cargando = false;
        },
        setUsuarios: (state, actions: PayloadAction<Usuario[]>) => {
            state.cargando = false;
            state.logueado = true;
            state.usuarios = actions.payload;
        },
        removerUsuario: (state) => {
            state.cargando = initialState.cargando;
            state.logueado = initialState.logueado;
            state.usuarios = initialState.usuarios;
            state.usuario = initialState.usuario;
        },
    },
})

// Action creators are generated for each case reducer function
export const { startGetUsuario, setUsuario, endGetUsuario, setUsuarios, removerUsuario } = usuarioSlice.actions

// export default usuarioSlice.reducer