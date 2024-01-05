// To parse this data:
//
//   import { Convert, Sucursal } from "./file";
//
//   const sucursal = Convert.toSucursal(json);

import { Negocio } from "./Negocio.interface";

interface AlmacenBasica {
    id?: string;
    nombre: string;
    direccion?: string;
    correo?: string;
    telefono?: string;
}

export interface Almacen extends AlmacenBasica {
    caja: number;
    negocio?: Negocio;
}

export interface NuevoAlmacen extends AlmacenBasica {
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
    public static toSucursal(json: string): Almacen {
        return JSON.parse(json);
    }

    public static sucursalToJson(value: Almacen): string {
        return JSON.stringify(value);
    }
}
