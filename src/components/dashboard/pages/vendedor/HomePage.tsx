import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { useAppDispatch } from "../../../../hooks";
import { Cliente, DetallesVenta, NuevaVenta, Usuario, VentaState } from "../../../../interfaces";
import { RootState } from "../../../../store";
import { obtenerProductoCodigo } from "../../../../store/slices/producto/productoThuncks";

import * as Yup from 'yup';
import { FormikHelpers, useFormik } from "formik";
import Swal from "sweetalert2";
import { agregarProducto, cambiarCantidad, crearVenta, resetear } from "../../../../store/slices/venta";
import { Modal, MySelect, Ticket } from "../../../shared";
import { crearUsuario, obtenerUsuarios } from "../../../../store/slices/usuario";


export const HomePage = () => {

  const dispatch = useAppDispatch();

  const ticket = useRef<HTMLDivElement>(null);

  const { usuario } = useSelector((state: RootState) => state.usuario);
  const { detalles, total } = useSelector((state: RootState) => state.venta);

  const handleImprimirTicket = useReactToPrint({
    content: () => ticket.current!
  });

  const [clientes, setClientes] = useState<Usuario[]>([]);

  const [agregarCliente, setAgregarCliente] = useState<boolean>(false);

  useEffect(() => {
    obtenerUsuarios(usuario!.negocio!.id, 'cliente').then(resp => {
      setClientes(resp ? resp : []);
    });
  }, [usuario]);

  const { handleSubmit: handleSubmitSearch, errors: errorsSearch, touched: touchedSearch, getFieldProps: getFieldPropsSearch, resetForm: resetFormSearch } = useFormik({
    initialValues: { codigo: '' },
    onSubmit: async (values) => {
      const producto = await obtenerProductoCodigo(values.codigo, usuario?.negocio!.id!);
      if (producto) dispatch(agregarProducto(producto));
      resetFormSearch();
    },
    validationSchema: Yup.object({
      codigo: Yup.string().required('Requerido')
    })
  });

  const { handleSubmit: handleSubmitConfirm, errors: errorsConfirm, touched: touchedConfirm, getFieldProps: getFieldPropsConfirm, resetForm: resetFormConfirm } = useFormik({
    initialValues: { pago: 0, clienteid: '' },
    onSubmit: async (values) => {

      const nuevaVenta: NuevaVenta = {
        total: total,
        pago: +values.pago,
        cambio: values.pago - total,
        comprador: values.clienteid,
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
      clienteid: Yup.string()
        // .notOneOf(['0'], 'Esta opcion no esta permitida')
        .required('Requerido'),
    })
  });


  const sumaTotal = (detalles: DetallesVenta[]): number => {
    let total: number = 0;
    detalles.map((det) => {
      total = total + Number(det.total);
    });
    return total;
  }

  const agregarPorTabla = (e: FormEvent<HTMLInputElement>, i: number) => {
    const cantidad = +e.currentTarget.value;
    if (cantidad < 1) return;
    if (cantidad > detalles[i].producto.stock) {
      Swal.fire('Sin Stock', '', 'warning');
      return;
    }
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
      {/* <div className="text-center mt-3">
              <h2>Punto de venta</h2>
          </div> */}
      {/* <div className="d-grid gap-2 d-md-block">
        <button className="btn btn-primary" type="button"><i className="bi bi-bag-plus-fill"></i> Agregar varios</button>
        <button className="btn btn-primary" type="button">Button</button>
      </div> */}
      <div className="btn-group mb-2" role="group" aria-label="Basic example">
        {/* <button type="button" className="btn btn-primary"><i className="bi bi-bag-plus-fill"></i> Agregar varios</button> */}
        <button type="button" className="btn btn-primary"><i className="bi bi-bag-plus-fill"></i> Agregar P. no Registrado</button>
        <button type="button" className="btn btn-primary"><i className="bi bi-search"></i> Buscar</button>
      </div>
      <form className=" " noValidate onSubmit={handleSubmitSearch}>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Codigo" {...getFieldPropsSearch('codigo')} />
          <button type="submit" className="btn btn-primary" >Agregar</button>
        </div>
        {touchedSearch.codigo && errorsSearch.codigo && <span className="text-danger">{errorsSearch.codigo}</span>}
      </form>
      <div className="container border h-50 overflow-auto mt-3">
        <table className="table">
          {/* style={{height: 300}} */}
          <thead>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
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
                <th>{st.producto.nombre}</th>
                <th>{st.producto.descripcion}</th>
                <th>{st.producto.precio}</th>
                <th><input className="form-control" onFocus={onFocus} onChange={(e) => agregarPorTabla(e, i)} type="number" value={st.cantidad} /></th>
                <th>{st.total}</th>
              </tr>)
            }
          </tbody>
        </table>
      </div>
      <div className="row mt-2">
        <div className="col">
          <h2>Total: {total}</h2>
          <form noValidate onSubmit={handleSubmitConfirm}>
            <div className="input-group mb-3">
              <MySelect
                label="Cliente"
                className="form-select"
                simple={true}
                {...getFieldPropsConfirm('clienteid')}
              // errors={touchedConfirm.clienteid && errorsConfirm.clienteid ? errorsConfirm.clienteid : undefined}
              >
                {/* <option value={0}>Seleccione una opcion</option> */}
                {
                  clientes?.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                  ))
                }
              </MySelect>
              {/* <button className="btn btn-primary" onClick={() => setAgregarCliente(true)}>Agregar Cliente</button> */}
            </div>
            <span className="text-danger">{touchedConfirm.clienteid && errorsConfirm.clienteid ? errorsConfirm.clienteid : undefined}</span>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Pago" {...getFieldPropsConfirm('pago')} />
              <button type="submit" className="btn btn-primary" >Generar Compra</button>
            </div>
            {touchedConfirm.pago && errorsConfirm.pago && <span className="text-danger">{errorsConfirm.pago}</span>}
          </form>
        </div>
      </div>
      <Ticket ref={ticket} venta={{ detalles, total }} />
      {/* <Modal
        isOpen={agregarCliente}
        children={<FormularioAgregarUsuarios rol={['cliente']} submit={onSubmit} />}
        onRequestClose={() => setAgregarCliente(false)}
      /> */}
    </div>
  )
}
