
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <nav className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'>
            <div className='position-sticky pt-3 sidebar-sticky'>
                <ul className='nav flex-column'>
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
                </ul>
            </div>
        </nav >
    )
}


/*
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