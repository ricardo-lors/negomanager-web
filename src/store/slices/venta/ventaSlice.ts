import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DetallesVenta, Producto, ProductoVenta, Usuario, VentaState } from '../../../interfaces'

const initialState: VentaState = {
    cliente: undefined,
    detalles: [],
    total: 0.0,
}

export const ventaSlice = createSlice({
    name: 'venta',
    initialState,
    reducers: {
        agregarProducto: (state, actions: PayloadAction<ProductoVenta>) => {
            const producto = actions.payload;
            const index = state.detalles.findIndex(prod => prod.producto.id === producto.id);
            if (index >= 0) {
                state.detalles[index].cantidad = state.detalles[index].cantidad + 1;
                state.detalles[index].total = state.detalles[index].producto.precio * state.detalles[index].cantidad;
                state.total = sumaTotal(state.detalles);
            } else {
                const detalles: DetallesVenta = {
                    cantidad: 1,
                    total: producto.precio,
                    producto: {
                        id: producto.id!,
                        titulo: producto.titulo,
                        // descripcion: producto.descripcion,
                        codigo: producto.codigo,
                        precio: producto.precio,
                        inventario: producto.inventario
                    }
                };
                const newDetallesList = [...state.detalles, detalles];
                state.detalles = newDetallesList;
                state.total = sumaTotal(newDetallesList);
            }
        },
        agregarProductoNoRegistrado: (state, actions: PayloadAction<DetallesVenta>) => {
            const newDetallesList = [...state.detalles, actions.payload];
            state.detalles = newDetallesList;
            state.total = sumaTotal(newDetallesList);
        },
        cambiarCantidad: (state, action: PayloadAction<{ index: number, cantidad: number }>) => {
            const { index, cantidad } = action.payload;
            state.detalles[index].cantidad = cantidad;
            state.detalles[index].total = state.detalles[index].producto.precio * cantidad;
            state.total = sumaTotal(state.detalles);
        },
        asignarCliente: (state, actions: PayloadAction<Usuario>) => {
            state.cliente = actions.payload;
        },
        desasignarCliente: (state) => {
            state.cliente = undefined;
        },
        resetear: (state) => state = initialState,
    },
})

// Action creators are generated for each case reducer function
export const {
    agregarProducto,
    cambiarCantidad,
    agregarProductoNoRegistrado,
    asignarCliente,
    desasignarCliente,
    resetear
} = ventaSlice.actions

// export default usuarioSlice.reducer
const sumaTotal = (detalles: DetallesVenta[]): number => {
    let total: number = 0;
    detalles.map((det) => {
        total = total + Number(det.total);
    });
    return total;
}