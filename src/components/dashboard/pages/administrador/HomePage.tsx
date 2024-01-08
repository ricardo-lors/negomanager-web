import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Movimiento } from "../../../../interfaces";

import moment from 'moment';
import { RootState, formatearNumero } from "../../../../store";
import { obtenerMovimientos } from "../../../../store/slices/movimiento";
import { useSelector } from "react-redux";
import { Tabla } from "../../../shared/Tabla";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {

  const navigate = useNavigate();

  const { usuario } = useSelector((state: RootState) => state.sesion);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  useEffect(() => {
    obtenerMovimientos({
      // cancelado: false
      sucursal: "594b31ee-ddd8-45ae-b7f3-ba2845dd5210"
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
        accessorKey: 'sucursal',
        cell: info => <>{info.row.original.sucursal?.nombre}</>,
        header: () => <span>Sucursal</span>,
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
              if (!mov.cancelado) {
                suma += +(mov.total)
              }
            });
            return `Total: ${formatearNumero(suma)}`;
          }
        }
      },
    ], [movimientos]
  );


  return (
    <>


      <div style={{ height: '300px', maxHeight: '350px', overflow: 'auto' }}>
        <Tabla
          data={movimientos}
          columns={columnas}
          verFooter={true}
          onClickFila={
            (mov: Movimiento) => {

              console.log(mov)
              // switch (mov.tipo) {
              //   case 'Venta':
              //     navigate(`/dashboard/vendedor/caja/venta`, {
              //       state: { ...mov }
              //     })
              //     break;
              //   case 'Entrada':
              //     navigate(`/dashboard/vendedor/caja/movimiento`, {
              //       state: { ...mov }
              //     })
              //     break;
              //   case 'Salida':
              //     navigate(`/dashboard/vendedor/caja/movimiento`, {
              //       state: { ...mov }
              //     })
              //     break;
              //   default:
              //     console.log(mov)
              //     break;
              // }
            }
          }
        />
      </div>
    </>

  )
}
