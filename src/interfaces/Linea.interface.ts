import { Negocio } from "./Negocio.interface";

export interface Linea {

    clave: string;

    descripcion: string;

    negocio?: Negocio | string;

}

