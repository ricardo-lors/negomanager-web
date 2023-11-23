import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Sucursal } from '../../../interfaces'

export interface sucursalState {
    cargando: boolean,
    sucursales: Sucursal[]
}

const initialState: sucursalState = {
    cargando: true,
    sucursales: []
}

export const sucursalSlice = createSlice({
    name: 'sucursal',
    initialState,
    reducers: {
        startGetSucursales: (state) => {
            state.cargando = true;
        },
        setSucursales: (state, actions: PayloadAction<Sucursal[]>) => {
            state.cargando = false;
            state.sucursales = actions.payload;
        },
        agregarSucursal: (state, actions: PayloadAction<Sucursal>) => {
            state.sucursales = [actions.payload, ...state.sucursales.filter(sc => sc.id !== actions.payload.id)];
            // setSucursales([sucursalActualizada, ...sucursales.filter(sc => sc.id !== sucursalActualizada?.id)]);
        }
    },
})

// Action creators are generated for each case reducer function
export const { startGetSucursales, setSucursales, agregarSucursal } = sucursalSlice.actions

// export default provedorSlice.reducer