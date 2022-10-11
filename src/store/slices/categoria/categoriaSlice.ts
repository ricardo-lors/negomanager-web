import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Categoria } from '../../../interfaces'

export interface categoriaState {
    cargando: boolean,
    categorias: Categoria[]
}

const initialState: categoriaState = {
    cargando: false,
    categorias: []
}

export const categoriaSlice = createSlice({
    name: 'categoria',
    initialState,
    reducers: {
        startGetCategorias: (state) => {
            state.cargando = true;
        },
        setCategorias: (state, actions: PayloadAction<Categoria[]>) => {
            state.cargando = false;
            state.categorias = actions.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { startGetCategorias, setCategorias } = categoriaSlice.actions

// export default categoriaSlice.reducer