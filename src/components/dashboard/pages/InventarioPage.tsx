import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks";
import { RootState } from "../../../store";
import { obtenerProductosNegocio } from "../../../store/slices/producto/thuncks";

export const InventarioPage = () => {

    const dispatch = useAppDispatch();

    const { negocio } = useSelector((state: RootState) => state.negocio);
    const { productos } = useSelector((state: RootState) => state.producto);
    const { categorias } = useSelector((state: RootState) => state.categoria);

    useEffect(() => {
        negocio.id && dispatch(obtenerProductosNegocio(negocio.id))
    }, [dispatch, negocio.id]);

    return (
        <div>

            <div className="album py-5">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {
                            productos.map(prod =>
                                <div key={prod.id} className="col">
                                    <div className="card shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">{prod.nombre} <span style={{ color: categorias.find(cat => cat.id === prod.categoriaid)?.color }}>{categorias.find(cat => cat.id === prod.categoriaid)?.nombre}</span></h5>
                                            <p className="card-text" >{prod.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {/* <div className="col">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <p className="card-text" >Nombre</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <p className="card-text" >Nombre</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <p className="card-text" >Nombre</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <p className="card-text" >Nombre</p>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>
            </div>
        </div>
    )
}
