import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../hooks"
import { RootState } from "../../store"
import { obtenerCategorias } from "../../store/slices/categoria/categoriaThuncks"
import { obtenerProvedoresNegocio } from "../../store/slices/provedor"
// import { obtenerCategorias } from "../../store/slices/categoria/thuncks"
// import { obtenerClientes } from "../../store/slices/cliente/thuncks"
// import { obtenerNegocio } from "../../store/slices/negocio/thuncks"
// import { obtenerProvedoresNegocio } from "../../store/slices/provedor"
// import { obtenerUsuarios } from "../../store/slices/usuario"
import { Navbar } from "../shared/Navbar"
import { Sidebar } from "../shared/Sidebar"
import { Administrador } from "./pages/administrador/Administrador"
import { SuperAdministrador } from "./pages/superadministrador/SuperAdministrador"
import { Vendedor } from "./pages/vendedor/Vendedor"
import { useFormik } from "formik"
import { Turno } from "../../interfaces"
import { MyTextInput } from "../shared"
import { crearTurno } from "../../store/slices/usuario"
// import { DashboardRoutes } from "./routes/DashboardRoutes"

export const DashboardPage = () => {

    const { usuario } = useSelector((state: RootState) => state.usuario);

    const dispatch = useAppDispatch();

    useEffect(() => {
        usuario?.negocio && !usuario?.roles.includes('super-administrador') && dispatch(obtenerCategorias(usuario?.negocio!.id));
        usuario?.negocio && !usuario?.roles.includes('super-administrador') && dispatch(obtenerProvedoresNegocio(usuario?.negocio!.id));
        // usuario?.negocio && dispatch(obtenerClientes(usuario?.negocio!.id));
        // usuario?.negocio && dispatch(obtenerUsuarios(usuario?.negocio!.id));
    }, [dispatch]);

    const { cargando: cargandoNegocio } = useSelector((state: RootState) => state.negocio);
    const { cargando: cargandoCategoria } = useSelector((state: RootState) => state.categoria);
    const { cargando: cargandoProvedor } = useSelector((state: RootState) => state.provedor);
    const { cargando: cargandoClientes } = useSelector((state: RootState) => state.cliente);


    const { handleSubmit, errors, touched, getFieldProps } = useFormik<Turno>({
        initialValues: {
            caja: 0
        },
        onSubmit: (values) => {
            dispatch(crearTurno({
                caja: +values.caja
            }));
        },
        // validationSchema: Yup.object({
        //     nombre: Yup.string().required('Requerido'),
        //     correo: Yup.string().required('Requerido'),
        //     contrasena: Yup.string().required('Requerido'), 
        //     contrasenaRepeat: Yup.string().required('Requerido'),
        //     // TODO: Validar que ambas contraseñas sean iguales
        // })
    });

    if (usuario?.turno === null) {
        return (
            <>
                <h2>Formulario Abrir turno</h2>
                <form className="container mt-4" noValidate onSubmit={handleSubmit}>

                    <MyTextInput
                        label="Caja"
                        placeholder='Cantidad que tiene en caja'
                        className="form-control"
                        {...getFieldProps('caja')}
                    />
                    <button type="submit" className="btn btn-primary text-decoration-none w-100">Crear</button>

                </form>
            </>
        );
    }

    return (
        <>
            {
                cargandoNegocio || cargandoCategoria || cargandoProvedor || cargandoClientes
                    ? <div className='d-flex justify-content-center align-items-center vh-100'>
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    : <>
                        <Navbar />
                        <div className="container-fluid">
                            <Sidebar />
                            {
                                usuario?.roles.includes('super-administrador')
                                    ? <SuperAdministrador />
                                    : usuario?.roles.includes('administrador')
                                        ? <Administrador />
                                        : <Vendedor />
                            }
                        </div>
                    </>
            }
        </>
    )
}
