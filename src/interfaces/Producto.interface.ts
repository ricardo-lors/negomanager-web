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
    stock_minimo?: number;
    costo: number,
    precio: number,
    mayoreo?: boolean,
    precio_mayoreo?: number,
    cantidad_mayoreo?: number,
    registro?: string,
    provedores: string[],
    categorias: string[],
    imagenes?: ProductoImagen[]
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

export interface NuevoProducto extends Producto {
    files?: FileList
}

export interface ProductoImagen {
    id: number;
    url: string;
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
