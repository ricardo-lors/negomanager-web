

export interface NuevoNegocio {
    nombre: string,
    descripcion: string,
    correo: string,
    telefono: string,
}

export interface Negocio {
    id: string;
    nombre: string;
    descripcion: string;
    correo: string;
    telefono: string;
    caja: number;
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