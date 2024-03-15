import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks';
import { obtenerClientes } from '../../../../store/slices/cliente';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Image } from 'react-bootstrap';

export const ClientesPage = () => {


    const { clientes } = useSelector((state: RootState) => state.cliente);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(obtenerClientes())

        // return () => {
        //     second
        // }
    }, [])


    return (

        <div className=''>

            <div >
                {/* <button type="button" className="btn btn-primary">Primary</button> */}
                <Link to='/dashboard/clientes/cliente' className="btn btn-primary" >Agregar</Link>
            </div>
            <div className='row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5'>
                {
                    clientes && clientes.map(cli => <div key={cli.id} className='col'>
                        {/* text-bg-dark */}
                        <div className='card card-cover h-100 overflow-hidden rounded-4 shadow-lg bg-body-secondary'>
                            <div className='row'>
                                {/* d-lg-block d-done */}
                                <div className='col-auto d-flex align-items-center'>
                                    <Image src="https://qph.cf2.quoracdn.net/main-qimg-5cfef399fca66068c394856226ab1a4a" roundedCircle height={80} width={80} className='ms-2' />
                                </div>
                                <div className='col'>
                                    <p className='fw-bold mb-1'>Clave: {cli.clave}</p>
                                    <p className='m-0'>Nombre: {cli.nombre}</p>
                                    <p className='m-0'>Correo: {cli.correo}</p>
                                    <p className='m-0'>Telefono: {cli.telefono}</p>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <p>{`${cli.calle ? cli.calle : ''} ${cli.numero_exterior ? cli.numero_exterior : ''} ${cli.estado ? cli.estado : ''}`}</p>
                            </div>
                            {/* <div className='d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1'>
                            <h3>Algo .com</h3>
                        </div> */}
                        </div>
                    </div>)
                }

                <div className='col'>
                    {/* text-bg-dark */}
                    <div className='card card-cover h-100 overflow-hidden rounded-4 shadow-lg bg-body-secondary'>
                        <div className='row'>
                            <div className='col-auto d-done d-lg-block'>
                                {/* <div className='bd-placeholder-img m-3' style={{ height: 50, width: 50 }}>
                                    <i className="bi bi-airplane-fill"></i>
                                </div> */}
                                <img src="https://qph.cf2.quoracdn.net/main-qimg-5cfef399fca66068c394856226ab1a4a" className="img-fluid rounded  m-1" alt="" height={70} width={70} />
                                {/* <svg className="bd-placeholder-img" width={200} height={200} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" > */}
                                {/* </svg> */}
                            </div>
                            <div className='col'>
                                Hola
                            </div>
                        </div>
                        <div>Algo Aca</div>
                        {/* <div className='d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1'>
                            <h3>Algo .com</h3>
                        </div> */}
                    </div>
                </div>
                {/* <div className='col'>
                    <div className='card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg'>
                        <div className='d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1'>
                            <h3>Algo .com</h3>
                        </div>
                    </div>
                </div> */}
                {/* <div className='col'>
                    <div className='card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg'>
                        <div className='d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1'>
                            <h3>Algo .com</h3>
                        </div>
                    </div>
                </div> */}

            </div>

        </div >

    )
}
