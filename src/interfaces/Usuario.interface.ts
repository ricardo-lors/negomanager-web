
import { Negocio } from "./Negocio.interface";

// nombre: values.nombre,
// correo: values.correo,
// telefono: values.telefono,
// contrasena: values.contrasena,
// roles: values.roles
export interface Usuario {
    id?: string;
    nombre: string;
    correo: string;
    telefono?: string;
    activo?: boolean;
    roles: string[];
    attributos?: Attributos;
    creado?: Date;
    actualizado?: Date;
    negocio?: Negocio;
    turno?: Turno;
    turnos?: Turno[];
    token?: string;
}

export interface Attributos {
    caja: number;
}

export interface Turno {
    id?: string;
    iniciado?: Date;
    finalizado?: Date;
    caja: number;
    activo?: boolean;
}

export interface FormularioUsuario extends Usuario {
    contrasena: string;
    contrasenaRepeat?: string;
}

export interface UsuarioLogin {
    correo: string;
    contrasena: string;
}

// Converts JSON strings to/from your types
export class UsuarioConvert {
    public static toUsuario(json: string): Usuario {
        return JSON.parse(json);
    }

    public static usuarioToJson(value: Usuario): string {
        return JSON.stringify(value);
    }

    public static toUsuarioList(value: string): Usuario[] {
        return JSON.parse(value);
    }
}

export interface QueryParamsUsuario {
    correo?: string;
    nombre?: string;
    telefono?: string;
    activo?: boolean;
    roles?: string[]
    negocio?: Negocio
}


// To parse this data:
//
//   import { Convert, Usuaro } from "./file";
//
//   const usuaro = Convert.toUsuaro(json);

// export interface Usuaro {
//     id:          string;
//     nombre:      string;
//     correo:      string;
//     telefono:    null;
//     activo:      boolean;
//     roles:       string[];
//     attributos:  Attributos;
//     creado:      Date;
//     actualizado: Date;
//     negocio:     Negocio;
//     turno:       Turno;
//     token:       string;
// }

// export interface Attributos {
//     caja: number;
// }

// export interface Negocio {
//     id:          string;
//     nombre:      string;
//     descripcion: string;
//     correo:      string;
//     telefono:    string;
//     caja:        number;
// }

// export interface Turno {
//     id:         string;
//     iniciado:   Date;
//     finalizado: null;
//     caja:       number;
//     activo:     boolean;
// }

// // Converts JSON strings to/from your types
// export class Convert {
//     public static toUsuaro(json: string): Usuaro {
//         return JSON.parse(json);
//     }

//     public static usuaroToJson(value: Usuaro): string {
//         return JSON.stringify(value);
//     }
// }
