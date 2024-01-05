

export interface NuevoNegocio {
    nombre: string,
    descripcion: string,
    correo: string,
    telefono: string,
    direccion: string,
    ciudad: string,
    estado: string,
    pais: string,
    codigo_postal: string,
}

export interface Negocio {
    id?: string;
    nombre: string;
    descripcion?: string;
    rfc?: string;
    giro?: string;
    calle: string;
    no_ext?: number;
    no_int?: number;
    codigo_postal: string;
    colonia?: string;
    ciudad: string;
    municipio?: string;
    estado: string;
    pais: string;
    latitud?: number;
    longitud?: number;
    correo?: string;
    telefono?: string;
    pagina?: string;
    caja?: number;
    folio?: number;
}

// Converts JSON strings to/from your types
export class NegocioConvert {
    public static toNegocio(json: string): Negocio {
        return JSON.parse(json);
    }

    public static negocioToJson(value: Negocio): string {
        return JSON.stringify(value);
    }

    public static toNegocioList(json: string): Negocio[] {
        return JSON.parse(json);
    }
}

// To parse this data:
//
//   import { Convert, Negocio } from "./file";
//
//   const negocio = Convert.toNegocio(json);

// export interface Negocio {
//     nombre:        string;
//     id:            string;
//     descripcion:   string;
//     direccion:     string;
//     ciudad:        string;
//     codigo_postal: string;
//     pais:          string;
//     estado:        string;
//     correo:        string;
//     telefono:      string;
//     rfc:           string;
//     giro:          string;
//     colonia:       string;
//     latitud:       number;
//     longitud:      number;
//     pagina:        string;
//     caja:          number;
//     folio:         number;
// }

// // Converts JSON strings to/from your types
// export class Convert {
//     public static toNegocio(json: string): Negocio {
//         return JSON.parse(json);
//     }

//     public static negocioToJson(value: Negocio): string {
//         return JSON.stringify(value);
//     }
// }
