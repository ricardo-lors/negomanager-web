import { useFormik } from 'formik'
import React, { ChangeEvent } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { MySelect, MyTextInput } from '../../../shared';
import { useAppDispatch } from '../../../../hooks';
import { crearAperturaCaja, obtenerCajas } from '../../../../store/slices/caja';

export const AperturaCaja = () => {

  const dispatch = useAppDispatch();

  const { usuario } = useSelector((state: RootState) => state.sesion);
  const { almacenes } = useSelector((state: RootState) => state.almacen);
  const { cajas } = useSelector((state: RootState) => state.caja);

  const { handleSubmit, getFieldProps, resetForm, setValues, setFieldValue, values } = useFormik({
    initialValues: {
      almacen: usuario?.almacen ? usuario.almacen.id : '',
      caja: usuario?.caja?.id ? usuario.caja.id : '',
      dinero_inicial: 0
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(crearAperturaCaja({
        ...values,
        dinero_inicial: +values.dinero_inicial
      }));
    }
  });

  return (
    <div>
      <form className="container mt-2" noValidate onSubmit={handleSubmit}>

        {
          usuario?.rol === 'administrador' &&
          < MySelect
            {...getFieldProps('almacen')}
            label="Almacen"
            className="form-control"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              dispatch(obtenerCajas({
                almacen: event.target.value
              }));
              setFieldValue('almacen', event.target.value)
            }}
          >
            <option value="">Seleccione una Sucursal</option>
            {
              almacenes?.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.nombre}</option>
              ))
            }
          </MySelect>
        }
        {
          <MySelect
            {...getFieldProps('caja')}
            label="Caja"
            className="form-control"
            disabled={usuario!.rol !== 'administrador' && usuario!.rol !== 'gerente'}
          >
            <option value={''}>Seleccione una Caja</option>
            {
              cajas.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.nombre}</option>
              ))
            }
          </MySelect>
        }

        <MyTextInput
          {...getFieldProps('dinero_inicial')}
          label="Dinero Inicial"
          placeholder='$0.00'
          className="form-control"
          value={values.dinero_inicial !== 0 ? values.dinero_inicial : ''}
        />
        <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>

      </form>
    </div>
  )
}
