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
            {/* En caso que se use Imagen */}
            {/* <img
                src="https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
                alt="Logotipo" /> */}
            <p className="centrado" >Ticket
                <br />Venta de papeleria
                <br />Papeleria Lopez
                <br />14/11/2022
            </p>
            <table className='centrado'>
                <thead>
                    <tr>
                        <th className="cantidad">Prod</th>
                        <th className="producto">Cant</th>
                        <th className="precio">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.venta?.detalles.map(det =>
                            <tr key={det.producto.id}>
                                <td className='cantidad' >{det.cantidad}</td>
                                <td className='producto' >{det.producto.nombre}</td>
                                <td className='precio'>{det.total}</td>
                            </tr>
                        )
                    }
                    <tr>
                        <td></td>
                        <td>Total</td>
                        <td>{props.venta?.total}</td>
                    </tr>
                </tbody>
            </table>
            <p className="centrado">¡GRACIAS POR SU COMPRA!
                <br />richi.rlr97@gmail.com</p>
        </div>
    )
}
);