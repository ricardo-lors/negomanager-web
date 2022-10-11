import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../hooks";
import { Categoria } from "../../../interfaces";
import { RootState } from "../../../store";
import { crearCategoria, obtenerCategorias } from "../../../store/slices/categoria/thuncks";
import * as Yup from 'yup';
import { MySelect } from "../../shared/MySelect";
import { MyTextInput } from "../../shared/MyTextInput";

export const CategoriasPage = () => {

    const dispatch = useAppDispatch();

    const { negocio } = useSelector((state: RootState) => state.negocio);
    const { categorias } = useSelector((state: RootState) => state.categoria);

    useEffect(() => {
        // negocio.id && dispatch(obtenerCategorias(negocio.id));
    }, []);

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<Categoria>({
        initialValues: {
            nombre: '',
            color: '#1D29EA',
            negocioid: negocio.id || 0
        },
        onSubmit: async (values) => {
            dispatch(crearCategoria(values));
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nobre es requerido')
        })
    });

    return (
        <div className="row">
            <div className="text-center mt-3">
                <h2>Categorias</h2>
            </div>

            <form className="container mt-4" noValidate onSubmit={handleSubmit}>

                <MyTextInput
                    label="Nombre"
                    className='form-control'
                    {...getFieldProps('nombre')}
                />

                <div className="mb-3">
                    <label className="form-label">Color</label>
                    <input type="color" className="form-control form-control-color w-100" {...getFieldProps('color')} title="Choose your color" />
                    {/* value="#563d7c"  */}
                </div>

                <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>

            </form>

            <div className="">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorias.map(st => <tr key={st.id}>
                                <th>{st.nombre}</th>
                                <th><div style={{ backgroundColor: st.color, maxWidth: 100, color: 'white' }}  >{st.color}</div></th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}
