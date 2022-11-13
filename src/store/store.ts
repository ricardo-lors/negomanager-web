// import { combineReducers, applyMiddleware, compose } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { categoriaSlice } from './slices/categoria';
import { clienteSlice } from './slices/cliente';

import { counterSlice } from "./slices/counter";
import { negocioSlice } from './slices/negocio';
import { productoSlice } from './slices/producto';
import { provedorSlice } from './slices/provedor';
import { rolSlice } from './slices/rol';
import { uiSlice } from './slices/ui';
import { usuarioSlice } from './slices/usuario';
import { ventaSlice } from './slices/venta';

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        rol: rolSlice.reducer,
        negocio: negocioSlice.reducer,
        usuario: usuarioSlice.reducer,
        categoria: categoriaSlice.reducer,
        cliente: clienteSlice.reducer,
        producto: productoSlice.reducer,
        provedor: provedorSlice.reducer,
        venta: ventaSlice.reducer,
        ui: uiSlice.reducer,
        // provedor: provedor
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch