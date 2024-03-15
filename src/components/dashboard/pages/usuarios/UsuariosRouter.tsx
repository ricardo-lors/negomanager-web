import { Route, Routes } from "react-router-dom"
import { UsuariosPage } from "./UsuariosPage"
import { UsuarioPage } from "./UsuarioPage"

export const UsuariosRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<UsuariosPage />} />
            <Route path='/usuario' element={<UsuarioPage />} />
            <Route path='/usuario/:id' element={<UsuarioPage />} />
        </Routes>
    )
}
