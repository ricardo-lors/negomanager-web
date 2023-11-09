// To parse this data:
//
//   import { Convert, Sucursal } from "./file";
//
//   const sucursal = Convert.toSucursal(json);

import { Negocio } from "./Negocio.interface";

interface SucursalBasica {
    id?: string;
    nombre: string;
    direccion?: string;
    correo?: string;
    telefono?: string;
}

export interface Sucursal extends SucursalBasica {
    caja: number;
    negocio?: Negocio;
}

export interface NuevaSucursal extends SucursalBasica {
    caja?: number,
    negocio?: string;
}

export interface SucursalParams {

    nombre?: string;
    direccion?: string;
    correo?: string;
    telefono?: string;
    negocio?: string;

}


// Converts JSON strings to/from your types
export class SucursalConvert {
    public static toSucursal(json: string): Sucursal {
        return JSON.parse(json);
    }

    public static sucursalToJson(value: Sucursal): string {
        return JSON.stringify(value);
    }
}
