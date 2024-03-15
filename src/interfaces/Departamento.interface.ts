import { Negocio } from "./Negocio.interface";

export interface Departamento {

    clave: string;

    descripcion: string;

    negocio?: Negocio | string;

}

