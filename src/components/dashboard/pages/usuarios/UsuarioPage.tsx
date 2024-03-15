import { ErrorMessage, Field, FieldArray, FieldProps, Formik, FormikHelpers } from 'formik';
import { Button, Form, Row, Image, Col, Container } from 'react-bootstrap';
import { UsuarioNuevo } from '../../../../interfaces';

import * as Yup from 'yup';
import permisos from '../../../../resource/permisos.json';
import roles from '../../../../resource/roles.json';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { crearUsuario } from '../../../../store/slices/usuario';
import { useNavigate } from 'react-router-dom';

export const UsuarioPage = () => {

    const navigate = useNavigate();

    const { almacenes } = useSelector((state: RootState) => state.almacen);

    const { cajas } = useSelector((state: RootState) => state.caja);

    const handleSubmit = (values: UsuarioNuevo, { setSubmitting }: FormikHelpers<UsuarioNuevo>) => {
        // Lógica para manejar la presentación de los valores del formulario
        console.log(values);
        const adjustedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [
                key,
                value === '' || value === -1 ? undefined : value,
            ])
        );
        console.log(adjustedValues);
        const usuario = crearUsuario(adjustedValues as UsuarioNuevo, navigate);
        // Puedes realizar acciones asíncronas aquí, como enviar datos al servidor

        // Después de manejar la presentación, puedes restablecer el estado del formulario
        setSubmitting(false);
    };

    const initialValues: UsuarioNuevo = {
        nombre: '',
        correo: '',
        telefono: '',
        imagen: '',
        contrasena: '',
        contrasenaRepeat: '',
        almacen: '',
        caja: '',
        permisos: [],
        // Administrador, (gerente, encargainfo.row.original.almacendo),  Cajero, Vendedor
        rol: '',
        file: undefined
    }

    // 
    return (
        <div>
            <button className='btn btn-outline-secondary' onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></button>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={Yup.object({
                    nombre: Yup.string().required('Ingrese el nombre del usuario'),
                    correo: Yup.string().required('Ingrese el correo del usuario').email('Ingrese un correo valido'),
                    telefono: Yup.string(), //TODO: Verificar que el numero sea de 10 digitos
                    rol: Yup.string().required('Seleccione el rol del usuario'),
                    contrasena: Yup.string().required('Ingrese una contraseña').min(6, 'Debe tener almenos 6 caracteres'),
                })
                }
            >
                {({ values, getFieldProps, handleSubmit, setFieldValue }) => <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={3}>
                            <fieldset>
                                <legend>Foto</legend>
                                {
                                    values.file ? <div className='d-flex justify-content-center align-items-center'>
                                        <Image src={URL.createObjectURL(values.file)} thumbnail style={{ height: 210 }} />
                                    </div>
                                        : <div className='d-flex justify-content-center align-items-center'>
                                            <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png" thumbnail style={{ height: 210 }} />
                                        </div>
                                }
                                <Form.Group >
                                    <Form.Label>Seleccione una imagen:</Form.Label>
                                    <Field name="file">
                                        {({ field, form }: FieldProps) => (
                                            <Form.Control type="file"
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    form.setFieldValue('file', event.currentTarget.files?.[0] || null);
                                                }}
                                            />
                                        )}
                                    </Field>
                                </Form.Group>
                            </fieldset>
                        </Col>
                        <Col md={4}>
                            <fieldset>
                                <legend>Datos del Usuario</legend>
                                <Form.Group >
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        {...getFieldProps('nombre')}
                                    />
                                    <ErrorMessage name="nombre" component="div" className='text-danger' />
                                </Form.Group>
                                <Form.Group  >
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        {...getFieldProps('correo')}
                                    />
                                    <ErrorMessage name="correo" component="div" className='text-danger' />
                                </Form.Group>
                                <Form.Group  >
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        {...getFieldProps('telefono')}
                                    />
                                    <ErrorMessage name="telefono" component="div" className='text-danger' />
                                </Form.Group>
                                <Form.Group  >
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        {...getFieldProps('contrasena')}
                                        type='password'
                                    />
                                    <ErrorMessage name="contrasena" component="div" className='text-danger' />
                                </Form.Group>
                            </fieldset>
                        </Col>
                        <Col md={4}>
                            <fieldset>
                                <legend>Tipo de Usuario</legend>
                                <Form.Group  >
                                    <Form.Label>Rol</Form.Label>
                                    <Form.Select  {...getFieldProps('rol')} >
                                        <option value={''}>Seleccione un Rol</option>
                                        {
                                            roles.map(opt => (
                                                <option key={opt.valor} value={opt.valor}>{opt.nombre}</option>
                                            ))
                                        }
                                    </Form.Select>
                                    <ErrorMessage name="rol" component="div" className='text-danger' />
                                </Form.Group>
                                <Form.Group  >
                                    <Form.Label>Almacen</Form.Label>
                                    <Form.Select  {...getFieldProps('almacen')} >
                                        <option value={''}>Seleccione un Almacen</option>
                                        {
                                            almacenes.map(opt => (
                                                <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                                            ))
                                        }
                                    </Form.Select>
                                    <ErrorMessage name="almacen" component="div" className='text-danger' />
                                </Form.Group>
                                <Form.Group  >
                                    <Form.Label>Caja</Form.Label>
                                    <Form.Select  {...getFieldProps('caja')} >
                                        <option value={''}>Seleccione una Caja</option>
                                        {
                                            cajas.map(opt => (
                                                <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                                            ))
                                        }
                                    </Form.Select>
                                    <ErrorMessage name="caja" component="div" className='text-danger' />
                                </Form.Group>
                            </fieldset>
                        </Col>
                    </Row>
                    <Row>
                        <fieldset>
                            <legend>Permisos</legend>
                            <FieldArray
                                name="permisos"
                                render={() => (
                                    <Container>
                                        <Row>
                                            {
                                                permisos.map((permiso, i) => (
                                                    // controlId={permiso.valor}
                                                    <Col key={i} xs={12} sm={6} md={4} lg={3}>
                                                        <Form.Group key={i} >
                                                            <Form.Check
                                                                type="checkbox"
                                                                label={permiso.nombre}
                                                                checked={values.permisos?.includes(permiso.valor)}
                                                                onChange={() => {
                                                                    const nextValue = values.permisos?.includes(permiso.valor)
                                                                        ? values.permisos.filter((id) => id !== permiso.valor)
                                                                        : [...values.permisos!, permiso.valor];
                                                                    setFieldValue('permisos', nextValue);
                                                                }}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                ))
                                            }
                                        </Row>

                                    </Container>
                                )}
                            />
                            <ErrorMessage name="permisos" component="div" className='text-danger' />
                        </fieldset>
                    </Row>
                    <div className='container'>
                        <Button variant="primary" type="submit" className='' style={{
                            position: 'fixed',
                            bottom: '15px',
                            right: '15px'
                        }} >
                            Guardar
                        </Button>
                    </div>
                </Form>
                }
            </Formik >
        </div>
    )
}
