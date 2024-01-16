import { Almacen } from "./Almacen.interface";
import { Categoria } from "./Categoria.interface";
import { Negocio } from "./Negocio.interface";
import { Provedor } from "./Provedor.interface";


// id: string;
// // Tipo
// // p: Producto
// // s: Servicio
// // k: kit
// tipo: string;
// codigo: string;
// titulo: string;
// descripcion?: string;
// costo: number;
// precio_cambiable?: boolean;
// precio: number;
// mayoreo: boolean;
// precio_mayoreo?: number;
// cantidad_mayoreo?: number;
// control: boolean;
// stock?: number;
// stock_minimo?: number;
// stock_maximo?: number;
// activo: boolean;
// clave_sat: string;
// medida_sat: string;
// provedor: Provedor;
// linea: string;
// departamento: string;
// categoria: string;
// attributos: Object;
// creado: Date;
// actualizado: Date;
// imagenes?: InventarioImagenes[];
// almacen: Almacen;
// negocio: Negocio;

interface ProductoBasico {
    id?: string,
    tipo: string;
    codigo: string,
    titulo: string;
    descripcion?: string,
    costo: number,
    precio: number,
    precio_cambiable?: boolean;
    mayoreo: boolean,
    precio_mayoreo?: number,
    cantidad_mayoreo?: number,
    control: boolean;
    stock?: number,
    stock_minimo?: number;
    stock_maximo?: number;
    activo: boolean,
    clave_sat?: string;
    medida_sat?: string;
    attributos?: object;
    creado?: string; //Date
    actualizado?: string;
    sucursal?: string;
}

export interface Producto extends ProductoBasico {
    provedor: Provedor,
    imagenes?: ProductoImagen[],
    linea?: string;
    departamento?: string;
    categoria?: string;
    almacen: Almacen,
    negocioid?: number
}

export interface FormularioProducto extends ProductoBasico {
    provedor?: string,
    linea?: string;
    departamento?: string;
    categoria?: string;
    imagenes?: string[],
    files?: FileList
}

export interface NuevoActualizarProducto extends ProductoBasico {
    provedor?: string,
    linea?: string;
    departamento?: string;
    categoria?: string;
    almacen?: string;
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

    titulo?: string;

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

    almacen?: string;

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
