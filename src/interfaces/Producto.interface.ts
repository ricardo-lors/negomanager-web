import { Categoria } from "./Categoria.interface";
import { Negocio } from "./Negocio.interface";
import { Provedor } from "./Provedor.interface";

// id:               string;
// codigo:           string;
// descripcion:      string;
// costo:            number;
// ganancia:         number;
// precio:           number;
// mayoreo:          boolean;
// precio_mayoreo:   number;
// cantidad_mayoreo: number;
// inventario:       boolean;
// stock:            number;
// stock_minimo:     number;
// stock_maximo:     number;
// activo:           boolean;
// provedores:       any[];
// categorias:       string[];
// attributos:       Attributos;
// creado:           Date;
// actualizado:      Date;
// imagenes:         Imagene[];
// negocio:          Negocio;

interface ProductoBasico {
    id?: string,
    codigo: string,
    titulo: string;
    descripcion: string,
    costo: number,
    ganancia: number,
    precio: number,
    mayoreo: boolean,
    precio_mayoreo?: number,
    cantidad_mayoreo?: number,
    inventario: boolean;
    stock?: number,
    stock_minimo?: number;
    stock_maximo?: number;
    activo: boolean,
    categorias: string[],
    attributos?: object,
    creado?: string; //Date
    actualizado?: string,
    sucursal?: string;
}

export interface Producto extends ProductoBasico {
    provedor: Provedor,
    imagenes?: ProductoImagen[],
    negocioid?: number
}

export interface FormularioProducto extends ProductoBasico {
    provedor: string,
    imagenes?: string[],
    files?: FileList
}

export interface NuevoActualizarProducto extends ProductoBasico {
    provedor: string,
    imagenes?: string[]
}

export interface ProductoImagen {
    id: number;
    url: string;
}

export interface ProductoVenta {
    id: string,
    codigo?: string,
    titulo: string,
    precio: number,
    inventario: boolean;
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

    sucursal?: string;

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
