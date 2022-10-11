
export interface Categoria {
    id?: number,
    nombre: string,
    color: string,
    negocioid: number
}

// Converts JSON strings to/from your types
export class CategoriaConvert {
    public static toCategoria(json: string): Categoria {
        return JSON.parse(json);
    }

    public static categoriaToJson(value: Categoria): string {
        return JSON.stringify(value);
    }

    public static toCategoriaList(json: string): Categoria[] {
        return JSON.parse(json);
    }
}