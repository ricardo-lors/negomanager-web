import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Usuario } from '../../../interfaces'

export interface usuarioState {
    cargando: boolean,
    logueado: boolean,
    usuario: Usuario
}

const initialState: usuarioState = {
    cargando: false,
    logueado: false,
    usuario: {
        nombre: '',
        correo: '',
        rolid: 0,
        negocioid: 0
    }
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
        }
    },
})

// Action creators are generated for each case reducer function
export const { startGetUsuario, setUsuario, endGetUsuario } = usuarioSlice.actions

// export default usuarioSlice.reducer