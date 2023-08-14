import { useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import { useAppDispatch } from "../../../../hooks";
import { obtenerNegocios } from "../../../../store/slices/negocio/negocioThuncks";
import { HomePage } from "./HomePage"

export const SuperAdministrador = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(obtenerNegocios());
    }, []);

    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
        </Routes>
    )
}
