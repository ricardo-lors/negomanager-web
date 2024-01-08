import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { UsuarioNuevo, Usuario } from "../../../../interfaces";
import * as Yup from 'yup';
import { actualizarUsuario, buscarUsuarios, crearUsuario } from "../../../../store/slices/usuario";
import { useFormik } from "formik";
import { MySelect, MyTextInput } from "../../../shared";
import { Tabla } from "../../../shared/Tabla";
import { RootState } from "../../../../store";
import { ColumnDef } from "@tanstack/react-table";
import { useAppDispatch } from "../../../../hooks";

import permisos from "../../../../resource/permisos.json";
import { obtenerAlmacenes } from "../../../../store/slices/almacen";

export const VendedoresPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.sesion);
    const { almacenes } = useSelector((state: RootState) => state.almacen);

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario>();

    useEffect(() => {
        buscarUsuarios({
            roles: ['{vendedor}']
        }).then(listaUsuarios => {
            setUsuarios(listaUsuarios);
        });
    }, [dispatch, usuario]);

    const { handleSubmit, getFieldProps, resetForm, setValues } = useFormik<UsuarioNuevo>({
        initialValues: {
            nombre: '',
            correo: '',
            telefono: '',
            contrasena: '',
            contrasenaRepeat: '',
            almacen: '',
            permisos: [],
            roles: ['vendedor']
        },
        onSubmit: async (values) => {
            // onSubmit(values, elper);

            if (!usuarioSeleccionado) {
                const nuevoUsuario = await crearUsuario({
                    nombre: values.nombre,
                    correo: values.correo,
                    telefono: values.telefono,
                    contrasena: values.contrasena,
                    almacen: values.almacen,
                    permisos: values.permisos,
                    roles: values.roles
                });
                nuevoUsuario && setUsuarios([nuevoUsuario, ...usuarios]);
            } else {
                const usuarioActualizado = await actualizarUsuario(usuarioSeleccionado.id!, {
                    nombre: values.nombre,
                    correo: values.correo,
                    telefono: values.telefono,
                    contrasena: values.contrasena,
                    almacen: values.almacen,
                    permisos: values.permisos,
                    roles: values.roles
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
            <div className="col-3 border-end vh-100">
                <div className="text-center">
                    <h2>Vendedores</h2>
                </div>
                <form className="container mt-2" noValidate onSubmit={handleSubmit}>

                    <MyTextInput
                        label="Nombre"
                        placeholder='Nombre de la persona'
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
                        usuario?.roles.includes('administrador') &&
                        < MySelect
                            label="Sucursal"
                            className="form-control"
                            {...getFieldProps('sucursal')}
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
                        usuario?.roles.includes('administrador') && <MySelect
                            label="Permisos"
                            className="form-control"
                            multiple={true}
                            {...getFieldProps('permisos')}
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
            <div className="col-9">
                <Tabla
                    data={usuarios}
                    columns={columnasUsuarios}
                    seleccionado={usuarioSeleccionado?.id}
                    onClickFila={
                        (us: Usuario) => {
                            if (us.id !== usuarioSeleccionado?.id) {
                                setUsuarioSeleccionado(us);
                                console.log(us)
                                setValues({
                                    nombre: us.nombre,
                                    correo: us.correo,
                                    telefono: us.telefono,
                                    contrasena: '',
                                    contrasenaRepeat: '',
                                    almacen: us.almacen ? us.almacen.id : '',
                                    permisos: us.permisos,
                                    roles: ['vendedor']
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
                                    roles: ['vendedor']
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
