import { useDispatch, useSelector } from "react-redux";
import { MyTextInput } from "../../../../shared";

import * as Yup from 'yup';
import { RootState } from "../../../../../store";
import { useFormik } from "formik";
import { agregarProductoNoRegistrado } from "../../../../../store/slices/venta";

interface AgregarProductoNoRegistradoProps {
    cerrarModal: () => void
}
export const ModalAgregarProductoNoRegistrado = ({ cerrarModal }: AgregarProductoNoRegistradoProps) => {

    const dispatch = useDispatch();

    const { detalles } = useSelector((state: RootState) => state.venta);

    const { handleSubmit, errors, touched, getFieldProps, values } = useFormik<{ descripcion: string, cantidad: number, precio: number }>({
        initialValues: { descripcion: '', cantidad: 0.0, precio: 0.0 },
        onSubmit: (values) => {
            dispatch(agregarProductoNoRegistrado({
                cantidad: values.cantidad,
                producto: {
                    id: (detalles.length + 1).toString(),
                    codigo: (detalles.length + 1).toString(),
                    descripcion: values.descripcion,
                    precio: values.precio
                },
                total: values.cantidad * values.precio
            }));
            cerrarModal();
        },
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
                type="text"
                label="Descripción"
                placeholder="Describa el producto"
                className="form-control"
                {...getFieldProps('descripcion')}
                errors={(touched.descripcion && errors.descripcion) || ''}
            />
            <MyTextInput
                type="number"
                name="cantidad"
                label="Cantidad"
                placeholder="1.000"
                className="form-control"
                value={values.cantidad === 0 ? '' : values.cantidad}
                onChange={getFieldProps('cantidad').onChange}
                errors={(touched.cantidad && errors.cantidad) || ''}
            />
            <MyTextInput
                name="precio"
                label="Precio"
                placeholder="$0.00"
                className="form-control"
                value={values.precio === 0 ? '' : values.precio}
                onChange={getFieldProps('precio').onChange}
                errors={(touched.precio && errors.precio) || ''}
            />
            <button type="submit" className="btn btn-primary" >Agregar</button>
        </form>
    )
}

