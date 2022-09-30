
export interface Producto {
    id?: number,
    codigo: string,
    nombre: string,
    descripcion: string,
    stock: number,
    costo: number,
    precio: number,
    registro: string,
    provedorid: number,
    categoriaid: number,
    negocioid: number
}

// Converts JSON strings to/from your types
export class ProductoConverto {
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
