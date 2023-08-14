import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Producto } from '../../../interfaces'

export interface productoState {
  cargando: boolean,
  productos: Array<Producto>
}

const initialState: productoState = {
  cargando: false,
  productos: []
}

export const productoSlice = createSlice({
  name: 'producto',
  initialState,
  reducers: {
    startGetProductos: (state) => {
      state.cargando = true;
    },
    setProductos: (state, actions: PayloadAction<Array<Producto>>) => {
      state.productos = [...state.productos, ...actions.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { startGetProductos, setProductos } = productoSlice.actions

// export default productoSlice.reducer