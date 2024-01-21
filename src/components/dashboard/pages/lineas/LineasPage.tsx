import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../hooks";
import { Categoria } from "../../../../interfaces";
import { RootState } from "../../../../store";
import { crearCategoria, obtenerCategorias } from "../../../../store/slices/categoria/categoriaThuncks";
import * as Yup from 'yup';
import { MySelect } from "../../../shared/MySelect";
import { MyTextInput } from "../../../shared/MyTextInput";

export const LineasPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.sesion);
    const { categorias } = useSelector((state: RootState) => state.categoria);

    // useEffect(() => {
    //     usuario?.negocio && dispatch(obtenerCategorias(usuario.negocio.id));
    // }, []);

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<Categoria>({
        initialValues: {
            nombre: ''
        },
        onSubmit: async (values) => {
            console.log(values)
            dispatch(crearCategoria(values));
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nobre es requerido')
        })
    });

    return (
        <div className="row">

            <div className="col-md-3 border-end h-100 mb-3">

                <form className="container mt-4" noValidate onSubmit={handleSubmit}>

                    <MyTextInput
                        label="Nombre"
                        className='form-control'
                        {...getFieldProps('nombre')}
                    />

                    <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>

                </form>
            </div>
            <div className="col">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorias.map(st => <tr key={st.id}>
                                <th>{st.nombre}</th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* <div className="text-center mt-3">
                <h2>Categorias</h2>
            </div> */}
        </div >
    )
}