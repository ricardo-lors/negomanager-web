import { useSelector } from "react-redux"
import { RootState } from "../store";

import { Navigate } from "react-router-dom";

interface props {
    children: JSX.Element | JSX.Element[]
}

export const PrivateRoute = ({ children }: props) => {

    const { logueado } = useSelector((state: RootState) => state.usuario);
    return (
        <>
            {
                (logueado)
                    ? children
                    : <Navigate to='/login' replace={true} />
            }
        </>
    )
}
