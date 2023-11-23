import { FormEvent, useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { useAppDispatch } from "../../../../hooks";
import { NuevaVenta } from "../../../../interfaces";
import { RootState, redondearNumero } from "../../../../store";
import { obtenerProductoCodigo } from "../../../../store/slices/producto/productoThuncks";

import * as Yup from 'yup';
import { useFormik } from "formik";
import { agregarProducto, cambiarCantidad, crearVenta, desasignarCliente, resetear } from "../../../../store/slices/venta";
import { Modal, MyButtonTooltip, Ticket } from "../../../shared";
import { ModalAgregarProductoNoRegistrado } from "./modals/ModalAgregarProductoNoRegistradoProps";
import { ModalAsignarCliente } from "./modals/ModalAsignarCliente";
import { Tooltip } from 'react-tooltip'

export const HomePage = () => {

  const dispatch = useAppDispatch();

  const ticket = useRef<HTMLDivElement>(null);

  const { usuario } = useSelector((state: RootState) => state.usuario);
  const { detalles, total, cliente } = useSelector((state: RootState) => state.venta);

  const [openModals, setOpenModals] = useState({
    modalAgregarProductoNoRegistrado: false,
    modalAgregarCliente: false,
  });

  const handleImprimirTicket = useReactToPrint({
    content: () => ticket.current!
  });

  useEffect(() => {
    if (cliente) setOpenModals(prev => ({ ...prev, modalAgregarCliente: false }));
    // return () => {
    // }
  }, [cliente])


  const { handleSubmit: handleSubmitSearch, errors: errorsSearch, touched: touchedSearch, getFieldProps: getFieldPropsSearch, resetForm: resetFormSearch } = useFormik({
    initialValues: { codigo: '' },
    onSubmit: async (values) => {
      const producto = await obtenerProductoCodigo(values.codigo, usuario?.sucursal!.id!, usuario?.negocio!.id!);
      if (producto) dispatch(agregarProducto(producto));
      resetFormSearch();
    },
    validationSchema: Yup.object({
      codigo: Yup.string().required('Requerido')
    })
  });

  const { handleSubmit: handleSubmitConfirm, errors: errorsConfirm, touched: touchedConfirm, getFieldProps: getFieldPropsConfirm, resetForm: resetFormConfirm } = useFormik({
    initialValues: { pago: 0 },
    onSubmit: async (values) => {
      const nuevaVenta: NuevaVenta = {
        total: total,
        pago: +values.pago,
        cambio: values.pago - total,
        cliente: cliente?.id,
        detalles: detalles
      }

      const creado = await crearVenta(nuevaVenta);
      if (creado) {
        handleImprimirTicket();
        dispatch(resetear());
      }
    },
    validationSchema: Yup.object({
      pago: Yup.string().required('EL dato es requerido'),
      // clienteid: Yup.string()
      // .notOneOf(['0'], 'Esta opcion no esta permitida')
      // .required('Requerido'),
    })
  });

  const agregarPorTabla = (e: FormEvent<HTMLInputElement>, i: number) => {
    const cantidad = +e.currentTarget.value;
    if (cantidad < 1) return;
    // if (cantidad > detalles[i].producto.stock!) {
    //   Swal.fire('Sin Stock', '', 'warning');
    //   return;
    // }
    dispatch(cambiarCantidad({ cantidad, index: i }));
  }

  const onFocus = (e: FormEvent<HTMLInputElement>) => e.currentTarget.select();

  // const onSubmit: (values: UsuarioForm, formikHelpers: FormikHelpers<UsuarioForm>) => void | Promise<any> = async (values) => {
  //   console.log(values);
  //   dispatch(crearUsuario({
  //     nombre: values.nombre,
  //     contrasena: values.contrasena,
  //     correo: values.correo,
  //     roles: values.roles,
  //     negocio: values.negocio
  //   }));
  // };

  return (
    <div className="container vh-100 pt-3">
      <div className="row mb-2">
        <div className="col-md-6">
          <button
            className="btn btn-primary me-1"
            data-tooltip-id="btn-agnore-tooltip"
            data-tooltip-content="Agregar producto no registrado"
            data-tooltip-place="right-end"
            onClick={() => setOpenModals(prev => ({ ...prev, modalAgregarProductoNoRegistrado: true }))} >
            <i className="bi bi-bag-plus-fill"></i> Agregar
          </button>
          <Tooltip id="btn-agnore-tooltip" />
          <button
            className="btn btn-primary"
            data-tooltip-id="btn-search-tooltip"
            data-tooltip-content="Buscar Producto"
            data-tooltip-place="right-end"
            onClick={() => setOpenModals(prev => ({ ...prev, modalAgregarProductoNoRegistrado: true }))} >
            <i className="bi bi-search"></i> Buscar
          </button>
          <Tooltip id="btn-search-tooltip" />
          {/*  */}
          {/* <p className="btn">{usuario?.attributos?.caja}</p> */}
        </div>
        <div className="col text-end">
          <h3>${usuario?.attributos?.caja ? redondearNumero(usuario?.attributos?.caja) : '0.0'}</h3>
        </div>
      </div>

      <form className="" noValidate onSubmit={handleSubmitSearch}>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Codigo" {...getFieldPropsSearch('codigo')} />
          <button type="submit" className="btn btn-primary" >Agregar</button>
        </div>
      </form>
      <div className="container border h-50 overflow-auto mt-2">
        <table className="table">
          {/* style={{height: 300}} */}
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {
              detalles.map((st, i) => <tr key={st.producto.id}>
                <th>{st.producto.codigo}</th>
                <th>{st.producto.titulo}</th>
                <th>{st.producto.precio}</th>
                <th><input className="form-control" onFocus={onFocus} onChange={(e) => agregarPorTabla(e, i)} type="number" value={st.cantidad} /></th>
                <th>{st.total}</th>
              </tr>)
            }
          </tbody>
        </table>
      </div>
      <div className="row text-end">
        <h2 className="text-end" >Total: {total}</h2>
        <h2 className="text-end" >Total: {redondearNumero(total)}</h2>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex align-items-center">
            {
              cliente ?
                <MyButtonTooltip
                  id='btn-asignar-cliente-tooltip'
                  content="Desasignar cliente de la venta "
                  place="top"
                  onClick={() => dispatch(desasignarCliente())}
                  children={<><i className="bi bi-person-lines-fill"></i> Desasignar</>}
                />
                : <MyButtonTooltip
                  id='btn-asign-tooltip'
                  content="Asignar cliente a la venta"
                  place="top"
                  onClick={() => setOpenModals(prev => ({ ...prev, modalAgregarCliente: true }))}
                  children={<><i className="bi bi-person-lines-fill"></i> Asignar</>}
                />
            }
            <h5 className="m-0 ms-2">Cliente: {cliente ? cliente.nombre : 'Publico General'}</h5>
          </div>
        </div>
        <div className="col">
          <form noValidate onSubmit={handleSubmitConfirm}>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Pago" {...getFieldPropsConfirm('pago')} />
              <button type="submit" className="btn btn-primary" >Generar Compra</button>
            </div>
            {touchedConfirm.pago && errorsConfirm.pago && <span className="text-danger">{errorsConfirm.pago}</span>}
          </form>
        </div>
      </div>
      <Ticket ref={ticket} venta={{ cliente, detalles, total }} />
      <Modal
        isOpen={openModals.modalAgregarProductoNoRegistrado}
        children={<ModalAgregarProductoNoRegistrado cerrarModal={() => { setOpenModals(prev => ({ ...prev, modalAgregarProductoNoRegistrado: false })) }} />}
        onRequestClose={() => setOpenModals(prev => ({ ...prev, modalAgregarProductoNoRegistrado: false }))}
        titulo={'Agregar Producto No Registrado'}
      />
      <Modal
        isOpen={openModals.modalAgregarCliente}
        children={<ModalAsignarCliente />}
        onRequestClose={() => setOpenModals(prev => ({ ...prev, modalAgregarCliente: false }))}
        titulo={'Asignar un cliente'}
      />
    </div>
  )
}
