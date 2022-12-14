
// export interface usuario {
//     id?: number,
//     nombre: string,
//     correo: string,
//     rolid: number,
//     negocioid?: number
// }
// To parse this data:
//
//   import { Convert, Usuario } from "./file";
//
//   const usuario = Convert.toUsuario(json);

export interface UsuarioForm {
    id?: number;
    nombre: string;
    correo: string;
    telefono?: string,
    rolid: number;
    contrasena: '';
    contrasenaRepeat: '';
    negocioid?: number;
}

export interface Usuario {
    id?: number;
    nombre: string;
    correo: string;
    telefono?: string,
    rolid: number;
    negocioid?: number;
}

// Converts JSON strings to/from your types
export class UsuarioConvert {
    public static toUsuario(json: string): Usuario {
        return JSON.parse(json);
    }

    public static usuarioToJson(value: Usuario): string {
        return JSON.stringify(value);
    }

    public static toUsuarioList(json: string): Usuario[] {
        return JSON.parse(json);
    }
}
