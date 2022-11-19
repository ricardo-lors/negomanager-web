import { useFormik } from "formik";
import { useState, useRef, ReactInstance } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks";
import { VentaState, Producto, DetallesVentaState, NuevaVenta } from "../../../interfaces";
import { RootState } from "../../../store";
import { obtenerProductoCodigo } from "../../../store/slices/producto/thuncks";
import { crearVenta, obtenerVentaNegocio } from "../../../store/slices/venta";
import { MySelect } from "../../shared/MySelect";
import * as Yup from 'yup';
import { useReactToPrint } from "react-to-print";
import { Ticket } from "../../shared/Ticket";
import { Modal } from "../../shared/Modal";
import { number } from "yup/lib/locale";
import Swal from "sweetalert2";

export const PuntoVentaPage = () => {

    const dispatch = useAppDispatch();

    const ticket = useRef<HTMLDivElement>(null);

    const { negocio } = useSelector((state: RootState) => state.negocio);
    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { clientes } = useSelector((state: RootState) => state.cliente);

    const handleImprimirTicket = useReactToPrint({
        content: () => ticket.current!
    });

    const [state, setState] = useState<VentaState>({
        detalles: [],
        total: 0.0
    });

    const { handleSubmit: handleSubmitSearch, errors: errorsSearch, touched: touchedSearch, getFieldProps: getFieldPropsSearch, resetForm: resetFormSearch } = useFormik({
        initialValues: { codigo: '' },
        onSubmit: async (values) => {
            const producto = await obtenerProductoCodigo(values.codigo, negocio.id!);
            addProducto(producto);
            resetFormSearch();
        },
        validationSchema: Yup.object({
            codigo: Yup.string().required('Requerido')
        })
    });

    const { handleSubmit: handleSubmitConfirm, errors: errorsConfirm, touched: touchedConfirm, getFieldProps: getFieldPropsConfirm, resetForm: resetFormConfirm } = useFormik({
        initialValues: { pago: 0, clienteid: 0 },
        onSubmit: async (values) => {

            if(state.total > values.pago) return Swal.fire( 'Pago Insuficiente','El Pago no cubre el total de la venta','warning' );

            const nuevaVenta: NuevaVenta = {
                total: state.total,
                pago: values.pago,
                usuarioid: usuario.id!,
                clienteid: values.clienteid!,
                negocioid: negocio.id!,
                detalles: state.detalles
            }
            await crearVenta(nuevaVenta);
            handleImprimirTicket();
            setState({ detalles: [], total: 0.0 });
        },
        validationSchema: Yup.object({
            pago: Yup.string().required('EL dato es requerido'),
            clienteid: Yup.string()
                .notOneOf(['0'], 'Esta opcion no esta permitida')
                .required('Requerido'),
        })
    });

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
            console.log(total);
            setState({ detalles: newDetallesList, total });
        }
    }

    const sumaTotal = (detalles: DetallesVentaState[]): number => {
        let total: number = 0;
        detalles.map((det) => {
            total = total + Number(det.total);
        });
        return total;
    }

    return (
        <div className="container vh-100">
            {/* <div className="text-center mt-3">
                <h2>Punto de venta</h2>
            </div> */}
            <form className="pt-3" noValidate onSubmit={handleSubmitSearch}>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Codigo" {...getFieldPropsSearch('codigo')} />
                    <button type="submit" className="btn btn-primary" >Buscar</button>
                </div>
                {touchedSearch.codigo && errorsSearch.codigo && <span className="text-danger">{errorsSearch.codigo}</span>}
            </form>

            <div className="container border h-50 overflow-auto mt-3">
                <table className="table">
                    {/* style={{height: 300}} */}
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
            </div>
            <div className="row mt-2">
                <div className="col">
                    <h2>Total: {state.total}</h2>
                    <form noValidate onSubmit={handleSubmitConfirm}>
                        <MySelect
                            label="Cliente"
                            className="form-control"
                            {...getFieldPropsConfirm('clienteid')}
                            errors={touchedConfirm.clienteid && errorsConfirm.clienteid ? errorsConfirm.clienteid : undefined}
                        >
                            <option value={0}>Seleccione una opcion</option>
                            {
                                clientes?.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                                ))
                            }
                        </MySelect>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Pago" {...getFieldPropsConfirm('pago')} />
                            <button type="submit" className="btn btn-primary" >Generar Compra</button>
                        </div>
                        {touchedConfirm.pago && errorsConfirm.pago && <span className="text-danger">{errorsConfirm.pago}</span>}
                    </form>
                </div>
            </div>
            <Ticket ref={ticket} venta={state} />
        </div>
    )
}
