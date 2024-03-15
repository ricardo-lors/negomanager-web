import { Negocio } from "./Negocio.interface";

export type Cliente = {

    id?: string;
    activo: boolean;
    clave?: string;
    nombre: string;
    correo: string;
    rfc?: string;
    regimen_fiscal?: string;
    curp?: string;
    calle?: string;
    numero_exterior?: number;
    numero_interior?: number;
    referencia?: string;
    pais?: string;
    nacionalidad?: string;
    codigo_postal_fiscal?: string;
    codigo_postal?: string;
    estado?: string;
    municipio?: string;
    poblacion?: string;
    colonia?: string;
    clasificacion?: string; 
    descuento: number;
    telefono?: string;
    credito: boolean;
    dias_credito?: string;
    limite_credito?: number;
    saldo_actual?: number;
    credito_disponible?: number;
    // ultimo_pago: Movimiento;
    cfdi?: string;
    imagen?: string;
    negocio?: Negocio;
}

export interface QueryParamsCliente {
    id?: string;
    clave?: string;
    nombre?: string;
    correo?: string;
    negocio?: string;
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