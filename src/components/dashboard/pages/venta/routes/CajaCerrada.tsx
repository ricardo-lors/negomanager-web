import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { Navigate } from 'react-router-dom';


interface props {
    children: JSX.Element | JSX.Element[]
}

export const CajaCerrada = ({ children }: props) => {

    const { usuario } = useSelector((state: RootState) => state.sesion);

    return (
        <>
            {/* {
                (usuario!.caja?.abierta)
                    ? <Navigate to='/dashboard/venta' replace={true} />
                    : children
            } */}
        </>
    )
}
