import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DetallesVenta, Producto, ProductoCorto, Venta, VentaState } from '../../../interfaces'

const initialState: VentaState = {
    total: 0.0,
    detalles: []
}

export const ventaSlice = createSlice({
    name: 'venta',
    initialState,
    reducers: {
        agregarProducto: (state, actions: PayloadAction<Producto | ProductoCorto>) => {
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
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        stock: producto.stock,
                        codigo: producto.codigo,
                        precio: producto.precio,
                        costo: producto.costo,
                        categorias: producto.categorias
                    }
                };
                const newDetallesList = [...state.detalles, detalles];
                state.detalles = newDetallesList;
                state.total = sumaTotal(newDetallesList);
            }
        },
        cambiarCantidad: (state, action: PayloadAction<{ index: number, cantidad: number }>) => {
            const { index, cantidad } = action.payload;
            state.detalles[index].cantidad = cantidad;
            state.detalles[index].total = state.detalles[index].producto.precio * cantidad;
            state.total = sumaTotal(state.detalles);
        },
        resetear: (state) => state = initialState,
    },
})

// Action creators are generated for each case reducer function
export const { agregarProducto, cambiarCantidad, resetear } = ventaSlice.actions

// export default usuarioSlice.reducer
const sumaTotal = (detalles: DetallesVenta[]): number => {
    let total: number = 0;
    detalles.map((det) => {
        total = total + Number(det.total);
    });
    return total;
}