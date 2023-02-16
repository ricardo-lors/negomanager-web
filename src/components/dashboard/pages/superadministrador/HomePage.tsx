import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export const HomePage = () => {

    const { negocios } = useSelector((state: RootState) => state.negocio);

    return (
        <div>
            <div className="col-12 mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            negocios.map(st => <tr key={st.id}>
                                <th>{st.nombre}</th>
                                <th>{st.descripcion}</th>
                                <th>{st.correo}</th>
                                <th>{st.telefono}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
