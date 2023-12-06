import React from 'react';
import { Movimiento } from '../../../../../interfaces';
import { useLocation, useNavigate } from 'react-router-dom';

import moment from 'moment';

export const MovimientoPage = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const state = location.state as Movimiento;

    console.log(location.state);


    return (
        <>
            <div className='d-flex justify-content-between mb-1 mt-1'>
                <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></button>
                <h2 className='text-center m-0'>Detalles del Movimiento</h2>
                <div></div>
            </div>
            <div className='card p-3' aria-hidden="true">

                <div className="card-body">
                    <h3>Folio: {state.folio}</h3>
                    <h4>Tipo: {state.tipo}</h4>
                    <h5 className=''>Fecha: {moment(state?.fecha).format('YYYY-MM-DD, h:mm a')}</h5>
                    {/* <h4>Cliente: {state.cliente ? venta?.cliente?.nombre : 'Publico General'}</h4> */}
                </div>

                <div className=''>
                    <h3 >Total: {state.total}</h3>
                </div>

                <div className='text-end'>
                    <button className='btn btn-primary'>Cancelar Venta</button>
                </div>

            </div>


        </>
    )
}
