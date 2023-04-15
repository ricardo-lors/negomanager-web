import { Categoria } from "./Categoria.interface";
import { Negocio } from "./Negocio.interface";
import { Provedor } from "./Provedor.interface";



export interface Producto {
    id?: string,
    codigo: string,
    activo?: boolean,
    attributos?: object,
    actualizado?: string,
    nombre: string,
    descripcion?: string,
    stock: number,
    costo: number,
    precio: number,
    registro?: string,
    provedores: string[],
    categorias: string[],
    negocioid?: number
}

export interface ProductoCorto {
    id: string,
    codigo: string,
    nombre: string,
    descripcion?: string,
    stock: number,
    costo: number,
    precio: number,
    categorias: string[]
}

// Converts JSON strings to/from your types
export class ProductoConvert {
    public static toProducto(json: string): Producto {
        console.log(json);
        return JSON.parse(json);
    }

    public static productoToJson(value: Producto): string {
        return JSON.stringify(value);
    }

    public static toProducToList(json: string): Producto[] {
        return JSON.parse(json);
    }

}
