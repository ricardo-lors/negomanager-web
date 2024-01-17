
import { Negocio } from "./Negocio.interface";
import { Almacen } from "./Almacen.interface";

interface UsuarioBasico {
    id?: string;
    nombre: string;
    correo: string;
    rol: string;
    telefono?: string;
    activo?: boolean;
    permisos?: string[];
    attributos?: Attributos;
    creado?: Date;
    actualizado?: Date;
    negocio?: Negocio;
    token?: string;
    puesto?: string;
}

export interface Usuario extends UsuarioBasico {
    almacen?: Almacen,
    caja?: Caja;
}

export interface Attributos {
    caja: number;
}

export interface Caja {
    id: string;
    nombre: string;
    activa: boolean;
    abierta: boolean;
    captura_cliente: boolean;
    aplicar_descuentos: boolean;
    restringir_venta: boolean;
    dinero: number;
    apertura: Apertura;
    almacen: Almacen;
}

export interface Apertura {
    id: number;
    fecha_inicio: string;
    fecha_final?: string;
    dinero_inicial: number;
    dinero_final?: number;
}


export interface UsuarioNuevo extends UsuarioBasico {
    contrasena: string;
    contrasenaRepeat?: string;
    almacen?: string,
    caja?: string;
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
    rol?: string;
    negocio?: Negocio
}

// To parse this data:
//
//   import { Convert, Usuario } from "./file";
//
//   const usuario = Convert.toUsuario(json);

// export interface Usuario {
//     id:          string;
//     nombre:      string;
//     correo:      string;
//     puesto:      null;
//     telefono:    null;
//     activo:      boolean;
//     roles:       string[];
//     permisos:    any[];
//     attributos:  Attributos;
//     creado:      Date;
//     actualizado: Date;
//     negocio:     Negocio;
//     almacen:     null;
//     token:       string;
// }

// export interface Attributos {
// }

// export interface Negocio {
//     id:            string;
//     nombre:        string;
//     descripcion:   string;
//     rfc:           null;
//     giro:          null;
//     direccion:     string;
//     colonia:       null;
//     ciudad:        string;
//     codigo_postal: string;
//     pais:          string;
//     estado:        string;
//     latitud:       null;
//     longitud:      null;
//     correo:        string;
//     telefono:      string;
//     pagina:        null;
//     caja:          number;
//     folio:         number;
// }

// // Converts JSON strings to/from your types
// export class Convert {
//     public static toUsuario(json: string): Usuario {
//         return JSON.parse(json);
//     }

//     public static usuarioToJson(value: Usuario): string {
//         return JSON.stringify(value);
//     }
// }

