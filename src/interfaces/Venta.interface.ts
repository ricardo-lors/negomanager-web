import { Producto } from "./Producto.interface";


export interface VentaState {
    detalles: DetallesVentaState[];
    total: number;
}

export interface DetallesVentaState {
    cantidad: number,
    total: number,
    producto: Producto,
}

export interface Venta {
    id?: number,
    total: number,
    fecha: string,
    usuarioid: number,
    clienteid: number,
}