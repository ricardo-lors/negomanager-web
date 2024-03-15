import React, { useMemo, useState } from 'react'
import { MyButtonTooltip, MyTextInput } from '../../../shared';
import { useFormik } from 'formik';
import { actualizarAlmacen, agregarAlmacen, crearAlmacen } from '../../../../store/slices/almacen';
import { useAppDispatch } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import * as Yup from 'yup';
import { Tabla } from '../../../shared/Tabla';
import { Almacen, NuevoAlmacen } from '../../../../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { Link, useNavigate } from 'react-router-dom';
import { TituloPagina } from '../shared/TituloPagina';
import { Badge, Button, Container, ListGroup, OverlayTrigger, Stack } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { MyOverlayComponent } from '../../../shared/MyOverlayComponent';

export const AlmacenesPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { usuario } = useSelector((state: RootState) => state.sesion);
    const { almacenes } = useSelector((state: RootState) => state.almacen);
    const [almacen, setAlmacen] = useState<Almacen>();

    const { handleSubmit, errors, touched, getFieldProps, resetForm, setValues } = useFormik<NuevoAlmacen>({
        initialValues: {
            // TODO: Verificar esta linea da error al valorizar null value
            nombre: '',
            direccion: '',
            correo: '',
            telefono: '',
        },
        onSubmit: async (values) => {
            if (!almacen) {
                const nuevoAlmacen = await crearAlmacen({ ...values });
                if (nuevoAlmacen) dispatch(agregarAlmacen(nuevoAlmacen));
            } else {
                const sucursalActualizada = await actualizarAlmacen(almacen.id!, {
                    nombre: values.nombre,
                    direccion: values.direccion,
                    correo: values.correo,
                    telefono: values.telefono
                });
                if (sucursalActualizada) dispatch(agregarAlmacen(sucursalActualizada));
                // if (sucursalActualizada) setSucursales([sucursalActualizada, ...sucursales.filter(sc => sc.id !== sucursalActualizada?.id)]);
            }

            // dispatch(revalidarSesion());
            // resetFormSucursales();
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Nombre es nesesario'),
            contrasena: Yup.string().min(6, 'La contraseña debe tener mas de 6 caracteres')
        })
    });

    const columnasSucursales = useMemo<ColumnDef<Almacen>[]>(
        () => [
            {
                id: 'nombre',
                accessorKey: 'nombre',
                cell: info => info.getValue(),
                header: () => <span>Nombre</span>,
                // footer: props => props.column.id,
            }, {
                id: 'direccion',
                accessorKey: 'direccion',
                cell: info => info.getValue(),
                header: () => <span>Direccion</span>,
            }, {
                id: 'correo',
                accessorKey: 'correo',
                cell: info => info.getValue(),
                header: () => <span>Correo</span>,
            }, {
                id: 'telefono',
                accessorKey: 'telefono',
                cell: info => info.getValue(),
                header: () => <span>Telefono</span>,
            },
        ], [almacenes]
    );

    // const handleSeleccionarAlmacen() => {

    // }

    return (
        <div className='row mt-3'>

            <TituloPagina centro='ALMACENES' />

            <Container className="bg-body-secondary p-2" fluid>
                {/* <Link to='/dashboard/usuarios/usuario' >ddd</Link> */}
                <MyButtonTooltip
                    id="tooltip-category"
                    className='m-2'
                    children={<h1><i className="bi bi-tag-fill"></i></h1>}
                    content='Agregar Categorias'
                    onClick={() => navigate("/dashboard/almacenes/categorias")}
                    place='top'
                />
                <MyButtonTooltip
                    id="tooltip-departamento"
                    children={<h1><i className="bi bi-bookmark-plus-fill"></i></h1>}
                    content='Agregar Departamento'
                    onClick={() => navigate("/dashboard/almacenes/departamentos")}
                    place='top'
                />
                <MyButtonTooltip
                    id="tooltip-lineas"
                    className='m-2'
                    children={<h1><i className="bi bi-bar-chart-steps"></i></h1>}
                    content='Agregar Linea'
                    onClick={() => navigate("/dashboard/almacenes/lineas")}
                    place='top'
                />
            </Container>
            <hr />
            {
                usuario!.rol === 'administrador' &&
                <div className="col-md-3 container bg-body-secondary ms-md-2 me-md-2 p-3" style={{ height: '89vh' }}>
                    <form className="" noValidate onSubmit={handleSubmit}>
                        <MyTextInput
                            {...getFieldProps('nombre')}
                            label="Nombre de el almacen"
                            placeholder="Nombre"
                            className="form-control"
                        // disabled={!usuario?.negocio}
                        />
                        <MyTextInput
                            {...getFieldProps('direccion')}
                            label="Direccion"
                            placeholder=""
                            className="form-control"
                        // disabled={!usuario?.negocio}
                        />
                        <MyTextInput
                            {...getFieldProps('correo')}
                            label="Correo"
                            placeholder="correo@ejemplo.com"
                            className="form-control"
                        // disabled={!usuario?.negocio}
                        />
                        <MyTextInput
                            {...getFieldProps('telefono')}
                            label="Telefono"
                            placeholder=""
                            className="form-control mb-3"
                        // disabled={!usuario?.negocio}
                        />

                        {/* <button type="submit" className="btn btn-primary text-decoration-none" >Guardar</button> */}
                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary" >
                                Guardar
                            </Button>
                        </div>

                    </form>
                </div>
            }

            <div className='col bg-body-secondary me-2 pt-2' style={{ height: '89vh' }}>
                <ListGroup as="ol" numbered>
                    {
                        almacenes.map((almac) =>
                            <ListGroup.Item
                                key={almac.id} as="li"
                                // action
                                className="d-flex justify-content-between align-items-start"
                            // onClick={() => {
                            //     setAlmacen(almac);
                            //     setValues({
                            //         nombre: almac.nombre,
                            //         direccion: almac.direccion ? almac.direccion : '',
                            //         correo: almac.correo ? almac.correo : '',
                            //         telefono: almac.telefono ? almac.telefono : '',
                            //     });
                            // }}
                            >
                                <div className=" ms-2 me-auto">
                                    <div className="fw-bold">{almac.nombre}</div>
                                    <p className='m-0'>{almac.direccion}</p>
                                    <p className='m-0'>{almac.telefono}</p>
                                    <p className='m-0'>{almac.correo}</p>
                                </div>
                                {/* <div className='me-auto'>
                                    <p>algo mas</p>
                                </div> */}
                                <div className='row'>
                                    {/* <OverlayTrigger
                                        placement='top'
                                        overlay={
                                            <Tooltip id={`tooltip-top`}>
                                                Tooltip on <strong>Productos</strong>.
                                            </Tooltip>

                                        }>
                                        <Button id='tooltip-top' variant="success">Hover me to see</Button>
                                    </OverlayTrigger> */}
                                    <i className="bi bi-box-seam fs-2" onClick={() => navigate('/dashboard/almacenes/inventario', { state: { ...almac } })} ></i>
                                    <i className="bi bi-inbox fs-2" onClick={() => navigate('/dashboard/almacenes/cajas', { state: { ...almac } })} ></i>
                                    {/* <MyOverlayComponent /> */}
                                </div>
                                {/* <Badge bg="primary" pill>
                                    ${almac.dinero}
                                </Badge> */}
                            </ListGroup.Item>
                        )
                    }
                    {/* <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>

                    </ListGroup.Item> */}
                    {/* <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Subheading</div>
                            Cras justo odio
                        </div>
                        <Badge bg="primary" pill>
                            14
                        </Badge>
                    </ListGroup.Item> */}
                </ListGroup>
            </div>


            {/* <div className='album py-2'>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4'>
                    {
                        almacenes.map(almac =>
                            <div key={almac.id} className='col'>
                                <div className='card shadow-sm mb-2' style={{ height: 350 }}>
                                    <span className="position-absolute top-0 start-25 translate-middle badge rounded-pill bg-primary" ><h1><i className="bi bi-emoji-laughing"></i></h1></span>
                                    <span className="visually-hidden">unread messages</span>
                                    <div className='card-header'>
                                        {almac.nombre}
                                    </div>
                                </div>

                            </div>)
                    }

                </div>
            </div> */}
        </div>

        // <Stack gap={3}>
        //     <div className="p-2 bg-body-secondary">First item</div>
        //     <div className="p-2">Second item</div>
        //     <div className="p-2">Third item</div>
        // </Stack>

    )
}




// import React, { useMemo, useState } from 'react'
// import { MyTextInput } from '../../../shared';
// import { useFormik } from 'formik';
// import { agregarAlmacen, crearAlmacen } from '../../../../store/slices/almacen';
// import { useAppDispatch } from '../../../../hooks';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../../store';
// import * as Yup from 'yup';
// import { Tabla } from '../../../shared/Tabla';
// import { Almacen, NuevoAlmacen } from '../../../../interfaces';
// import { ColumnDef } from '@tanstack/react-table';
// import { useNavigate } from 'react-router-dom';

// export const AlmacenesPage = () => {

//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();

//     const { usuario } = useSelector((state: RootState) => state.sesion);
//     const { almacenes } = useSelector((state: RootState) => state.almacen);
//     const [almacen, setAlmacen] = useState<Almacen>();

//     const { handleSubmit, errors, touched, getFieldProps, resetForm, setValues } = useFormik<NuevoAlmacen>({
//         initialValues: {
//             // TODO: Verificar esta linea da error al valorizar null value
//             nombre: '',
//             direccion: '',
//             correo: '',
//             telefono: '',
//         },
//         onSubmit: async (values) => {
//             if (!almacen) {
//                 const nuevaSucursal = await crearAlmacen({ ...values });
//                 if (nuevaSucursal) dispatch(agregarAlmacen(nuevaSucursal));
//                 // if (nuevaSucursal) setSucursales([nuevaSucursal, ...sucursales]);

//             } else {
//                 // const sucursalActualizada = await actualizarAlmacen(sucursal.id!, {
//                 //     nombre: values.nombre,
//                 //     direccion: values.direccion,
//                 //     correo: values.correo,
//                 //     telefono: values.telefono,
//                 //     caja: sucursal.caja
//                 // });
//                 // if (sucursalActualizada) dispatch(agregarAlmacen(sucursalActualizada));
//                 // if (sucursalActualizada) setSucursales([sucursalActualizada, ...sucursales.filter(sc => sc.id !== sucursalActualizada?.id)]);
//             }

//             // dispatch(revalidarSesion());
//             // resetFormSucursales();
//         },
//         validationSchema: Yup.object({
//             nombre: Yup.string().required('Nombre es nesesario'),
//             contrasena: Yup.string().min(6, 'La contraseña debe tener mas de 6 caracteres')
//         })
//     });

//     const columnasSucursales = useMemo<ColumnDef<Almacen>[]>(
//         () => [
//             {
//                 id: 'nombre',
//                 accessorKey: 'nombre',
//                 cell: info => info.getValue(),
//                 header: () => <span>Nombre</span>,
//                 // footer: props => props.column.id,
//             }, {
//                 id: 'direccion',
//                 accessorKey: 'direccion',
//                 cell: info => info.getValue(),
//                 header: () => <span>Direccion</span>,
//             }, {
//                 id: 'correo',
//                 accessorKey: 'correo',
//                 cell: info => info.getValue(),
//                 header: () => <span>Correo</span>,
//             }, {
//                 id: 'telefono',
//                 accessorKey: 'telefono',
//                 cell: info => info.getValue(),
//                 header: () => <span>Telefono</span>,
//             },
//         ], [almacenes]
//     );

//     return (
//         <div className='row'>
//             <div className='d-flex space-around'>
//                 <h2>Almacenes</h2>
//                 <button className='btn btn-primary' disabled={!almacen}
//                     onClick={() => {
//                         navigate('/dashboard/almacenes/inventario', { state: { ...almacen } })
//                     }}
//                 >Inventario</button>
//                 <button className='btn btn-primary' disabled={!almacen}
//                     onClick={() => {
//                         console.log('Cajas');
//                         navigate('/dashboard/almacenes/cajas', { state: { ...almacen } })
//                     }}
//                 >Cajas</button>
//             </div>
//             {
//                 usuario!.rol === 'administrador' &&
//                 <div className="col-md-4 border-end">
//                     <form className="" noValidate onSubmit={handleSubmit}>
//                         <MyTextInput

//                             {...getFieldProps('nombre')}
//                             label="Nombre de el almacen"
//                             placeholder="Nombre"
//                             className="form-control"
//                         // disabled={!usuario?.negocio}
//                         />
//                         <MyTextInput
//                             {...getFieldProps('direccion')}
//                             label="Direccion"
//                             placeholder=""
//                             className="form-control"
//                         // disabled={!usuario?.negocio}
//                         />
//                         <MyTextInput
//                             {...getFieldProps('correo')}
//                             label="Correo"
//                             placeholder="correo@ejemplo.com"
//                             className="form-control"
//                         // disabled={!usuario?.negocio}
//                         />
//                         <MyTextInput
//                             {...getFieldProps('telefono')}
//                             label="Telefono"
//                             placeholder=""
//                             className="form-control"
//                         // disabled={!usuario?.negocio}
//                         />
//                         <button type="submit" className="btn btn-primary text-decoration-none" >Guardar</button>
//                     </form>
//                 </div>
//             }
//             <div className="col">
//                 <Tabla
//                     data={almacenes}
//                     columns={columnasSucursales}
//                     seleccionado={almacen?.id}
//                     onClickFila={(alm) => {
//                         console.log(alm)
//                         if (alm.id !== almacen?.id) {
//                             setAlmacen(alm);
//                             setValues({
//                                 nombre: alm.nombre,
//                                 direccion: alm.direccion !== null ? alm.direccion : '',
//                                 correo: alm.correo !== null ? alm.correo : '',
//                                 telefono: alm.telefono !== null ? alm.telefono : '',
//                             });
//                         } else {
//                             setAlmacen(undefined);
//                             setValues({
//                                 nombre: '',
//                                 direccion: '',
//                                 correo: '',
//                                 telefono: '',
//                             });
//                         }
//                     }}
//                 />
//             </div>
//         </div>
//     )
// }
