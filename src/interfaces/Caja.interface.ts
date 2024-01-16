
export interface CajaBasica {
    id?: string;
    nombre: string;
    activa: boolean;
    abierta?: boolean;
    captura_cliente: boolean;
    aplicar_descuentos: boolean;
    restringir_venta: boolean;
    dinero?: number;
}

export interface Caja extends CajaBasica {

}

export interface CajaNueva extends CajaBasica {
    apertura?: string;
    almacen?: string;
    negocio?: string;
}

export interface QueryParamsCaja {
    // apertura?: string;
    almacen?: string;
    negocio?: string;
}



