

export const redondearNumero = (numero: number): number => (Math.round(numero + Number.EPSILON) * 100) / 100;