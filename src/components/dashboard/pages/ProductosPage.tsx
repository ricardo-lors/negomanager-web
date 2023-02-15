import { useFormik } from "formik";
import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from 'yup';
import { useAppDispatch } from "../../../hooks";
import { Producto } from "../../../interfaces";
import { RootState } from "../../../store";
import { crearProducto, obtenerProductosNegocio } from "../../../store/slices/producto/thuncks";
import { MySelect } from "../../shared/MySelect";
import { MyTextInput } from "../../shared/MyTextInput";

export const ProductosPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { provedores } = useSelector((state: RootState) => state.provedor);
    const { categorias } = useSelector((state: RootState) => state.categoria);
    const { productos } = useSelector((state: RootState) => state.producto);

    useEffect(() => {
        usuario && dispatch(obtenerProductosNegocio(usuario?.negocio?.id!))
    }, [dispatch]);

    return (
        <div className="row">
            <div className="col-3 border-end vh-100">
                <div className="text-center">
                    <h2>Productos</h2>
                </div>

            </div >
            <div className="col-9">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Almacen</th>
                            <th scope="col">precio</th>
                            {/* <th scope="col">Total</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map(st => <tr key={st.id}>
                                <th>{st.nombre}</th>
                                <th>{st.descripcion}</th>
                                <th>{st.stock}</th>
                                <th>{st.precio}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
