import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, formatearNumero } from '../../../../../store';
import { useReactToPrint } from 'react-to-print';
import { obtenerProductos } from '../../../../../store/slices/producto';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TituloPagina } from '../../shared/TituloPagina';
import { Almacen, QueryParamsProducto } from '../../../../../interfaces';
import { handleObtenerProductos } from '../../../../../store/slices/inventario';

export const InventarioPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const productosList = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const almacen = location.state as Almacen;
  // console.log(almacen)
  const handleimprimirProductosList = useReactToPrint({
    content: () => productosList.current,
    pageStyle: ''
  });

  const { usuario } = useSelector((state: RootState) => state.sesion);
  const { productos } = useSelector((state: RootState) => state.inventario);

  useEffect(() => {
    // take: 10
    usuario && dispatch(handleObtenerProductos({
      almacen: almacen.id
      // sucursal: usuario.sucursal ? usuario.sucursal.id : undefined,
      // negocio: usuario?.negocio?.id!
    }))
  }, [dispatch, usuario]);

  const { handleSubmit: handleSubmitSearch, errors: errorsSearch, touched: touchedSearch, getFieldProps: getFieldPropsSearch, resetForm: resetFormSearch, } = useFormik<QueryParamsProducto>({
    initialValues: { titulo: '' },
    onSubmit: async (values) => {
      console.log(values);
      // dispatch(obtenerProductosQuery(values.query));
      dispatch(handleObtenerProductos({
        titulo: values.titulo,
        almacen: almacen.id
      }));
      // resetFormSearch();
    },
    validationSchema: Yup.object({
      titulo: Yup.string().required('Requerido')
    }),

  });

  return (
    <div>
      <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></button>
      <div className="row mt-1">
        {/* <h2 className="text-center">INVENTARIO</h2> */}
        <TituloPagina centro='INVENTARIO' />
        <div className="col">
          {/* <button className="btn btn-primary" onClick={() => setState({ openModal: !openModal })}>Agregar</button>/admin/inventario/nuevo/producto */}
          {
            (usuario?.permisos?.includes('crear_producto') || usuario?.rol === 'administrador') &&
            <Link
              to={`/dashboard/almacenes/inventario/agregar`}
              className="btn btn-primary me-2"
              data-bs-toggle="tooltip" data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="This top tooltip is themed via CSS variables."
              // replace
              state={{ ...almacen }}
            >
              <i className="bi bi-plus-square" />
            </Link>
          }
          <button
            className="btn btn-primary"
            onClick={handleimprimirProductosList}
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="This top tooltip is themed via CSS variables."
          ><i className="bi bi-printer"></i></button>
        </div>
        <div className="col">
          <form onSubmit={handleSubmitSearch}>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Buscar..." {...getFieldPropsSearch('titulo')} />
              <button type="submit" className="btn btn-primary">Buscar</button>
            </div>
            {touchedSearch.titulo && errorsSearch.titulo && <span className="text-danger">{errorsSearch.titulo}</span>}
          </form>
        </div>
      </div>
      {
        productos.length !== 0
          ? <div ref={productosList} className="album py-2">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
              {
                productos.map(prod =>
                  <div key={prod.id} className="col">
                    <div className="card shadow-sm mb-2" style={{ height: 350 }}>
                      {prod.imagenes![0] && <img className="card-img-top" src={prod.imagenes![0].url} alt="" style={{ minHeight: '150px', maxHeight: '150px' }} />}
                      <div className="card-header">
                        CD: {prod.codigo}
                      </div>
                      <div className="card-body p-1 position-relative">{/* overflow-auto */}
                        <p className="card-text" >{prod.titulo}</p>
                        <p className="card-text position-absolute bottom-0 end-0 m-1" >{formatearNumero(prod.precio)}{prod.control ? `- Stock:${prod.stock}` : ''}</p>
                      </div>
                      <div className="card-footer p-1">
                        {/* <Link
                          to={`/dashboard/${usuario?.roles[0]}/producto/${prod.id}`}
                          className="btn btn-primary "
                          replace
                        ><i className="bi bi-pencil-square"></i></Link> */}
                        {
                          (usuario?.rol === 'administrador' || usuario?.permisos?.includes('editar_producto')) && <Link
                            to={`/dashboard/almacenes/inventario/${prod.id}`}
                            className="btn btn-primary "
                            replace
                          > <i className="bi bi-pencil-square"></i></Link>
                        }
                        {
                          (usuario?.rol === '' || prod.control && usuario?.permisos?.includes('modificar_inventario')) && <Link
                            to={`/dashboard/almacenes/inventario`}
                            state={prod}
                            className="btn btn-primary ms-1"
                          // replace
                          > <i className="bi bi-gear-wide-connected"></i></Link>
                        }
                      </div>
                    </div>
                  </div>
                )
              }
            </div >
          </div >
          : <div className="text-center">
            <hr />
            <h3>Sin Productos</h3>
            <h4>Agrege algunos</h4>
          </div>
      }
    </div >
  );
}
