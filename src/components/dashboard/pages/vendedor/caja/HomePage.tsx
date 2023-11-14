import { useEffect, useMemo, useState } from 'react';

import { ColumnDef } from "@tanstack/react-table";

import { obtenerMovimientos } from '../../../../../store/slices/movimiento';
import { Tabla } from '../../../../shared/Tabla';
import { Movimiento } from '../../../../../interfaces';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { NavLink, useNavigate } from 'react-router-dom';

export const HomePage = () => {

    const navigate = useNavigate();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

    useEffect(() => {
        obtenerMovimientos({
        }).then(data => setMovimientos(data));
    }, []);

    const columnas = useMemo<ColumnDef<Movimiento>[]>(
        () => [
        //     {
        //     accessorKey: 'cliente',
        //     header: () => <span>Cliente</span>,
        //     cell: info => <span> {info.row.original.venta.cliente ? info.row.original.venta.cliente.nombre : 'Publico General'} </span>,
        //     // footer: props => props.column.id,
        // },
        {
            accessorKey: 'folio',
            cell: info => info.getValue(),
            header: () => <span>Folio</span>,
            // footer: props => props.column.id,
        },
        {
            accessorKey: 'tipo',
            cell: info => info.getValue(),
            header: () => <span>Tipo</span>,
            // footer: props => props.column.id,
        }, {
            accessorKey: 'fecha',
            cell: info => moment(info.row.getValue('fecha')).format('YYYY-MM-DD, h:mm:ss a'),
            header: () => <span>Fecha</span>,
        }, {
            accessorKey: 'descuento',
            header: () => <span>Descuento</span>,
            cell: info => <span>{info.getValue() ? 'Si' : 'No'}</span>,
        }, {
            accessorKey: 'razon_descuento',
            header: () => <span>Razon</span>,
            cell: info => info.getValue(),
        }, {
            accessorKey: 'cantidad',
            header: () => <span>Cantidad</span>,
            cell: info => info.getValue(),
        }, {
            accessorKey: 'venta',
            header: () => <span>Subtotal</span>,
            cell: info => <span>{info.row.original.venta.total}</span>,
        }, {
            accessorKey: 'total',
            cell: info => info.getValue(),
            header: () => <span>Total</span>,
            footer: () => {
                if (movimientos.length > 0) {
                    let suma = 0;
                    movimientos.forEach(mov => {
                        suma += +(mov.total)
                    });
                    return `Total: ${suma}`;
                }
            }
        },
        ], [movimientos]
    );

    return (
        <div>
            {/* <h2 className="text-center">Movimientos</h2> */}
            <div className='row border-bottom'>
                <div className='col-lg-3 col-md-3 col-xs-12 border-end mt-2' >
                    <div className='card h-100 mb-2'>
                        <div className='card-header'>
                            <h2 className='text-center'>${usuario?.attributos?.caja}</h2>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <h3 className='text-center mt-2'>Movimientos</h3>
                    <div style={{ height: '300px', maxHeight: '350px', overflow: 'auto' }}>
                        <Tabla
                            data={movimientos}
                            columns={columnas}
                            verFooter={true}
                            onClickFila={
                                (mov) => {
                                    navigate(`/dashboard/vendedor/caja/venta/${mov.venta.id}`)
                                    // <NavLink to={''} />
                                    //                 <Link
                                    //     to={`/dashboard/${usuario?.roles[0]}/inventario/producto`}
                                    //     className="btn btn-primary me-2"
                                    //     data-bs-toggle="tooltip" data-bs-placement="top"
                                    //     data-bs-custom-class="custom-tooltip"
                                    //     data-bs-title="This top tooltip is themed via CSS variables."
                                    //     replace
                                    // >
                                    //     <i className="bi bi-plus-square" />
                                    // </Link>
                                }
                            }
                        />
                    </div>
                </div>
            </div>
            <div className='row'>
            </div>
        </div>
    )
}
