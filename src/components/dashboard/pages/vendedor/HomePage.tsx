import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { useAppDispatch } from "../../../../hooks";
import { Cliente, DetallesVenta, NuevaVenta, Producto, UsuarioForm, VentaState } from "../../../../interfaces";
import { RootState } from "../../../../store";
import { obtenerProductoCodigo } from "../../../../store/slices/producto/thuncks";

import * as Yup from 'yup';
import { FormikHelpers, useFormik } from "formik";
import Swal from "sweetalert2";
import { crearVenta } from "../../../../store/slices/venta";
import { Modal, MySelect, Ticket } from "../../../shared";
import { crearUsuario, obtenerUsuarios } from "../../../../store/slices/usuario";
import { FormularioAgregarUsuarios } from "../../../shared/FormularioAgregarUsuarios";


export const HomePage = () => {

  const dispatch = useAppDispatch();

  const ticket = useRef<HTMLDivElement>(null);

  // const { negocio } = useSelector((state: RootState) => state.negocio);
  const { usuario } = useSelector((state: RootState) => state.usuario);
  // const { clientes } = useSelector((state: RootState) => state.cliente);

  const handleImprimirTicket = useReactToPrint({
    content: () => ticket.current!
  });

  const [state, setState] = useState<VentaState>({
    detalles: [],
    total: 0.0
  });

  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [agregarCliente, setAgregarCliente] = useState<boolean>(false);

  useEffect(() => {
    // negocio.id && dispatch(obtenerProductosNegocio(negocio.id))
    // obtenerUsuarios(usuario!.negocio!.id, 'cliente').then(resp => {
    //   console.log(resp)
    //   setClientes(resp ? resp : []);
    // });
  }, [usuario]);

  const { handleSubmit: handleSubmitSearch, errors: errorsSearch, touched: touchedSearch, getFieldProps: getFieldPropsSearch, resetForm: resetFormSearch } = useFormik({
    initialValues: { codigo: '' },
    onSubmit: async (values) => {
      const producto = await obtenerProductoCodigo(values.codigo, usuario?.negocio!.id!);
      if (producto) addProducto(producto);
      resetFormSearch();
    },
    validationSchema: Yup.object({
      codigo: Yup.string().required('Requerido')
    })
  });

  const { handleSubmit: handleSubmitConfirm, errors: errorsConfirm, touched: touchedConfirm, getFieldProps: getFieldPropsConfirm, resetForm: resetFormConfirm } = useFormik({
    initialValues: { pago: 0, clienteid: '' },
    onSubmit: async (values) => {

      if (state.total > values.pago) return Swal.fire('Pago Insuficiente', 'El Pago no cubre el total de la venta', 'warning');

      const nuevaVenta: NuevaVenta = {
        total: state.total,
        pago: +values.pago,
        cambio: values.pago - state.total,
        // vendedor: usuario!.id,
        comprador: values.clienteid,
        // negocio: usuario!.negocio!.id,
        detalles: state.detalles
      }
      console.log(nuevaVenta)
      await crearVenta(nuevaVenta);
      handleImprimirTicket();
      setState({ detalles: [], total: 0.0 });
    },
    validationSchema: Yup.object({
      pago: Yup.string().required('EL dato es requerido'),
      clienteid: Yup.string()
        // .notOneOf(['0'], 'Esta opcion no esta permitida')
        .required('Requerido'),
    })
  });

  const addProducto = (producto: Producto) => {
    console.log(producto)
    const index = state.detalles.findIndex(prod => prod.producto.id === producto.id);
    if (index >= 0) {
      state.detalles[index].cantidad = state.detalles[index].cantidad + 1;
      state.detalles[index].total = state.detalles[index].producto.precio * state.detalles[index].cantidad;
      const total = sumaTotal(state.detalles);
      setState(prev => ({ detalles: [...state.detalles], total }));
    } else {
      const detalles: DetallesVenta = {
        cantidad: 1,
        total: producto.precio,
        producto: {
          id: producto.id!,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          stock: producto.stock,
          codigo: producto.codigo,
          precio: producto.precio,
          costo: producto.costo,
          categorias: producto.categorias
        }
      };
      const newDetallesList = [...state.detalles, detalles];
      const total = sumaTotal(newDetallesList);
      console.log(total);
      setState({ detalles: newDetallesList, total });
    }
  }

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
    if (cantidad > state.detalles[i].producto.stock) {
      Swal.fire('Sin Stock', '', 'warning');
      return;
    }
    state.detalles[i].cantidad = cantidad;
    state.detalles[i].total = state.detalles[i].producto.precio * cantidad;
    const total = sumaTotal(state.detalles);
    setState({ detalles: [...state.detalles], total });
  }

  const onFocus = (e: FormEvent<HTMLInputElement>) => e.currentTarget.select();


  const onSubmit: (values: UsuarioForm, formikHelpers: FormikHelpers<UsuarioForm>) => void | Promise<any> = async (values) => {
    console.log(values);
    dispatch(crearUsuario({
      nombre: values.nombre,
      contrasena: values.contrasena,
      correo: values.correo,
      roles: values.roles,
      negocio: values.negocio
    }));
  };

  return (
    <div className="container vh-100">
      {/* <div className="text-center mt-3">
              <h2>Punto de venta</h2>
          </div> */}
      <form className="pt-3" noValidate onSubmit={handleSubmitSearch}>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Codigo" {...getFieldPropsSearch('codigo')} />
          <button type="submit" className="btn btn-primary" >Buscar</button>
        </div>
        {touchedSearch.codigo && errorsSearch.codigo && <span className="text-danger">{errorsSearch.codigo}</span>}
      </form>
      <div className="container border h-50 overflow-auto mt-3">
        <table className="table">
          {/* style={{height: 300}} */}
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {
              state.detalles.map((st, i) => <tr key={st.producto.id}>
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
          <h2>Total: {state.total}</h2>
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
              <button type="submit" className="btn btn-primary" onClick={() => setAgregarCliente(true)}>Agregar Cliente</button>
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
      <Ticket ref={ticket} venta={state} />
      <Modal
        isOpen={agregarCliente}
        children={<FormularioAgregarUsuarios rol={['cliente']} submit={onSubmit} />}
        onRequestClose={() => setAgregarCliente(false)}
      />
    </div>
  )
}
