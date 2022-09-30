import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { rol } from '../../../interfaces'

export interface rolState {
    cargando: boolean,
    roles: Array<rol>
}

const initialState: rolState = {
    cargando: false,
    roles: [{
        id: 0,
        nombre: "Sin Categoria"
    }]
}

export const rolSlice = createSlice({
    name: 'rol',
    initialState,
    reducers: {
        startGetRol: (state) => {
            state.cargando = true;
        },
        setRoles: (state, actions: PayloadAction<Array<rol>>) => {
            state.roles = [...state.roles, ...actions.payload];
        }
    },
})

// Action creators are generated for each case reducer function
export const { startGetRol, setRoles } = rolSlice.actions

// export default rolSlice.reducer