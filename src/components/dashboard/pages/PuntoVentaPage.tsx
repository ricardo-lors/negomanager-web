import { useFormik } from "formik"
import { useForm } from "../../../hooks/useForm"
import * as Yup from 'yup';

export const PuntoVentaPage = () => {

    const { handleSubmit, errors, touched, getFieldProps } = useFormik({
        initialValues: { codigo: '' },
        onSubmit: (values) => {
            console.log(values)
        },
        validationSchema: Yup.object({
            codigo: Yup.string().required('Requerido')
        })
    });

    return (
        <div>
            {/* <div className="text-center mt-3">
                <h2>Punto de venta</h2>
            </div> */}
            <form className="container mt-4" noValidate onSubmit={handleSubmit}>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Codigos" {...getFieldProps('codigo')} />
                    <button type="submit" className="btn btn-primary" >Buscar</button>
                </div>
                {/* {touched.codigo && errors.codigo && <span>{errors.codigo}</span>} */}
            </form>

            {/* <div className="container"> */}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">precio</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Producto 1</th>
                        <th>Producto 1 Descripcion</th>
                        <th>20.0</th>
                        <th>20.0</th>
                        {/* <th scope="row">2</th> */}
                    </tr>
                </tbody>
            </table>
            {/* </div> */}

            {/* <form noValidate onSubmit={handleSubmit}>
                <label htmlFor='firstName'>First Name</label>
                <input type="text" {...getFieldProps('firstName')} />
                {touched.firstName && errors.firstName && <span>{errors.firstName}</span>}

                <label htmlFor='lastName'>Last Name</label>
                <input type="text" {...getFieldProps('lastName')} />
                {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}

                <label htmlFor='email'>Email</label>
                <input type="text" {...getFieldProps('email')} />
                {touched.email && errors.email && <span>{errors.email}</span>}
                <button type='submit' >Submit</button>
            </form> */}

        </div>
    )
}
