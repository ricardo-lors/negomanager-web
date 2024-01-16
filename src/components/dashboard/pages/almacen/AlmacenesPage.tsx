import React, { useMemo, useState } from 'react'
import { MyTextInput } from '../../../shared';
import { useFormik } from 'formik';
import { agregarAlmacen, crearAlmacen } from '../../../../store/slices/almacen';
import { useAppDispatch } from '../../../../hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import * as Yup from 'yup';
import { Tabla } from '../../../shared/Tabla';
import { Almacen, NuevoAlmacen } from '../../../../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

export const AlmacenesPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
                const nuevaSucursal = await crearAlmacen({ ...values });
                if (nuevaSucursal) dispatch(agregarAlmacen(nuevaSucursal));
                // if (nuevaSucursal) setSucursales([nuevaSucursal, ...sucursales]);

            } else {
                // const sucursalActualizada = await actualizarAlmacen(sucursal.id!, {
                //     nombre: values.nombre,
                //     direccion: values.direccion,
                //     correo: values.correo,
                //     telefono: values.telefono,
                //     caja: sucursal.caja
                // });
                // if (sucursalActualizada) dispatch(agregarAlmacen(sucursalActualizada));
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

    return (
        <div className='row'>
            <div className='d-flex space-around'>
                <h2>Almacenes</h2>
                <button className='btn btn-primary' disabled={!almacen}
                    onClick={() => {
                        navigate('/dashboard/almacenes/inventario', { state: { ...almacen } })
                    }}
                >Inventario</button>
                <button className='btn btn-primary' disabled={!almacen}
                    onClick={() => {
                        console.log('Cajas');
                        navigate('/dashboard/almacenes/cajas', { state: { ...almacen } })
                    }}
                >Cajas</button>
            </div>
            <div className="col-md-4 border-end">
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
                        className="form-control"
                    // disabled={!usuario?.negocio}
                    />
                    <button type="submit" className="btn btn-primary text-decoration-none" >Guardar</button>
                </form>
            </div>
            <div className="col">
                <Tabla
                    data={almacenes}
                    columns={columnasSucursales}
                    seleccionado={almacen?.id}
                    onClickFila={(alm) => {
                        console.log(alm)
                        if (alm.id !== almacen?.id) {
                            setAlmacen(alm);
                            setValues({
                                nombre: alm.nombre,
                                direccion: alm.direccion !== null ? alm.direccion : '',
                                correo: alm.correo !== null ? alm.correo : '',
                                telefono: alm.telefono !== null ? alm.telefono : '',
                            });
                        } else {
                            setAlmacen(undefined);
                            setValues({
                                nombre: '',
                                direccion: '',
                                correo: '',
                                telefono: '',
                            });
                        }
                    }}
                />
            </div>
        </div>
    )
}
