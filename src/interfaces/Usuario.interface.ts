
import { Negocio } from "./Negocio.interface";

export interface Usuario {
    id?: string;
    nombre: string;
    correo: string;
    telefono?: string;
    activo?: boolean;
    roles: string[];
    negocio?: Negocio;
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
