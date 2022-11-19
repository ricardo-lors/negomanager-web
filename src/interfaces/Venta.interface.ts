import { Producto } from "./Producto.interface";


/* Interfaces Ventas */

export interface Venta {
    id?: number,
    total: number,
    pago: number,
    fecha: Date,
    usuarionombre: string,
    clientenombre: string,
}

export class VentaConvert {
    public static toVenta(json: string): Venta {
        return JSON.parse(json);
    }

    public static ventaToJson(value: Venta): string {
        return JSON.stringify(value);
    }

    public static toVentaList(json: string): Venta[] {
        return JSON.parse(json);
    }
}

/* Interfaces de Nuevas Ventas */
export interface NuevaVenta {
    total: number,
    pago: number,
    usuarioid: number,
    clienteid: number,
    negocioid: number,
    detalles: DetallesVentaState[]
}

export interface VentaState {
    detalles: DetallesVentaState[];
    total: number;
}

export interface DetallesVentaState {
    cantidad: number,
    total: number,
    producto: Producto,
}
