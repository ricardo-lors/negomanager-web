import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux"
import * as Yup from 'yup';
import { useFormik } from "formik";

import { RootState } from "../../../../store";
import { MyTextInput } from "../../../shared/MyTextInput";
import { NuevaSucursal, NuevoNegocio, Sucursal } from "../../../../interfaces";
import { useAppDispatch } from "../../../../hooks";
import { crearNegocio } from "../../../../store/slices/negocio/negocioThuncks";
import { actualizarSucursal, crearSucursal, obtenerSucursales } from "../../../../store/slices/sucursal";
import { ColumnDef } from "@tanstack/react-table";
import { Tabla } from "../../../shared/Tabla";

export const NegocioPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.usuario);
    const { negocio } = usuario!;

    const [sucursales, setSucursales] = useState<Sucursal[]>([]);

    const [sucursal, setSucursal] = useState<Sucursal>();

    const [state, setState] = useState({
        modificar: negocio !== null ? true : false
    });

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<NuevoNegocio>({
        initialValues: {
            // TODO: Verificar esta linea da error al valorizar null value
            nombre: negocio !== null ? negocio!.nombre : '',
            descripcion: negocio !== null ? negocio!.descripcion : '',
            correo: negocio !== null ? negocio!.correo : '',
            telefono: negocio !== null ? negocio!.telefono : '',
        },
        onSubmit: async (values) => {
            console.log(values);
            dispatch(crearNegocio(values));
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Nombre es nesesario'),
            contrasena: Yup.string().min(6, 'La contraseña debe tener mas de 6 caracteres')
        })
    });

    const { handleSubmit: handleSubmitSucursales, errors: errorsSucursales, touched: touchedSucursales, getFieldProps: getFieldPropsSucursales, resetForm: resetFormSucursales, setValues: setValuesSucursales } = useFormik<NuevaSucursal>({
        initialValues: {
            // TODO: Verificar esta linea da error al valorizar null value
            nombre: '',
            direccion: '',
            correo: '',
            telefono: '',
        },
        onSubmit: async (values) => {
            if (!sucursal) {
                const nuevaSucursal = await crearSucursal({ ...values });
                if (nuevaSucursal) setSucursales([nuevaSucursal, ...sucursales]);

            } else {
                const sucursalActualizada = await actualizarSucursal(sucursal.id!, {
                    nombre: values.nombre,
                    direccion: values.direccion,
                    correo: values.correo,
                    telefono: values.telefono,
                    caja: sucursal.caja
                });
                if (sucursalActualizada) setSucursales([sucursalActualizada, ...sucursales.filter(sc => sc.id !== sucursalActualizada?.id)]);
            }
            resetFormSucursales();
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Nombre es nesesario'),
            contrasena: Yup.string().min(6, 'La contraseña debe tener mas de 6 caracteres')
        })
    });

    useEffect(() => {
        obtenerSucursales({

        }).then(dt => setSucursales(dt));

    }, []);

    const columnasSucursales = useMemo<ColumnDef<Sucursal>[]>(
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
        ], [sucursales]
    );

    return (
        <div className="row">
            {usuario!.negocio === null && <div className="alert alert-danger" role="alert">
                Debe dar de alta su negocio
            </div>
            }

            <form className="container mt-2" noValidate onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between">
                    <h5>Negocio</h5>
                    <button disabled={usuario?.roles.includes('administrador') ? false : state.modificar} type="submit" className="btn btn-primary text-decoration-none">Guardar</button>
                </div>
                <MyTextInput
                    label="Nombre"
                    placeholder="Nombre de la empresa"
                    className="form-control"
                    disabled={state.modificar}
                    {...getFieldProps('nombre')}
                />

                <MyTextInput
                    label="Descripcion"
                    placeholder="Escriba una descripcion"
                    className="form-control"
                    disabled={state.modificar}
                    {...getFieldProps('descripcion')}
                />

                <MyTextInput
                    label="Correo"
                    placeholder="correo@correo.com"
                    className="form-control"
                    disabled={state.modificar}
                    {...getFieldProps('correo')}
                />

                <MyTextInput
                    label="Telefono"
                    placeholder="255 ... ..."
                    className="form-control"
                    disabled={state.modificar}
                    {...getFieldProps('telefono')}
                />

            </form>

            <div>
                <h2>Sucursales</h2>
            </div>

            <div className="row mb-4">
                <div className="col-md-4 border-end">
                    <form className="" noValidate onSubmit={handleSubmitSucursales}>
                        <MyTextInput
                            label="Nombre de la sucursal"
                            placeholder="Nombre"
                            className="form-control"
                            {...getFieldPropsSucursales('nombre')}
                        />
                        <MyTextInput
                            label="Direccion"
                            placeholder=""
                            className="form-control"
                            {...getFieldPropsSucursales('direccion')}
                        />
                        <MyTextInput
                            label="Correo"
                            placeholder="correo@ejemplo.com"
                            className="form-control"
                            {...getFieldPropsSucursales('correo')}
                        />
                        <MyTextInput
                            label="Telefono"
                            placeholder=""
                            className="form-control"
                            {...getFieldPropsSucursales('telefono')}
                        />
                        <button type="submit" className="btn btn-primary text-decoration-none">Guardar</button>
                    </form>
                </div>
                <div className="col">
                    <Tabla 
                    data={sucursales} 
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
