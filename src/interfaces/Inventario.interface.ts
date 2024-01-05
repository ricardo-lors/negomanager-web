import { Negocio } from "./Negocio.interface";
import { Producto } from "./Producto.interface";
import { Almacen } from "./Almacen.interface";
import { Usuario } from "./Usuario.interface";
import { Venta } from "./Venta.interface";

interface InventarioBase {

    id?: string;

    fecha?: Date;

    // ENTRADA, SALIDA
    tipo: string;

    descripcion: string;

    anterior: number;

    cantidad: number;

    actual: number;

}

export interface Inventario extends InventarioBase {

    producto: Producto;

    venta?: Venta;

    vendedor?: Usuario;

    sucursal?: Almacen;

    negocio?: Negocio;

}

export interface FormInventario extends InventarioBase {

    producto: string;

    vendedor?: string;

    sucursal?: string;

    negocio?: string;
}

export interface QueryParamsInventario {

    fecha?: string;

    // ENTRADA, SALIDA
    tipo?: string;

    producto?: string;

    venta?: string;

    vendedor?: string;

    sucursal?: string;

    negocio?: string;

}