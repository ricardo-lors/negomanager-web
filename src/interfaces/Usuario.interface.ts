
import { Negocio } from "./Negocio.interface";

export interface UsuarioForm {
    correo: string;
    nombre?: string;
    contrasena: string;
    roles?: string[];
}

export interface Usuario {
    id: string;
    correo: string;
    nombre: string;
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
