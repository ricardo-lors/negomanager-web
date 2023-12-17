import { useEffect, useMemo, useState } from 'react';

import { ColumnDef } from "@tanstack/react-table";

import { obtenerMovimientos } from '../../../../../store/slices/movimiento';
import { Tabla } from '../../../../shared/Tabla';
import { Movimiento } from '../../../../../interfaces';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState, formatearNumero } from '../../../../../store';
import { NavLink, useNavigate } from 'react-router-dom';
import { MyButtonTooltip } from '../../../../shared';
import { crearCorte } from '../../../../../store/slices/corte';

export const HomePage = () => {

    const navigate = useNavigate();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

    useEffect(() => {
        obtenerMovimientos({
            // cancelado: false
        }).then(data => setMovimientos(data));
    }, []);

    const columnas = useMemo<ColumnDef<Movimiento>[]>(
        () => [
            {
                accessorKey: 'folio',
                cell: info => info.getValue(),
                header: () => <span>Folio</span>,
            },
            {
                accessorKey: 'cancelado',
                cell: info => <>{info.row.original.cancelado ? 'SI' : 'NO'}</>,
                header: () => <span>Cancelada</span>,
            },
            {
                accessorKey: 'tipo',
                cell: info => info.getValue(),
                header: () => <span>Tipo</span>,
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
                cell: info => <span>{formatearNumero(info.row.original.venta?.total)}</span>,
            }, {
                accessorKey: 'total',
                cell: info => <span>{formatearNumero(info.row.original.total)}</span>,
                header: () => <span>Total</span>,
                footer: () => {
                    if (movimientos.length > 0) {
                        let suma = 0;
                        movimientos.forEach(mov => {
                            suma += +(mov.total)
                        });
                        return `Total: ${formatearNumero(suma)}`;
                    }
                }
            },
        ], [movimientos]
    );

    const onCrearCorte = () => crearCorte({
        total: usuario!.attributos!.caja
    });

    return (
        <div>
            <div className='row border-bottom'>
                <div className='col-lg-3 col-md-3 col-xs-12 border-end mt-2' >
                    <div className='card h-100 mb-2'>
                        <div className='card-header'>
                            {/* {usuario?.attributos?.caja} */}
                            <h2 className='text-center'> {usuario?.attributos?.caja ? formatearNumero(usuario.attributos.caja) : '$0.00'} </h2>
                        </div>
                        <div className='card-body'>
                            {/* <MyButtonTooltip
                                id='corte-tooltip'
                                content='Generar corte de caja'
                                place='top'
                                className='w-100'
                                onClick={() => { }}
                                children={<><i className="bi bi-cash-stack"></i></>}
                            /> */}
                            <button className='btn btn-primary w-100' onClick={onCrearCorte} ><i className="bi bi-scissors" /> Generar corte de caja</button>
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
                                (mov: Movimiento) => {
                                    switch (mov.tipo) {
                                        case 'Venta':
                                            navigate(`/dashboard/vendedor/caja/venta`, {
                                                state: { ...mov }
                                            })
                                            break;
                                        case 'Entrada':
                                            navigate(`/dashboard/vendedor/caja/movimiento`, {
                                                state: { ...mov }
                                            })
                                            break;
                                        case 'Salida':
                                            navigate(`/dashboard/vendedor/caja/movimiento`, {
                                                state: { ...mov }
                                            })
                                            break;
                                        default:
                                            console.log(mov)
                                            break;
                                    }
                                    console.log(mov);

                                    // navigate(`/dashboard/vendedor/caja/venta/${mov.venta.id}`)
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
