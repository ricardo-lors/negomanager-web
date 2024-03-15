import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { Navigate } from 'react-router-dom';


interface props {
    children: JSX.Element | JSX.Element[]
}

export const CajaAbierta = ({ children }: props) => {

    const { usuario } = useSelector((state: RootState) => state.sesion);

    return (
        <>
            {/* {
                (usuario!.caja?.abierta)
                    ? children
                    : <Navigate to='/dashboard/venta/apertura' replace={true} />
            } */}
        </>
    )
}
