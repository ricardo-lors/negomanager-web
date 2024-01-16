import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../../../interfaces'

export interface sesionState {
    cargando: boolean;
    logueado: boolean;
    usuario?: Usuario;
}

const initialState: sesionState = {
    cargando: true,
    logueado: false,
}

export const sesionSlice = createSlice({
    name: 'sesion',
    initialState,
    reducers: {
        agregarSesion: (state, actions: PayloadAction<Usuario>) => {
            state.cargando = false;
            state.logueado = true;
            state.usuario = actions.payload;
        },
        removerSesion: (state) => {
            state.logueado = initialState.logueado;
            state.usuario = initialState.usuario;
        },
        finCargandoSesion: (state) => {
            state.cargando = false;
        }
    },
})

export const { agregarSesion, removerSesion, finCargandoSesion } = sesionSlice.actions;
