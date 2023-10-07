import { Categoria } from "./Categoria.interface";
import { Negocio } from "./Negocio.interface";
import { Provedor } from "./Provedor.interface";


export interface ProductoVenta {
    id: string,
    codigo?: string,
    descripcion: string,
    precio: number,
}

interface ProductoBasico {
    id?: string,
    codigo: string,
    activo?: boolean,
    attributos?: object,
    actualizado?: string,
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
}

export interface Producto extends ProductoBasico {
    imagenes?: ProductoImagen[],
    negocioid?: number
}

export interface FormularioProducto extends ProductoBasico {
    imagenes?: string[],
    files?: FileList
}

export interface NuevoActualizarProducto extends ProductoBasico {
    imagenes?: string[]
}

export interface ProductoImagen {
    id: number;
    url: string;
}

export interface QueryParamsProducto {

    codigo?: string;

    nombre?: string;

    descripcion?: string;

    // @IsNumber()
    // @IsPositive()
    // @IsOptional()
    // stock?: number;

    // @IsNumber()
    // @IsPositive()
    // @IsOptional()
    // costo?: number;

    // @IsNumber()
    // @IsPositive()
    // @IsOptional()
    // precio?: number;

    // @IsBoolean()
    // @IsOptional()
    // mayoreo?: boolean;

    activo?: boolean;

    categorias?: string[];

    negocio?: string;

    take?: number;
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
