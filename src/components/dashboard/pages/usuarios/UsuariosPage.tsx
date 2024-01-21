
import { useEffect, useState, useMemo, SyntheticEvent, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { UsuarioNuevo, Almacen, Usuario } from "../../../../interfaces";
import * as Yup from 'yup';
import { actualizarUsuario, buscarUsuarios, crearUsuario } from "../../../../store/slices/usuario";
import { useFormik } from "formik";
import { MySelect, MyTextInput } from "../../../shared";
import { Tabla } from "../../../shared/Tabla";
import { RootState } from "../../../../store";
import { ColumnDef } from "@tanstack/react-table";
import { useAppDispatch } from "../../../../hooks";
import { obtenerAlmacenes } from "../../../../store/slices/almacen";


import permisos from "../../../../resource/permisos.json";
import { obtenerCajas } from "../../../../store/slices/caja";

export const UsuariosPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.sesion);
    const { almacenes } = useSelector((state: RootState) => state.almacen);
    const { cajas } = useSelector((state: RootState) => state.caja);

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario>();

    useEffect(() => {
        buscarUsuarios({
            // rol: 'vendedor'
            // rol: ''
        }).then(listaUsuarios => {
            setUsuarios(listaUsuarios);
        });
    }, [dispatch, usuario]);

    const { handleSubmit, getFieldProps, resetForm, setValues, setFieldValue, values } = useFormik<UsuarioNuevo>({
        initialValues: {
            nombre: '',
            correo: '',
            telefono: '',
            contrasena: '',
            contrasenaRepeat: '',
            almacen: '',
            permisos: [],
            caja: '',
            // Administrador, (gerente, encargado),  Cajero, Vendedor
            rol: ''
        },
        onSubmit: async (values) => {
            console.log(values);
            // onSubmit(values, elper);
            if (!usuarioSeleccionado) {
                const nuevoUsuario = await crearUsuario({
                    nombre: values.nombre,
                    correo: values.correo,
                    telefono: values.telefono,
                    contrasena: values.contrasena,
                    caja: values.caja,
                    almacen: values.almacen,
                    permisos: values.permisos,
                    rol: values.rol
                });
                nuevoUsuario && setUsuarios([nuevoUsuario, ...usuarios]);
            }
            else {
                const usuarioActualizado = await actualizarUsuario(usuarioSeleccionado.id!, {
                    nombre: values.nombre,
                    correo: values.correo,
                    telefono: values.telefono,
                    contrasena: values.contrasena,
                    almacen: values.almacen,
                    caja: values.caja,
                    permisos: values.permisos,
                    rol: values.rol
                });
                usuarioActualizado && setUsuarios([usuarioActualizado, ...usuarios.filter(sc => sc.id !== usuarioActualizado?.id)]);
            }
            resetForm();
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Requerido'),
            correo: Yup.string().required('Requerido'),
            // contrasena: Yup.string().required('Requerido'),
            // contrasenaRepeat: Yup.string().required('Requerido'),
            // TODO: Validar que ambas contraseñas sean iguales
        })
    });

    const columnasUsuarios = useMemo<ColumnDef<Usuario>[]>(
        () => [
            {
                id: 'nombre',
                accessorKey: 'nombre',
                cell: info => info.getValue(),
                header: () => <span>Nombre</span>,
                // footer: props => props.column.id,
            },
            {
                id: 'rol',
                accessorKey: 'rol',
                cell: info => info.getValue(),
                header: () => <span>Rol</span>,
                // footer: props => props.column.id,
            }, {
                id: 'correo',
                accessorKey: 'correo',
                cell: info => info.getValue(),
                header: () => <span>Correo</span>,
            }, {
                id: 'telefono',
                accessorKey: 'telefono',
                cell: info => info.getValue(),
                header: () => <span>Telefono</span>,
            }, {
                id: 'sucursal',
                cell: info => info.row.original.almacen?.nombre,
                header: () => <span>Sucursal</span>,
            },
        ], [usuarios]
    );

    return (
        <div className="row">
            <div className="col-4 border-end vh-100">
                <div className="text-center">
                    <h2>Usuarios</h2>
                </div>
                <form className="container mt-2" noValidate onSubmit={handleSubmit}>
                    <MyTextInput
                        label="Nombre"
                        placeholder='Nombre completo'
                        className="form-control"
                        {...getFieldProps('nombre')}
                    />

                    <MyTextInput
                        label="Correo"
                        placeholder='Correo electronico'
                        className="form-control"
                        {...getFieldProps('correo')}
                    />

                    <MyTextInput
                        label="Telefono"
                        placeholder='Numero de telefono'
                        className="form-control"
                        {...getFieldProps('telefono')}
                    />
                    {
                        usuario?.rol === 'administrador' && <MySelect
                            {...getFieldProps('rol')}
                            label="Rol"
                            className="form-control"
                        >
                            <option value={''}>Seleccione un Rol</option>
                            {
                                ['gerente', 'cajero', 'vendedor'].map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))
                            }
                        </MySelect>
                    }
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
                            disabled={values.rol === 'gerente'}
                        >
                            <option value={''}>Seleccione una Caja</option>
                            {
                                cajas.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                                ))
                            }
                        </MySelect>
                    }
                    {
                        usuario?.rol === 'administrador' && <MySelect
                            {...getFieldProps('permisos')}
                            label="Permisos"
                            className="form-control"
                            multiple={true}
                        >
                            {
                                permisos?.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))
                            }
                        </MySelect>
                    }
                    <MyTextInput
                        label="Contraseña"
                        placeholder='Ingrese una contraseña'
                        className="form-control"
                        type='password'
                        {...getFieldProps('contrasena')}
                    />

                    <MyTextInput
                        label="Repetir contraseña"
                        placeholder='Repita la contraseña'
                        className="form-control"
                        type='password'
                        {...getFieldProps('contrasenaRepeat')}
                    />
                    <button type="submit" className="btn btn-primary text-decoration-none w-100">Agregar</button>

                </form>
            </div>
            <div className="col-8">
                <Tabla
                    data={usuarios}
                    columns={columnasUsuarios}
                    seleccionado={usuarioSeleccionado?.id}
                    onClickFila={
                        (us: Usuario) => {
                            if (us.id !== usuarioSeleccionado?.id) {
                                dispatch(obtenerCajas({
                                    almacen: us.almacen!.id
                                }));
                                setUsuarioSeleccionado(us);
                                console.log(us)
                                setValues({
                                    nombre: us.nombre,
                                    correo: us.correo,
                                    telefono: us.telefono,
                                    contrasena: '',
                                    contrasenaRepeat: '',
                                    almacen: us.almacen ? us.almacen.id : '',
                                    caja: us.caja ? us.caja.id : '',
                                    permisos: us.permisos,
                                    rol: us.rol
                                    // roles: ['vendedor']
                                });
                            } else {
                                setUsuarioSeleccionado(undefined);
                                setValues({
                                    nombre: '',
                                    correo: '',
                                    telefono: '',
                                    contrasena: '',
                                    contrasenaRepeat: '',
                                    almacen: '',
                                    permisos: [],
                                    rol: 'administrador'
                                    // roles: ['vendedor']
                                });
                            }
                        }
                    }
                />
                {/* <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Sucursal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios?.map(st => st.roles.includes('vendedor') && <tr key={st.id}>
                                <th>{st.nombre}</th>
                                <th>{st.correo}</th>
                                <th>{st.telefono}</th>
                                <th>{st.sucursal?.nombre}</th>
                            </tr>)
                        }
                    </tbody>
                </table> */}
            </div>
        </div>
    )
}