
import { Negocio } from "./Negocio.interface";
import { Sucursal } from "./Sucursal.interface";


interface UsuarioBasico {
    id?: string;
    nombre: string;
    correo: string;
    telefono?: string;
    activo?: boolean;
    roles: string[];
    permisos?: string[];
    attributos?: Attributos;
    creado?: Date;
    actualizado?: Date;
    negocio?: Negocio;
    token?: string;
}

export interface Usuario extends UsuarioBasico {
    sucursal?: Sucursal,
}

export interface Attributos {
    caja: number;
}

export interface FormularioUsuario extends UsuarioBasico {
    contrasena: string;
    contrasenaRepeat?: string;
    sucursal?: string,
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
