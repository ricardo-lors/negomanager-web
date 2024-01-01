import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { FormularioUsuario, Almacen, Usuario } from "../../../../interfaces";
import * as Yup from 'yup';
import { actualizarUsuario, buscarUsuarios, crearUsuario } from "../../../../store/slices/usuario";
import { useFormik } from "formik";
import { MySelect, MyTextInput } from "../../../shared";
import { Tabla } from "../../../shared/Tabla";
import { RootState } from "../../../../store";
import { ColumnDef } from "@tanstack/react-table";
import { useAppDispatch } from "../../../../hooks";
import { obtenerAlmacen } from "../../../../store/slices/almacen";

export const ClientesPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.usuario);

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario>();

    useEffect(() => {
        buscarUsuarios({
            roles: ['{cliente}']
        }).then(listaUsuarios => {
            setUsuarios(listaUsuarios);
        });
        dispatch(obtenerAlmacen({}));
    }, [usuario]);

    const { handleSubmit, values, errors, touched, getFieldProps, resetForm, setValues } = useFormik<FormularioUsuario>({
        initialValues: {
            nombre: '',
            correo: '',
            telefono: '',
            contrasena: '',
            contrasenaRepeat: '',
            sucursal: '',
            roles: ['cliente']
        },
        onSubmit: async (values) => {
            // onSubmit(values, elper);

            if (!usuarioSeleccionado) {
                const nuevoUsuario = await crearUsuario({
                    nombre: values.nombre,
                    correo: values.correo,
                    telefono: values.telefono,
                    contrasena: values.contrasena,
                    sucursal: values.sucursal,
                    roles: values.roles
                });
                nuevoUsuario && setUsuarios([nuevoUsuario, ...usuarios]);
            } else {
                const usuarioActualizado = await actualizarUsuario(usuarioSeleccionado.id!, {
                    nombre: values.nombre,
                    correo: values.correo,
                    telefono: values.telefono,
                    contrasena: values.contrasena,
                    sucursal: values.sucursal,
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
                cell: info => info.row.original.sucursal?.nombre,
                header: () => <span>Telefono</span>,
            },
        ], [usuarios]
    );

    return (
        <div className="row">
            <div className="col-3 border-end vh-100">
                <div className="text-center">
                    <h2>Clientes</h2>
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
                                setValues({
                                    nombre: us.nombre,
                                    correo: us.correo,
                                    telefono: us.telefono,
                                    contrasena: '',
                                    contrasenaRepeat: '',
                                    sucursal: us.sucursal ? us.sucursal.id : '',
                                    roles: ['cliente']
                                });
                            } else {
                                setUsuarioSeleccionado(undefined);
                                setValues({
                                    nombre: '',
                                    correo: '',
                                    telefono: '',
                                    contrasena: '',
                                    contrasenaRepeat: '',
                                    sucursal: '',
                                    roles: ['cliente']
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
