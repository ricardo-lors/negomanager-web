import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../hooks";
import { RootState } from "../../../../store";
import { useEffect } from 'react';
import { useFormik } from "formik";
import { NuevoProvedor, Provedor } from "../../../../interfaces";

import * as Yup from 'yup';
import { MyTextInput } from "../../../shared/MyTextInput";
import { crearProvedor } from "../../../../store/slices/provedor";

export const ProvedoresPage = () => {

  const dispatch = useAppDispatch();

  const { usuario } = useSelector((state: RootState) => state.usuario);
  const { provedores } = useSelector((state: RootState) => state.provedor);

  useEffect(() => {
    // negocio.id && dispatch(obtenerCategorias(negocio.id));
  }, []);

  const { handleSubmit, errors, touched, getFieldProps } = useFormik<NuevoProvedor>({
    initialValues: {
      nombre: '',
      negocio: usuario!.negocio!
    },
    onSubmit: async (values) => {
      console.log(values);
      dispatch(crearProvedor(values));
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nobre es requerido')
    })
  });

  return (
    <div className="row">
      <div className="text-center mt-3">
        <h2>Provedores</h2>
      </div>

      <form className="container mt-4" noValidate onSubmit={handleSubmit}>

        <MyTextInput
          label="Nombre"
          className='form-control'
          {...getFieldProps('nombre')}
        />

        <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>

      </form>

      <div className="">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {
              provedores.map(pb => <tr key={pb.id}>
                <th>{pb.nombre}</th>
                {/* <th><div style={{ backgroundColor: st.color, maxWidth: 100, color: 'white' }}  >{st.color}</div></th> */}
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div >
  )
}
