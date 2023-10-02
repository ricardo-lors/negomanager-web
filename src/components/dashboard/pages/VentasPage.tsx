import { useDispatch, useSelector } from "react-redux";

import { useEffect } from 'react';
import { obtenerVentaNegocio } from "../../../store/slices/venta";
import { RootState } from "../../../store";
import { useAppDispatch } from "../../../hooks";

export const VentasPage = () => {

    const dispatch = useAppDispatch();


    const { negocio } = useSelector((state: RootState) => state.negocio);
    // const { ventas } = useSelector((state: RootState) => state.venta);

    useEffect(() => {
        dispatch(obtenerVentaNegocio(negocio!.id));
    }, [negocio!.id]);

    return (
        <div className="col-9">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Vendedor</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Pago</th>
                        <th scope="col">Total Venta</th>
                        {/* <th scope="col">Total</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        // ventas.map(vt => <tr key={vt.id}>
                        //     <th>{vt.vendedor.nombre}</th>
                        //     <th>{vt.comprador.nombre}</th>
                        //     <th>{vt.fecha.toString()}</th>
                        //     <th>{vt.pago}</th>
                        //     <th>{vt.total}</th>
                        // </tr>)
                    }
                </tbody>
            </table>
        </div>

    )
}
