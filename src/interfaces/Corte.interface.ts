import { Negocio } from "./Negocio.interface";
import { Sucursal } from "./Sucursal.interface";
import { Usuario } from "./Usuario.interface";


interface CorteBasico {
    id?: string;
    fecha?: string;
    total: number;
}

export interface Corte extends CorteBasico {
    vendedor?: Usuario,
    sucursal?: Sucursal;
    negocio?: Negocio;
}

export interface FormCorte extends CorteBasico {
    vendedor?: string,
    sucursal?: string;
    negocio?: string;
}
