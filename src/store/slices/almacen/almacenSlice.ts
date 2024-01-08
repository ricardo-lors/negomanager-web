import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Almacen } from '../../../interfaces'

export interface AlmacenState {
    cargando: boolean,
    almacenes: Almacen[]
}

const initialState: AlmacenState = {
    cargando: true,
    almacenes: []
}

export const almacenSlice = createSlice({
    name: 'almacen',
    initialState,
    reducers: {
        startGetAlmacenes: (state) => {
            state.cargando = true;
        },
        setAlmacenes: (state, actions: PayloadAction<Almacen[]>) => {
            state.cargando = false;
            state.almacenes = actions.payload;
        },
        agregarAlmacen: (state, actions: PayloadAction<Almacen>) => {
            state.almacenes = [actions.payload, ...state.almacenes.filter(sc => sc.id !== actions.payload.id)];
            // setSucursales([sucursalActualizada, ...sucursales.filter(sc => sc.id !== sucursalActualizada?.id)]);
        },
        endCargandoAlmacen: (state) => {
            state.cargando = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { startGetAlmacenes, setAlmacenes, agregarAlmacen, endCargandoAlmacen } = almacenSlice.actions

// export default provedorSlice.reducer