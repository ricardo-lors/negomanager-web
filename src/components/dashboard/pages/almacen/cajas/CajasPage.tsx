import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { Caja, CajaNueva } from '../../../../../interfaces/Caja.interface';
import { MyTextInput } from '../../../../shared';

import * as Yup from 'yup';
import { Tabla } from '../../../../shared/Tabla';
import { useEffect, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { useAppDispatch } from '../../../../../hooks';
import { crearCaja, obtenerCajas } from '../../../../../store/slices/caja';
import { Almacen } from '../../../../../interfaces';

export const CajasPage = () => {

    const dispatch = useAppDispatch();

    const { cajas } = useSelector((state: RootState) => state.caja);

    const navigate = useNavigate();
    const location = useLocation();
    const almacen = location.state as Almacen;


    useEffect(() => {
        dispatch(obtenerCajas({
            almacen: almacen.id
        }));
        // return () => {
        //     second
        // }
    }, [])


    const { handleSubmit, errors, touched, getFieldProps } = useFormik<CajaNueva>({
        initialValues: {
            nombre: '',
            activa: true,
            captura_cliente: true,
            aplicar_descuentos: true,
            restringir_venta: false,
        },
        onSubmit: async (values) => {
            console.log(values);
            dispatch(crearCaja({
                ...values,
                almacen: almacen.id
            }));
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nobre es requerido')
        })
    });

    const cajaColumnas = useMemo<ColumnDef<Caja>[]>(
        () => [
            {
                id: 'nombre',
                accessorKey: 'nombre',
                cell: info => info.getValue(),
                header: () => <span>Nombre</span>,
                // footer: props => props.column.id,
            }
        ], []
    );

    return (
        <div>
            <div className="d-flex">
                <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></button>
                <h2>Cajas</h2>
            </div>
            <div className='row' >

                <div className='col-md-3 '>

                    <form action="" noValidate onSubmit={handleSubmit}>
                        <MyTextInput
                            label="Nombre"
                            className='form-control'
                            {...getFieldProps('nombre')}
                        />
                        <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>

                    </form>

                </div>

                <div className='col'>
                    <Tabla
                        data={cajas}
                        columns={cajaColumnas}
                        // seleccionado={usuarioSeleccionado?.id}
                        onClickFila={
                            (cj: Caja) => {
                                // if (us.id !== usuarioSeleccionado?.id) {
                                //     setUsuarioSeleccionado(us);
                                //     console.log(us)
                                //     setValues({
                                //         nombre: us.nombre,
                                //         correo: us.correo,
                                //         telefono: us.telefono,
                                //         contrasena: '',
                                //         contrasenaRepeat: '',
                                //         almacen: us.almacen ? us.almacen.id : '',
                                //         permisos: us.permisos,
                                //         roles: ['vendedor']
                                //     });
                                // } else {
                                //     setUsuarioSeleccionado(undefined);
                                //     setValues({
                                //         nombre: '',
                                //         correo: '',
                                //         telefono: '',
                                //         contrasena: '',
                                //         contrasenaRepeat: '',
                                //         almacen: '',
                                //         permisos: [],
                                //         roles: ['vendedor']
                                //     });
                                // }
                            }
                        }
                    />
                </div>


            </div>

        </div>
    )
}
