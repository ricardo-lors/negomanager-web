import { Negocio } from "./Negocio.interface";
import { Producto } from "./Producto.interface";
import { Usuario } from "./Usuario.interface";

export interface Venta {
    id: string;
    fecha: Date;
    vendedor: Usuario;
    comprador: Usuario;
    negocio: Negocio;
    total: number;
    pago: number;
    detalles: DetallesVenta
}

export interface DetallesVenta {
    cantidad: number,
    total: number,
    producto: Producto,
}

/* Interfaces de Nuevas Ventas */
export interface NuevaVenta {
    total: number;
    pago: number;
    cambio: number;
    // vendedor: string;
    comprador: string;
    // negocio: string;
    detalles: DetallesVenta[]
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


export interface VentaState {
    detalles: DetallesVenta[];
    total: number;
}

