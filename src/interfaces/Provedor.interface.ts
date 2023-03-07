import { Negocio } from "./Negocio.interface";

// export interface NuevoProvedor {
//     nombre: string,
//     correo?: string,
//     telefono?: string,
//     negocio: Negocio
// }

export interface Provedor {
    id?: number,
    nombre: string,
    descripcion?: string,
    correo?: string,
    telefono?: string,
    activo?: boolean,
    attribitos?: object,
    creado?: Date,
    actualizado?: Date,
    negocio?: Negocio
}

// Converts JSON strings to/from your types
export class ProvedorConvert {
    public static toProvedor(json: string): Provedor {
        return JSON.parse(json);
    }

    public static provedorToJson(value: Provedor): string {
        return JSON.stringify(value);
    }

    public static toProvedorList(json: string): Provedor[] {
        return JSON.parse(json);
    }
}
