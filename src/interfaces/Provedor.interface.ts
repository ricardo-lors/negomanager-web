
export interface Provedor {
    id?: number,
    nombre: string,
    correo?: string,
    telefono?: string,
    negocioid: number
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
