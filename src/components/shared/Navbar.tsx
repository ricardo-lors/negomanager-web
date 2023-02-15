import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../hooks"
import { RootState } from "../../store"
import { startOpenAndCloseMenu } from "../../store/slices/ui"

export const Navbar = () => {

    const dispatch = useAppDispatch();

    const { negocio } = useSelector((state: RootState) => state.negocio);
    const { openMenu } = useSelector((state: RootState) => state.ui);

    const handleMenu = () => {
        dispatch(startOpenAndCloseMenu(!openMenu));
    }

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <Link to='/' className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" >{negocio?.nombre ? negocio.nombre : "NegoManager"}</Link>
            {/* <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    {/* //<a className="nav-link px-3" href="#">Sign out</a> */}
                    <button className="btn" type="button" onClick={handleMenu}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <Link to='/login' className="btn" replace><span className="navbar-toggler-icon"></span></Link> */}
                </div>
            </div>
        </header>
    )
}
