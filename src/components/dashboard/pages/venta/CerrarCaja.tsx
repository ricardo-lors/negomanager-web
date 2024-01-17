import React from 'react'
import { useSelector } from 'react-redux';
import { RootState, formatearNumero } from '../../../../store';
import moment from 'moment';
import { crearCorte } from '../../../../store/slices/corte';
import { useAppDispatch } from '../../../../hooks';
import { revalidarSesion } from '../../../../store/slices/session';

export const CerrarCaja = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.sesion);
    const { detalles, total, cliente } = useSelector((state: RootState) => state.venta);

    const handleCerrarCaja = async () => {

        await crearCorte({
            total: usuario!.caja!.dinero
        });

        dispatch(revalidarSesion());

    }

    return (
        <div className='row'>
            <p>Fecha y Hora de Apertura: {moment(usuario!.caja!.apertura.fecha_inicio).format('YYYY-MM-DD, h:mm a')} a las {moment().format('YYYY-MM-DD, h:mm a')} </p>
            <h1>Ventas Totales: {formatearNumero(usuario!.caja!.dinero)}</h1>
            <h2>Ganancia</h2>
            <button onClick={handleCerrarCaja} >Confirmar</button>
        </div>
    )
}
