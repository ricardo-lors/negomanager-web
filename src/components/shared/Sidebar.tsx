
import { NavLink, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import superadministradorRoutes from "../../resource/superadministrador.json";
import administradorRoutes from "../../resource/administrador.json";
import vendedorRoutes from "../../resource/vendedor.json"
import rutasJson from "../../resource/rutas.json"
import { useAppDispatch } from '../../hooks';
import { startOpenAndCloseMenu } from '../../store/slices/ui';
import { removerSesion } from '../../store/slices/session';
// import { r } from '../../store/slices/usuario';

export const Sidebar = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { usuario } = useSelector((state: RootState) => state.sesion);
    const { openMenu } = useSelector((state: RootState) => state.ui);

    const handleMenu = () => {
        dispatch(startOpenAndCloseMenu(!openMenu));
    }

    const handleCerrarSesion = () => {
        dispatch(startOpenAndCloseMenu(!openMenu));
        dispatch(removerSesion());
        navigate("/login", {
            replace: true
        })
    }

    const rutas = usuario?.rol === 'super-administrador'
        ? superadministradorRoutes
        : rutasJson;

    return (
        <div className={`offcanvas offcanvas-end ${openMenu ? 'show' : 'hide'} flex-shrink-0 pt-2 text-bg-dark`} tabIndex={-1} >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">{usuario?.negocio?.nombre ? usuario!.negocio!.nombre : "NegoManager"}</h5>
                <h5 className="offcanvas-title">{usuario?.almacen?.nombre ? usuario!.almacen!.nombre : "NegoManager"}</h5>
                <button type="button" className='btn btn-primary' onClick={handleMenu} ><i className="bi bi-x-lg"></i></button>
            </div>
            <hr className='m-0' />
            <div className="offcanvas-body">
                {/* <div> d-flex flex-column flex-shrink-0 p-3 text-bg-dark
                    Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
                </div> */}
                {/* <div className="dropdown mt-3">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Dropdown button
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div> */}
                <ul className='nav nav-pills flex-column mb-auto'>
                    {
                        rutas.map(rt => <li
                            key={rt.id}
                            className="nav-item" >
                            <NavLink className='nav-link text-white' to={rt.ruta} replace={rt.replace} onClick={handleMenu} end >
                                <i className={`bi ${rt.icono}`} ></i> {rt.nombre}
                            </NavLink>
                        </li>)
                    }
                </ul>
            </div>
            <hr />
            <div>
                <h5>{usuario?.nombre}</h5>
                <button className='btn text-white' onClick={handleCerrarSesion}>Cerrar Sesion</button>
            </div>
        </div>
    )
}


/*

        <nav id='sidebarMenu' className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>
            <div className='position-sticky pt-3 sidebar-sticky'>
                <ul className='nav flex-column'>
                    {
                        rutas.map(rt => <li
                            key={rt.id}
                            className="nav-item" >
                            <NavLink className='nav-link' to={rt.ruta} replace={rt.replace} >
                                <i className={`bi ${rt.icono}`} ></i> {rt.nombre}
                            </NavLink>
                        </li>)
                    }
                </ul>
            </div>
        </nav >

<li className='nav-item'>
                        <NavLink className='nav-link active' to='/dashboard' replace={true} >
                            <i className="bi bi-house-door"></i> Punto de Venta
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/dashboard/categorias' replace={true} >
                            <i className="bi bi-house-door"></i> Categorias
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/dashboard/clientes' replace={true} >
                            <i className="bi bi-house-door"></i> Clientes
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/dashboard/compras' replace={true} >
                            <i className="bi bi-house-door"></i> Compras
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/dashboard/inventario' replace={true} >
                            <i className="bi bi-house-door"></i> Inventario
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/dashboard/negocio' replace={true} >
                            <i className="bi bi-house-door"></i> Negocio
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/dashboard/productos' replace={true} >
                            <i className="bi bi-house-door"></i> Productos
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/dashboard/provedores' replace={true} >
                            <i className="bi bi-house-door"></i> Provedores
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/dashboard/ventas' replace={true} >
                            <i className="bi bi-house-door"></i> Ventas
                        </NavLink>
                    </li>



        <div className='offcanvas offcanvas-start bg-dark' tabIndex={-1} id='offcanvasExample' >
            <div className='offcanvas-header text-light'>
                <h5 className='offcanvas-title'>Title</h5>
                {/* {
                    online
                        ? <span className='text-primary'>online</span>
                        : <span className='text-dangger'>Ofline</span>
                } 
<button type='button' className='btn  text-reset' data-bs-dismiss='offcanvas' aria-label='Close'>
    <i className='bi bi-x-lg'></i>
</button>
            </div >
    <div className='offcanvas-body'>
        <ul className='nav nav-pills flex-column nav-fill'>
            <li className='nav-item' data-bs-dismiss='offcanvas'>
                <NavLink
                    to='/admin/inventario' replace={true}
                    className={({ isActive }) => 'nav-link mb-2  text-start ' + (isActive ? 'active' : '')}
                // onClick={() => handleCambioUbicacion('inventario')}
                >
                    <i className='bi bi-clipboard-fill me-2' ></i>
                    {/* <span className='d-none d-sm-inline'>Inventario</span> 
<span className=''>Inventario</span>
                </NavLink >
            </li >
            <li className='nav-item' data-bs-dismiss='offcanvas'>
                <NavLink
                    to='/admin/punto_venta'
                    replace={true}
                    className={({ isActive }) => 'nav-link mb-2 text-start ' + (isActive ? 'active' : '')}
                // onClick={() => handleCambioUbicacion('puntoVenta')}
                >
                    <i className='bi bi-clipboard-plus-fill me-2' ></i>
                    <span className=''>Punto de Venta</span>
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to='/admin/categorias' replace={true} className={({ isActive }) => 'nav-link mb-2 text-start ' + (isActive ? 'active' : '')}>
                    <i className='bi bi-tag-fill me-2' ></i>
                    <span className=''>Agregar Categoria </span>
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to='/admin/compras' replace={true} className={({ isActive }) => 'nav-link mb-2 text-start ' + (isActive ? 'active' : '')}>
                    <i className='bi-archive me-2' ></i>
                    <span className=''>Compras</span>
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink to='/admin/ventas' replace={true} className={({ isActive }) => 'nav-link mb-2 text-start ' + (isActive ? 'active' : '')}>
                    <i className='bi-boxes me-2' ></i>
                    <span className=''>Ventas</span>
                </NavLink>
            </li>
        </ul >
    </div >
        </div >
        */