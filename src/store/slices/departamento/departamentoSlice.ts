import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Departamento } from '../../../interfaces'

export interface departamentoState {
    cargando: boolean,
    departamentos: Departamento[]
}

const initialState: departamentoState = {
    cargando: true,
    departamentos: []
}

export const departamentoSlice = createSlice({
    name: 'departamentos',
    initialState,
    reducers: {
        startGetDeparatamentos: (state) => {
            state.cargando = true;
        },
        setDepartamentos: (state, action: PayloadAction<Departamento[]>) => {
            state.cargando = false;
            state.departamentos = action.payload;
        },
        setDepartamento: (state, action: PayloadAction<Departamento>) => {
            state.departamentos = [action.payload, ...state.departamentos];
        },
        endCargandoDepartamentos: (state) => {
            state.cargando = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { startGetDeparatamentos, setDepartamentos, endCargandoDepartamentos, setDepartamento } = departamentoSlice.actions

// export default clienteSlice.reducer