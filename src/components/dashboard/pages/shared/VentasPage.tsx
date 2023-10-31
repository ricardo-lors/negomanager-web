import { useEffect, useMemo, useState } from 'react';

import { ColumnDef } from "@tanstack/react-table";

import { obtenerMovimientos } from '../../../../store/slices/movimiento';
import { Tabla } from '../../../shared/Tabla';
import { Movimiento } from '../../../../interfaces';
import moment from 'moment';


export const VentasPage = () => {

    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

    useEffect(() => {
        obtenerMovimientos({
        }).then(data => setMovimientos(data));
    }, []);

    const columnas = useMemo<ColumnDef<Movimiento>[]>(
        () => [
            {
                id: 'tipo',
                accessorKey: 'tipo',
                cell: info => info.getValue(),
                header: () => <span>Tipo</span>,
                // footer: props => props.column.id,
            }, {
                id: 'fecha',
                accessorKey: 'fecha',
                cell: info => moment(info.row.getValue('fecha')).format('MMMM Do YYYY, h:mm:ss a'),
                header: () => <span>Fecha</span>,
            }, {
                id: 'total',
                accessorKey: 'total',
                cell: info => info.getValue(),
                header: () => <span>Total</span>,
            },
        ], [movimientos]
    );

    return (
        <>
            <Tabla data={movimientos} columns={columnas} />
        </>
    )
}
