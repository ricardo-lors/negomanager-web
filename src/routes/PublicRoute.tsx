import { useSelector } from "react-redux";
import { RootState } from "../store";

import { Navigate } from "react-router-dom";

interface props {
    children: JSX.Element | JSX.Element[]
}

export const PublicRoute = ({ children }: props) => {

    const { logueado } = useSelector((state: RootState) => state.usuario);
    return (
        <>
            {
                (logueado)
                    ? <Navigate to='/dashboard' replace={true} />
                    : children
            }
        </>
    )
}
