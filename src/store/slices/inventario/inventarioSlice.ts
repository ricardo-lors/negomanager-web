import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Producto } from "../../../interfaces";


export interface InventarioState {
    cargando: boolean;
    productos: Producto[];
}
const initialState: InventarioState = {
    cargando: false,
    productos: []
}

export const inventarioSlice = createSlice({
    name: 'inventario',
    initialState,
    reducers: {
        agregarProductos: (state, actions: PayloadAction<Array<Producto>>) => {
            // state.productos = [...actions.payload.filter((producto) => !state.productos.includes(producto))]
            state.productos = [...actions.payload]
        },
        agregarProducto: (state, actions: PayloadAction<Producto>) => {
            state.productos = [actions.payload, ...state.productos]
        },
        actualizarProducto: (state, actions: PayloadAction<Producto>) => {
            state.productos = [actions.payload, ...state.productos.filter((producto) => !state.productos.includes(actions.payload))];
        }
    }
});

export const { agregarProducto, agregarProductos, actualizarProducto } = inventarioSlice.actions;

