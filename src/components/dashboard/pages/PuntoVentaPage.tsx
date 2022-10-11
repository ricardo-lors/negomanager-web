import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { VentaState, Producto, Venta, DetallesVentaState } from "../../../interfaces";
import { RootState } from "../../../store";
import { obtenerProductoCodigo } from "../../../store/slices/producto/thuncks";
export const PuntoVentaPage = () => {

    const { negocio } = useSelector((state: RootState) => state.negocio);

    const [state, setState] = useState<VentaState>({
        detalles: [],
        total: 0.0
    });

    const { handleSubmit, errors, touched, getFieldProps } = useFormik({
        initialValues: { codigo: '' },
        onSubmit: async (values) => {
            const producto = await obtenerProductoCodigo(values.codigo, negocio.id!);
            addProducto(producto);
        }
    });

    // const { handleSubmit: handleSubmitConfirm, errors: errorsConfirm, touched: touchedConfirm, getFieldProps: getFieldPropsConfirm } = useFormik({
    //     initialValues: { i },
    //     onSubmit: async (values) => {
    //         const producto = await obtenerProductoCodigo(values.codigo, negocio.id!);
    //         addProducto(producto);
    //     }
    // });

    const addProducto = (producto: Producto) => {
        const index = state.detalles.findIndex(prod => prod.producto.id === producto.id);
        if (index >= 0) {
            state.detalles[index].cantidad = state.detalles[index].cantidad + 1;
            state.detalles[index].total = state.detalles[index].producto.precio * state.detalles[index].cantidad;
            const total = sumaTotal(state.detalles);
            setState(prev => ({ detalles: [...state.detalles], total }));
        } else {
            const detalles: DetallesVentaState = {
                cantidad: 1,
                total: producto.precio,
                producto: producto
            };
            const newDetallesList = [...state.detalles, detalles];
            const total = sumaTotal(newDetallesList);
            setState(prev => ({ detalles: newDetallesList, total: total }));
        }
    }

    const sumaTotal = (detalles: DetallesVentaState[]): number => {
        let total: number = 0;
        detalles.map((det) => {
            total = total + det.total;
        });
        return total;
    }

    return (
        <div className="">
            <div className="text-center mt-3">
                <h2>Punto de venta</h2>
            </div>
            <div className="container">
                <form noValidate onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Codigo" {...getFieldProps('codigo')} />
                        <button type="submit" className="btn btn-primary" >Buscar</button>
                    </div>
                </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state.detalles.map(st => <tr key={st.producto.id}>
                                <th>{st.producto.nombre}</th>
                                <th>{st.producto.descripcion}</th>
                                <th>{st.producto.precio}</th>
                                <th>{st.cantidad}</th>
                                <th>{st.total}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
                <h2>Total: {state.total}</h2>
                
            </div>
        </div>
    )
}
