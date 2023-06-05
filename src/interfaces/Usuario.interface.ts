
import { Negocio } from "./Negocio.interface";

export interface UsuarioForm {
    nombre?: string;
    correo: string;
    contrasena: string;
    contrasenaRepeat?: string;
    negocio?: Negocio;
    roles?: string[];
}

export interface Usuario {
    id: string;
    nombre: string;
    correo: string;
    telefono?: string;
    activo: boolean;
    roles: string[];
    negocio?: Negocio;
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
