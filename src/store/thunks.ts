

export const formatearNumero = (numero?: number): string => {
    return numero ? Intl.NumberFormat('ES-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(numero).toString()
    : ''
};