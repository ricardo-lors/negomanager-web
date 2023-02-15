import { Negocio } from "./Negocio.interface";

export interface Cliente {
    id?: number,
    nombre: string,
    correo?: string,
    telefono?: string,
    negocio: Negocio
}

// Converts JSON strings to/from your types
export class ClienteConvert {
    public static toCliente(json: string): Cliente {
        return JSON.parse(json);
    }

    public static clienteToJson(value: Cliente): string {
        return JSON.stringify(value);
    }

    public static toClienteList(json: string): Cliente[] {
        return JSON.parse(json);
    }
}