import React from 'react'
import { FormikHelpers, useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { MyTextInput } from '../../../../shared';
import { crearMovimiento } from '../../../../../store/slices/movimiento';
import * as Yup from 'yup';

export const ModalEntradaSalidaDinero = ({ onSubmit }: {
    onSubmit: (values: {
        total: number;
    }, formikHelpers: FormikHelpers<{
        total: number;
    }>) => void | Promise<any>
}) => {

    const dispatch = useDispatch();

    // const { detalles } = useSelector((state: RootState) => state.venta);

    const { handleSubmit, errors, touched, getFieldProps, values } = useFormik<{ total: number }>({
        initialValues: { total: 0 },
        onSubmit: onSubmit,
        validationSchema: Yup.object({
            // pago: Yup.string().required('EL dato es requerido'),
            // clienteid: Yup.string()
            //   // .notOneOf(['0'], 'Esta opcion no esta permitida')
            //   .required('Requerido'),
        })
    });

    return (
        <form className="row" noValidate onSubmit={handleSubmit}>
            <MyTextInput
                {...getFieldProps('total')}
                type="number"
                label="Cantidad"
                placeholder="1.000"
                className="form-control"
                value={values.total === 0 ? '' : values.total}
                errors={(touched.total && errors.total) || ''}
            />
            <button type="submit" className="btn btn-primary" >Aplicar</button>
        </form>
    )
}
