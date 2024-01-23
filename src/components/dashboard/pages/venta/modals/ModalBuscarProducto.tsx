import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react'
import { Producto, ProductoVenta, QueryParamsProducto } from '../../../../../interfaces';

import * as Yup from 'yup';
import { ColumnDef } from '@tanstack/react-table';
import { Tabla } from '../../../../shared/Tabla';
import { formatearNumero } from '../../../../../store';
import { useDispatch } from 'react-redux';
import { agregarProducto } from '../../../../../store/slices/venta';
import { obtenerProductosQuery } from '../../../../../store/slices/inventario';

export const ModalBuscarProducto = () => {

    const dispatch = useDispatch();

    const [productos, setProductos] = useState<Producto[]>([]);

    const { handleSubmit, errors, touched, getFieldProps, resetForm } = useFormik<QueryParamsProducto>({
        initialValues: { titulo: '' },
        onSubmit: async (values) => {
            const resp = await obtenerProductosQuery({
                titulo: values.titulo
            });
            resp && setProductos(resp);
        },
        validationSchema: Yup.object({
            titulo: Yup.string().required('Requerido')
        }),

    });

    const columnas = useMemo<ColumnDef<Producto>[]>(
        () => [
            {
                accessorKey: 'titulo',
                cell: info => info.getValue(),
                header: () => <span>Titulo</span>,
            },
            {
                accessorKey: 'stock',
                cell: info => info.getValue(),
                header: () => <span>Stock</span>,
            },
            {
                accessorKey: 'precio',
                cell: info => <>{formatearNumero(info.row.original.precio)}</>,
                header: () => <span>Precio</span>,
            },
        ], []
    );

    return (
        <>
            <div className="col">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Buscar..." {...getFieldProps('titulo')} />
                        <button type="submit" className="btn btn-primary">Buscar</button>
                    </div>
                    {touched.titulo && errors.titulo && <span className="text-danger">{errors.titulo}</span>}
                </form>
            </div>
            <div style={{ height: '300px', maxHeight: '350px', overflow: 'auto' }}>
                <Tabla
                    data={productos}
                    columns={columnas}
                    verFooter={true}
                    onDoubleClick={
                        (prod: Producto) => {
                            if (prod.activo) {
                                dispatch(agregarProducto({
                                    id: prod.id!,
                                    codigo: prod.codigo,
                                    titulo: prod.titulo,
                                    inventario: prod.control,
                                    precio: prod.precio
                                }));
                            }
                        }
                    }
                />
            </div>

        </>
    )
}
