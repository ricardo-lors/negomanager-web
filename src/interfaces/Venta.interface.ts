import { Negocio } from "./Negocio.interface";
import { Producto, ProductoVenta } from "./Producto.interface";
import { Usuario } from "./Usuario.interface";

export interface Venta {
    id: string;
    folio: number;
    fecha: Date;
    vendedor: Usuario;
    cliente?: Usuario;
    negocio: Negocio;
    total: number;
    pago: number;
    detalles: DetallesVenta[]
}

export interface VentaState {
    detalles: DetallesVenta[];
    cliente?: Usuario;
    total: number;
}

export interface DetallesVenta {
    cantidad: number,
    total: number,
    producto: ProductoVenta,
}

/* Interfaces de Nuevas Ventas */
export interface NuevaVenta {
    total: number;
    pago: number;
    cambio: number;
    cliente?: string;
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

