import { Categoria } from "./Categoria.interface";
import { Negocio } from "./Negocio.interface";
import { Provedor } from "./Provedor.interface";


export interface NuevoProducto {
    codigo: string,
    nombre: string,
    descripcion?: string,
    stock?: number,
    costo?: number,
    precio?: number,
    activo?: boolean,
    provedores?: string[],
    categorias: string[],
    attributos?: Object
}

export interface Producto {
    id?: number,
    codigo: string,
    nombre: string,
    descripcion: string,
    stock: number,
    costo: number,
    precio: number,
    registro: string,
    provedor?: Provedor,
    categoria?: Categoria,
    negocioid: number
}

// Converts JSON strings to/from your types
export class ProductoConvert {
    public static toProducto(json: string): Producto {
        return JSON.parse(json);
    }

    public static productoToJson(value: Producto): string {
        return JSON.stringify(value);
    }

    public static toProducToList(json: string): Producto[] {
        return JSON.parse(json);
    }

}
