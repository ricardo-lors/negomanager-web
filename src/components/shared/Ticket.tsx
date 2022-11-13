import { forwardRef, LegacyRef } from 'react';
import { VentaState } from '../../interfaces';

interface TicketProps {
    venta: VentaState | undefined
}

export const Ticket = forwardRef((props: TicketProps, ref: LegacyRef<HTMLDivElement> | undefined) => {
    return (
        <div
            ref={ref}
            className="ticket"
        >
            <p className="" >Ticket
                <br />Venta de papeleria
                <br />Papeleria Lopez
                <br />fecha
            </p>
            <table>
                <thead>
                    <tr>
                        <th className="">Prod</th>
                        <th className="">Cant</th>
                        <th className="">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.venta?.detalles.map(det =>
                            <tr key={det.producto.id}>
                                <td>{det.producto.nombre}</td>
                                <td>{det.cantidad}</td>
                                <td>{det.total}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <p className="centrado">¡GRACIAS POR SU COMPRA!
                <br />richi.rlr97@gmail.com</p>
        </div>
    )
}
);