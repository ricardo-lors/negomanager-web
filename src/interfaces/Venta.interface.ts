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
    negocioid: number
}

export interface NuevaVenta {
    total: number,
    usuarioid: number,
    clienteid: number,
    negocioid: number,
    detalles: DetallesVentaState[]
}

// Converts JSON strings to/from your types
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