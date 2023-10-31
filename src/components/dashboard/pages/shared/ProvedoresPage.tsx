import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../hooks";
import { RootState } from "../../../../store";
import { useEffect } from 'react';
import { useFormik } from "formik";
import { Provedor } from "../../../../interfaces";

import * as Yup from 'yup';
import { MyTextInput } from "../../../shared/MyTextInput";
import { crearProvedor } from "../../../../store/slices/provedor";

export const ProvedoresPage = () => {

  const dispatch = useAppDispatch();

  const { usuario } = useSelector((state: RootState) => state.usuario);
  const { provedores } = useSelector((state: RootState) => state.provedor);

  const { handleSubmit, errors, touched, getFieldProps } = useFormik<Provedor>({
    initialValues: {
      nombre: '',
      descripcion: '',
      correo: '',
      telefono: ''
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

      <div className="col-md-3 border-end h-100">
        <div className="text-center">
          <h2>Provedores</h2>
        </div>
        <form className="container mt-4" noValidate onSubmit={handleSubmit}>
          <MyTextInput
            label="Nombre"
            className='form-control'
            {...getFieldProps('nombre')}
          />
          <MyTextInput
            label='Descripcion'
            className='form-control'
            {...getFieldProps('descripcion')}
          />
          <MyTextInput
            label='Correo'
            className='form-control'
            {...getFieldProps('correo')}
          />
          <MyTextInput
            label='Telefono'
            className='form-control'
            {...getFieldProps('telefono')}
          />
          <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>
        </form>
      </div>
      <div className="col" style={{ overflow: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Correo</th>
              <th scope="col">Telefono</th>
              <th scope="col">Activo</th>
            </tr>
          </thead>
          <tbody>
            {
              provedores.map(pb => <tr key={pb.id}>
                <th>{pb.nombre}</th>
                <th>{pb.descripcion}</th>
                <th>{pb.correo}</th>
                <th>{pb.telefono}</th>
                <th>{pb.activo ? 'SI' : 'NO'}</th>
                {/* <th><div style={{ backgroundColor: st.color, maxWidth: 100, color: 'white' }}  >{st.color}</div></th> */}
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div >
  )
}
