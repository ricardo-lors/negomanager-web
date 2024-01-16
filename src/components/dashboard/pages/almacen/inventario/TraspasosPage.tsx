import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Producto } from '../../../../../interfaces';
import { FormInventario, Inventario } from '../../../../../interfaces/Inventario.interface';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MySelect, MyTextInput } from '../../../../shared';
import { crearMovimientoInventario, obtenerMovimientoInventario } from '../../../../../store/slices/inventario';
import { ColumnDef } from '@tanstack/react-table';
import { Tabla } from '../../../../shared/Tabla';
import moment from 'moment';

export const TraspasosPage = () => {

    const navigate = useNavigate();

    const location = useLocation();

    const state = location.state as Producto;

    const [inventario, setInventario] = useState<Inventario[]>([]);

    const { handleSubmit, errors, touched, getFieldProps, values, setFieldValue } = useFormik<FormInventario>({
        initialValues: {
            tipo: '',
            descripcion: '',
            anterior: state.stock!,
            cantidad: 0,
            actual: state.stock!,
            producto: state.id!,
        },
        onSubmit: async (values) => {
            console.log(values);
            crearMovimientoInventario(values);
        },
        validationSchema: Yup.object({
            tipo: Yup.string().required('Seleccione el tipo de operación que se realizara'),
            descripcion: Yup.string().required('Describa el motivo de la operación'),
            cantidad: Yup.number().required('Ingrese una cantidad').min(1, 'Debe ser mayor a 0')
        }),
        enableReinitialize: true
    });

    useEffect(() => {

        if (values.tipo === 'ENTRADA') {
            setFieldValue('actual', values.anterior + values.cantidad);
        } else {
            setFieldValue('actual', values.anterior - values.cantidad);
        }

    }, [values.cantidad, values.tipo]);

    useEffect(() => {
        obtenerMovimientoInventario({
            producto: state.id
        }).then((inv) => setInventario(inv));

    }, []);

    const columnas = useMemo<ColumnDef<Inventario>[]>(
        () => [
            {
                accessorKey: 'tipo',
                cell: info => info.getValue(),
                header: () => <span>Tipo</span>,
            }, {
                accessorKey: 'fecha',
                cell: info => moment(info.row.getValue('fecha')).format('YYYY-MM-DD, h:mm:ss a'),
                header: () => <span>Fecha</span>,
            }, {
                accessorKey: 'descripcion',
                cell: info => info.getValue(),
                header: () => <span>Descripcion</span>,
            }, {
                accessorKey: 'anterior',
                cell: info => info.getValue(),
                header: () => <span>Anterior</span>,
            }, {
                accessorKey: 'cantidad',
                cell: info => info.getValue(),
                header: () => <span>Cantidad</span>,
            }, {
                accessorKey: 'actual',
                cell: info => info.getValue(),
                header: () => <span>Quedo</span>,
            },
        ], [inventario]
    );

    return (
        <div>
            <div className='d-flex justify-content-between mb-1 mt-1'>
                <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></button>
                <h2 className='text-center m-0'>Ajuste de inventario</h2>
                <div></div>
            </div>
            <div className='row'>
                <form className="container mt-2" noValidate onSubmit={handleSubmit}>

                    <MySelect
                        {...getFieldProps('tipo')}
                        label="Tipo"
                        className="form-control"
                        errors={(touched.tipo && errors.tipo) || ''}
                    >
                        <option value="" >Seleccione una</option>
                        <option value="ENTRADA" >ENTRADA</option>
                        <option value="SALIDA" >SALIDA</option>
                    </MySelect>
                    {/* </div> */}
                    <div className="mb-2">
                        <label className='form-label' htmlFor=''>Descripción</label>
                        <textarea
                            {...getFieldProps('descripcion')}
                            className="form-control"
                            value={values.descripcion !== undefined ? values.descripcion : ''}
                            cols={10}
                            rows={2}
                        />
                        <span className="text-danger">{errors.descripcion}</span>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <MyTextInput
                                {...getFieldProps('anterior')}
                                min='0'
                                type="number"
                                label="Stock Anterior"
                                disabled={true}
                                className="form-control"
                                value={(values.anterior !== 0 || values.anterior !== undefined) ? values.anterior : ''}
                                errors={(touched.anterior && errors.anterior) || ''}

                            />
                        </div>
                        <div className="col-4">
                            <MyTextInput
                                {...getFieldProps('cantidad')}
                                min='0'
                                type="number"
                                label={`Cantidad ${values.tipo === 'ENTRADA' ? 'a Sumar' : 'a Restar'}`}
                                className="form-control"
                                placeholder='0'
                                value={(values.cantidad !== 0 || values.cantidad !== undefined) ? values.cantidad : ''}
                                errors={(touched.cantidad && errors.cantidad) || ''}
                            />
                        </div>
                        <div className="col-4">
                            <MyTextInput
                                {...getFieldProps('actual')}
                                min='0'
                                type="number"
                                label="Stock Nuevo"
                                placeholder='0'
                                disabled={true}
                                className="form-control"
                                value={(values.actual !== 0 || values.actual !== undefined) ? values.actual : ''}
                                errors={(touched.actual && errors.actual) || ''}
                            // 
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary text-decoration-none w-100">Guardar</button>
                </form>
            </div>

            <div className='row mt-2'>
                <div className='col'>
                    <h3 className='text-center mt-2'>Movimientos de Inventario</h3>
                    <div style={{ height: '300px', maxHeight: '350px', overflow: 'auto' }}>
                        <Tabla
                            data={inventario}
                            columns={columnas}
                        // verFooter={true}
                        // onClickFila={}

                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
