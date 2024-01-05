import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux"
import * as Yup from 'yup';
import { useFormik } from "formik";

import { RootState } from "../../../../store";
import { MyTextInput } from "../../../shared/MyTextInput";
import { NuevoAlmacen, NuevoNegocio, Almacen, Negocio } from "../../../../interfaces";
import { useAppDispatch } from "../../../../hooks";
import { crearNegocio } from "../../../../store/slices/negocio/negocioThuncks";
import { ColumnDef } from "@tanstack/react-table";
import { Tabla } from "../../../shared/Tabla";
import { revalidarSesion } from "../../../../store/slices/usuario";
import { actualizarAlmacen, agregarAlmacen, crearAlmacen, obtenerAlmacen } from "../../../../store/slices/almacen";

export const NegocioPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { almacenes } = useSelector((state: RootState) => state.almacen);

    const { negocio } = usuario!;

    const [sucursal, setSucursal] = useState<Almacen>();

    const [state, setState] = useState({
        modificar: negocio !== null ? true : false
    });

    const { handleSubmit, errors, touched, getFieldProps, values } = useFormik<Negocio>({
        initialValues: {
            nombre: (negocio !== null) ? negocio!.nombre : '',
            descripcion: (negocio !== null) ? negocio!.descripcion : '',
            rfc: (negocio !== null) ? negocio!.rfc : '',
            calle: (negocio !== null) ? negocio!.calle : '',
            ciudad: (negocio !== null) ? negocio!.ciudad : '',
            colonia: (negocio !== null) ? negocio!.colonia : '',
            estado: (negocio !== null) ? negocio!.estado : '',
            pais: (negocio !== null) ? negocio!.pais : '',
            codigo_postal: (negocio !== null) ? negocio!.codigo_postal : '',
            correo: (negocio !== null) ? negocio!.correo : '',
            telefono: (negocio !== null) ? negocio!.telefono : '',
            giro: (negocio !== null) ? negocio!.giro : '',
            pagina: (negocio !== null) ? negocio!.pagina : '',
            municipio: (negocio !== null) ? negocio!.municipio : '',
            no_ext: (negocio !== null) ? negocio!.no_ext : 0,
            no_int: (negocio !== null) ? negocio!.no_int : 0,
        },
        onSubmit: async (values) => {
            console.log(values);
            dispatch(crearNegocio({
                ...values,
                no_ext: values.no_ext ? +values.no_ext : undefined
            }));
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Nombre es nesesario')
        })
    });

    const { handleSubmit: handleSubmitSucursales, errors: errorsSucursales, touched: touchedSucursales, getFieldProps: getFieldPropsSucursales, resetForm: resetFormSucursales, setValues: setValuesSucursales } = useFormik<NuevoAlmacen>({
        initialValues: {
            // TODO: Verificar esta linea da error al valorizar null value
            nombre: '',
            direccion: '',
            correo: '',
            telefono: '',
        },
        onSubmit: async (values) => {
            if (!sucursal) {
                const nuevaSucursal = await crearAlmacen({ ...values });
                if (nuevaSucursal) dispatch(agregarAlmacen(nuevaSucursal));
                // if (nuevaSucursal) setSucursales([nuevaSucursal, ...sucursales]);

            } else {
                const sucursalActualizada = await actualizarAlmacen(sucursal.id!, {
                    nombre: values.nombre,
                    direccion: values.direccion,
                    correo: values.correo,
                    telefono: values.telefono,
                    caja: sucursal.caja
                });
                if (sucursalActualizada) dispatch(agregarAlmacen(sucursalActualizada));
                // if (sucursalActualizada) setSucursales([sucursalActualizada, ...sucursales.filter(sc => sc.id !== sucursalActualizada?.id)]);
            }

            dispatch(revalidarSesion());
            resetFormSucursales();
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Nombre es nesesario'),
            contrasena: Yup.string().min(6, 'La contraseña debe tener mas de 6 caracteres')
        })
    });

    useEffect(() => {
        dispatch(obtenerAlmacen({}));
    }, []);

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

    return (
        <div className="row">
            {!usuario?.negocio && <div className="alert alert-danger" role="alert">
                Debe dar de alta su negocio
            </div>
            }

            <form className="container mt-2" noValidate onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between">
                    <h5>Cuéntanos sobre tu Empresa / Negocio / Tiendita</h5>
                    <button disabled={usuario?.roles.includes('administrador') ? false : state.modificar} type="submit" className="btn btn-primary text-decoration-none">Guardar</button>
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <MyTextInput
                            {...getFieldProps('nombre')}
                            label="Nombre*"
                            placeholder="Nombre"
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>
                    <div className="col">
                        <MyTextInput
                            {...getFieldProps('rfc')}
                            label="RFC"
                            placeholder="RFC123456XF"
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>
                    <MyTextInput
                        {...getFieldProps('descripcion')}
                        label="Descripcion"
                        placeholder="Escriba una descripcion"
                        className="form-control"
                        disabled={state.modificar}
                    />
                </div>

                <div className="row">

                    <MyTextInput
                        {...getFieldProps('calle')}
                        label="Calle*"
                        placeholder=""
                        className="form-control"
                        disabled={state.modificar}
                    />
                    <div className="col-md-4">
                        <MyTextInput
                            {...getFieldProps('no_ext')}
                            value={values.no_ext !== 0 ? values.no_ext : ''}
                            label="No. Ext*"
                            placeholder=""
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>

                    <div className="col-md-4">
                        <MyTextInput
                            {...getFieldProps('no_int')}
                            value={values.no_int !== 0 ? values.no_int : ''}
                            label="No. Int"
                            placeholder=""
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>

                    <div className="col-md-4">
                        <MyTextInput
                            {...getFieldProps('codigo_postal')}
                            label="C.P*"
                            placeholder=""
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <MyTextInput
                            {...getFieldProps('colonia')}
                            label="Colonia*"
                            placeholder=""
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>
                    <div className="col-md-6">
                        <MyTextInput
                            {...getFieldProps('ciudad')}
                            label="Ciudad*"
                            placeholder=""
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <MyTextInput
                            {...getFieldProps('municipio')}
                            label="Municipio"
                            placeholder=""
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>
                    <div className="col-md-4">
                        <MyTextInput
                            {...getFieldProps('estado')}
                            label="Estado*"
                            placeholder=""
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>
                    <div className="col-md-4">
                        <MyTextInput
                            {...getFieldProps('pais')}
                            label="Pais*"
                            placeholder=""
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <MyTextInput
                            {...getFieldProps('telefono')}
                            label="Telefono"
                            placeholder="255 ... ..."
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>
                    <div className="col-md-6">
                        <MyTextInput
                            {...getFieldProps('correo')}
                            label="Correo"
                            placeholder="correo@correo.com"
                            className="form-control"
                            disabled={state.modificar}
                        />
                    </div>
                    <MyTextInput
                        {...getFieldProps('pagina')}
                        label="Pagina web"
                        placeholder="https://mi_pagina.com"
                        className="form-control"
                        disabled={state.modificar}
                    />
                </div>
            </form>
            <div>
                <h2>Almacenes</h2>
            </div>
            {almacenes.length === 0 && <div className="alert alert-danger" role="alert">
                {!usuario?.negocio && <>Debe registrar primero su negocio<hr /></>}
                Debe registrar al menos una sucursal
            </div>
            }
            <div className="row mb-4">
                <div className="col-md-4 border-end">
                    <form className="" noValidate onSubmit={handleSubmitSucursales}>
                        <MyTextInput
                            label="Nombre de la sucursal"
                            placeholder="Nombre"
                            className="form-control"
                            disabled={!usuario?.negocio}
                            {...getFieldPropsSucursales('nombre')}
                        />
                        <MyTextInput
                            label="Direccion"
                            placeholder=""
                            className="form-control"
                            disabled={!usuario?.negocio}
                            {...getFieldPropsSucursales('direccion')}
                        />
                        <MyTextInput
                            label="Correo"
                            placeholder="correo@ejemplo.com"
                            className="form-control"
                            disabled={!usuario?.negocio}
                            {...getFieldPropsSucursales('correo')}
                        />
                        <MyTextInput
                            label="Telefono"
                            placeholder=""
                            className="form-control"
                            disabled={!usuario?.negocio}
                            {...getFieldPropsSucursales('telefono')}
                        />
                        <button type="submit" className="btn btn-primary text-decoration-none" disabled={!usuario?.negocio}>Guardar</button>
                    </form>
                </div>
                <div className="col">
                    <Tabla
                        data={almacenes}
                        columns={columnasSucursales}
                        seleccionado={sucursal?.id}
                        onClickFila={(sc) => {
                            if (sc.id !== sucursal?.id) {
                                setSucursal(sc);
                                setValuesSucursales({
                                    nombre: sc.nombre,
                                    direccion: sc.direccion,
                                    correo: sc.correo,
                                    telefono: sc.telefono,
                                });
                            } else {
                                setSucursal(undefined);
                                setValuesSucursales({
                                    nombre: '',
                                    direccion: '',
                                    correo: '',
                                    telefono: '',
                                });
                            }
                        }} />
                </div>
            </div>

        </div>
    )
}
