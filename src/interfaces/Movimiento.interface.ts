
// To parse this data:
//
//   import { Convert, Movimiento } from "./file";
//
//   const movimiento = Convert.toMovimiento(json);

import { Usuario } from "./Usuario.interface";

export interface Movimiento {
    id: string;
    folio: number;
    tipo: string;
    fecha: Date;
    descuento: boolean;
    razon_descuento: null;
    cantidad: number;
    total: string;
    venta: Venta;
}

export interface MovimientoParams {

    tipo?: string;

    fecha_inicio?: string;

    fecha_final?: string;

    descuento?: boolean;

    venta?: string;

    vendedor?: string;

}

interface Venta {
    id: string;
    total: number;
    cliente: Usuario
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMovimiento(json: string): Movimiento {
        return JSON.parse(json);
    }

    public static movimientoToJson(value: Movimiento): string {
        return JSON.stringify(value);
    }
}
