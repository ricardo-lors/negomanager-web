// import { combineReducers, applyMiddleware, compose } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { categoriaSlice } from './slices/categoria';
import { clienteSlice } from './slices/cliente';

import { counterSlice } from "./slices/counter";
import { negocioSlice } from './slices/negocio';
import { productoSlice } from './slices/producto';
import { provedorSlice } from './slices/provedor';
import { uiSlice } from './slices/ui';
import { usuarioSlice } from './slices/usuario';
import { ventaSlice } from './slices/venta';
import { almacenSlice } from './slices/almacen';
import { sesionSlice } from './slices/session';

export const store = configureStore({
    reducer: {
        sesion: sesionSlice.reducer,
        usuario: usuarioSlice.reducer,
        negocio: negocioSlice.reducer,
        almacen: almacenSlice.reducer,
        categoria: categoriaSlice.reducer,
        cliente: clienteSlice.reducer,
        producto: productoSlice.reducer,
        provedor: provedorSlice.reducer,
        venta: ventaSlice.reducer,
        ui: uiSlice.reducer,
        counter: counterSlice.reducer,
        // provedor: provedor
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch