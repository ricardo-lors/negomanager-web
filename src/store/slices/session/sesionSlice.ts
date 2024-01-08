import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../../../interfaces'

export interface sesionState {
    logueado: boolean,
    usuario?: Usuario
}

const initialState: sesionState = {
    logueado: false,
}

export const sesionSlice = createSlice({
    name: 'sesion',
    initialState,
    reducers: {
        agregarSesion: (state, actions: PayloadAction<Usuario>) => {
            state.logueado = true;
            state.usuario = actions.payload;
        },
        removerSesion: (state) => {
            state.logueado = initialState.logueado;
            state.usuario = initialState.usuario;
        },
    },
})

export const { agregarSesion, removerSesion } = sesionSlice.actions;
