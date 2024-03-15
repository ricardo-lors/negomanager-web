
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Almacen, Caja, Usuario } from "../../../../interfaces";
import { buscarUsuarios } from "../../../../store/slices/usuario";
import { Tabla } from "../../../shared/Tabla";
import { RootState } from "../../../../store";
import { ColumnDef } from "@tanstack/react-table";
import { useAppDispatch } from "../../../../hooks";

import { obtenerCajas } from "../../../../store/slices/caja";
import { TituloPagina } from "../shared/TituloPagina";
import { Link } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";

export const UsuariosPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.sesion);

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        buscarUsuarios({
            // rol: 'vendedor'
            // rol: ''
        }).then(listaUsuarios => {
            setUsuarios(listaUsuarios);
        });
    }, [dispatch, usuario]);

    return (
        <div>
            <TituloPagina centro="USUARIOS" />

            <Container className="bg-body-secondary p-3" fluid>
                <Link to='/dashboard/usuarios/usuario' ><h1><i className="bi bi-file-earmark-plus"></i></h1></Link>
            </Container>
            <div className='row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-3'>
                {
                    usuarios && usuarios.map(us => <div key={us.id} className='col'>
                        {/* text-bg-dark */}
                        <div className='card card-cover h-100 overflow-hidden rounded-4 shadow-lg bg-body-secondary'>
                            <div className='row'>
                                {/* d-lg-block d-done */}
                                <div className='col-auto d-flex align-items-center'>
                                    {
                                        us.imagen ? <div className='d-flex justify-content-center align-items-center'>
                                            <Image src={us.imagen} roundedCircle height={80} width={80} className='ms-2' />
                                        </div>
                                            : <div className='d-flex justify-content-center align-items-center'>
                                                <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" roundedCircle height={80} width={80} className='ms-2' />
                                            </div>
                                    }
                                    {/* <Image src="https://qph.cf2.quoracdn.net/main-qimg-5cfef399fca66068c394856226ab1a4a" roundedCircle height={80} width={80} className='ms-2' /> */}
                                </div>
                                <div className='col'>
                                    <p className='fw-bold mb-1'>Clave: {us.nombre}</p>
                                    {/* <p className='m-0'>Nombre: {us.nombre}</p> */}
                                    <p className='m-0'>Correo: {us.correo}</p>
                                    <p className='m-0'>Telefono: {us.telefono}</p>
                                    <p className='m-0'>Rol: {us.rol}</p>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <p className="m-0 ms-2">{(us.almacen as Almacen).nombre}</p>
                                <p className=" ms-2">{(us.caja) ? (us.caja as Caja).nombre : 'Sin Caja'} </p>
                            </div>
                            {/* <div className='d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1'>
                            <h3>Algo .com</h3>
                        </div> */}
                        </div>
                    </div>)
                }
            </div>

        </div>
    )
}