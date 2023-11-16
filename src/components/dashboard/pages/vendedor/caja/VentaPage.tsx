import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerVentaId } from '../../../../../store/slices/venta';
import { DetallesVenta, Venta } from '../../../../../interfaces';
import { Tabla } from '../../../../shared/Tabla';
import moment from 'moment';
import { ColumnDef } from '@tanstack/react-table';

export const VentaPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [venta, setVenta] = useState<Venta>();

    useEffect(() => {
        id && setTimeout(() => obtenerVentaId(id).then((vn) => setVenta(vn)), 200);
    }, [id]);


    const columnas = useMemo<ColumnDef<DetallesVenta>[]>(
        () => [{
            accessorKey: 'cantidad',
            header: () => <span>Cantidad</span>,
            cell: info => info.getValue(),
        },
        {
            accessorKey: 'producto',
            header: () => <span>Titulo</span>,
            cell: info => info.row.original.producto.titulo,
        }, {
            accessorKey: 'total',

            cell: info => info.getValue(),
            header: () => <span>Total</span>,
            // footer: () => {
            //     const detalles = venta?.detalles;

            //     if (!detalles) return;

            //     if (detalles!.length > 0) {
            //         let suma = 0;
            //         detalles!.forEach(det => {
            //             suma += +(det.total)
            //         });
            //         return `Total: ${suma}`;
            //     }
            // }
        },
        ], [venta]
    );


    return (
        <>
            <div className='d-flex justify-content-between mb-1 mt-1'>
                <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></button>
                <h2 className='text-center m-0'>Detalles de venta</h2>
                <div></div>
            </div>

            {
                venta ?
                    <div className='card p-3' aria-hidden="true">

                        <div className="card-body">
                            <h3>Folio: {venta?.folio}</h3>
                            <h4>Vendedor: {venta?.vendedor.nombre}</h4>
                            <h4>Cliente: {venta?.cliente ? venta?.cliente?.nombre : 'Publico General'}</h4>
                        </div>

                        <div className='d-flex justify-content-between'>
                            <button className='btn btn-primary'>Cancelar Venta</button>
                            <h5 className=''>{moment(venta?.fecha).format('YYYY-MM-DD, h:mm a')}</h5>
                        </div>

                        <div className='mt-0 mb-1 border' style={{ height: '300px', maxHeight: '350px', overflow: 'auto' }} >
                            <Tabla data={venta.detalles} columns={columnas} />
                        </div>

                        <div className='mt-2 text-end'>
                            <h3 >Total: {venta?.total}</h3>
                            <h3>Pago con: {venta?.pago}</h3>
                        </div>
                    </div>
                    : <PlaceholderCard />

            }
        </>

        //     <div className="card" aria-hidden="true">
        //         {/* <img src="..." className="card-img-top" alt="..."> */}
        //         <div className="card-body">
        //             <h5 className="card-title placeholder-glow">
        //                 <span className="placeholder col-6"></span>
        //             </h5>
        //             <p className="card-text placeholder-glow">
        //                 <span className="placeholder col-7"></span>
        //                 <span className="placeholder col-4"></span>
        //                 <span className="placeholder col-4"></span>
        //                 <span className="placeholder col-6"></span>
        //                 <span className="placeholder col-8"></span>
        //             </p>
        //             <a href="#" className="btn btn-primary disabled placeholder col-6"></a>
        //             {/* tabindex="-1" */}
        //         </div>
        //     </div>

        // </div>
    )
}

const PlaceholderCard = () => {
    return (
        <div className='card' aria-hidden="true">

            <div className="card-body">
                <h5 className="placeholder-glow"><span className="placeholder col-2"></span></h5>
                <h5 className="placeholder-glow"><span className="placeholder col-3"></span></h5>
                <h5 className="placeholder-glow"><span className="placeholder col-3"></span></h5>

            </div>

            <h5 className="placeholder-glow text-center"><span className="placeholder col-4"></span></h5>

            <p className='card-text placeholder-glow'>
                <span className="placeholder col-4 m-1"></span>
                <span className="placeholder col-4 m-1"></span>
                <span className="placeholder col-3 m-1"></span>
            </p>

            <p className='card-text placeholder-glow'>
                <span className="placeholder col-4 m-1"></span>
                <span className="placeholder col-4 m-1"></span>
                <span className="placeholder col-3 m-1"></span>
            </p>
            <p className='card-text placeholder-glow'>
                <span className="placeholder col-4 m-1"></span>
                <span className="placeholder col-4 m-1"></span>
                <span className="placeholder col-3 m-1"></span>
            </p>
            <p className='card-text placeholder-glow'>
                <span className="placeholder col-4 m-1"></span>
                <span className="placeholder col-4 m-1"></span>
                <span className="placeholder col-3 m-1"></span>
            </p>
            <p className='card-text placeholder-glow'>
                <span className="placeholder col-4 m-1"></span>
                <span className="placeholder col-4 m-1"></span>
                <span className="placeholder col-3 m-1"></span>
            </p>

        </div>
    );
}
