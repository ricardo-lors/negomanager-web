

export interface NuevoNegocio {
    nombreNegocio: string,
    descripcionNegocio: string,
    correoNegocio: string,
    telefonoNegocio: string,
    nombre: string;
    correo: string;
    contrasena: string;
    rolid: number;
}

export interface Negocio {
    id?: number,
    nombre: string,
    descripcion?: string,
    correo?: string,
    telefono?: string,
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