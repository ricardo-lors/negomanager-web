
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../../../store'

interface props {
    children: JSX.Element | JSX.Element[]
}

export const VerificarCaja = ({ children }: props) => {

    const { usuario } = useSelector((state: RootState) => state.sesion);
    console.log(usuario)
    return (
        <>
            {
                (usuario!.caja)
                    ? children
                    : <Navigate to='/dashboard/venta/apertura' replace={true} />
            }
        </>

    )
}
