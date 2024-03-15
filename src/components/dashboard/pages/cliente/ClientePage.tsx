import { useFormik } from 'formik'
import { useState } from 'react'
import { Button, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { Cliente } from '../../../../interfaces';
import { crearCliente } from '../../../../store/slices/cliente';
import { useAppDispatch } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';

export const ClientePage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [key, setKey] = useState('home');

    const { handleSubmit, getFieldProps, values } = useFormik<Cliente>({
        initialValues: {
            clave: '',
            activo: true,
            nombre: '',
            correo: '',
            curp: '',
            telefono: '',
            descuento: -1,
            rfc: '',
            // Campos de Direccion
            calle: '',
            numero_exterior: -1,
            numero_interior: -1,
            referencia: '',
            pais: '',
            codigo_postal: '',
            estado: '',
            municipio: '',
            colonia: '',
            // Campos de creditos
            credito: false,
            dias_credito: '',
            limite_credito: -1,
            saldo_actual: -1,
            credito_disponible: -1
        },
        onSubmit: (values) => {
            console.log(values)
            const adjustedValues = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [
                    key,
                    value === '' || value === -1 ? undefined : value,
                ])
            );
            console.log(adjustedValues);

            dispatch(crearCliente(adjustedValues as Cliente, navigate));
        }
    });

    return (
        <Form onSubmit={handleSubmit} style={{
            // height: '93vh'
        }} >
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k!)}
            >
                <Tab eventKey="home" title="Datos del Cliente" >
                    <h2>Datos Generales</h2>
                    <Row >
                        <Form.Group as={Col} md={2}>
                            <Form.Label>Identificador</Form.Label>
                            <Form.Control
                                {...getFieldProps('clave')}
                                placeholder='00001'
                            />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                {...getFieldProps('nombre')}
                                placeholder='Nombre Completo'
                            />
                        </Form.Group >
                        <Form.Group as={Col} >
                            <Form.Label>RFC</Form.Label>
                            <Form.Control
                                {...getFieldProps('rfc')}
                                placeholder='XAXX0101010101'
                            />
                        </Form.Group >
                        {/* <Form.Group as={Col} className="mb-3" >
                <Form.Check type="checkbox" {...getFieldProps('activo')} checked={values.activo} label="Activo" />
            </Form.Group> */}
                    </Row>
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                {...getFieldProps('correo')}
                                placeholder=''
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                {...getFieldProps('telefono')}
                                placeholder=''
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>CURP</Form.Label>
                            <Form.Control
                                {...getFieldProps('curp')}
                                placeholder=''
                            />
                        </Form.Group>
                    </Row>
                    {/* <div className='container'> */}
                    <h2>Direccion</h2>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Calle</Form.Label>
                            <Form.Control
                                {...getFieldProps('calle')}
                                placeholder='Nombre de la Calle'
                            />
                        </Form.Group>
                        <Form.Group as={Col} md={2} >
                            <Form.Label>No. Exterior</Form.Label>
                            <Form.Control
                                {...getFieldProps('numero_exterior')}
                                type='number'
                                placeholder='0'
                                value={values.numero_exterior === -1 ? '' : values.numero_exterior}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md={2}>
                            <Form.Label>No. Interior</Form.Label>
                            <Form.Control
                                {...getFieldProps('numero_interior')}
                                type='number'
                                placeholder='0'
                                value={values.numero_interior === -1 ? '' : values.numero_interior}
                            // value={}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Referencia</Form.Label>
                            <Form.Control
                                {...getFieldProps('referencia')}
                                placeholder=''
                            />
                        </Form.Group>
                        <Form.Group as={Col} md={3}>
                            <Form.Label>Pais</Form.Label>
                            <Form.Control
                                {...getFieldProps('pais')}
                                placeholder=''
                            />
                        </Form.Group>
                        <Form.Group as={Col} md={2}>
                            <Form.Label>C.P.</Form.Label>
                            <Form.Control
                                {...getFieldProps('codigo_postal')}
                                placeholder=''
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                {...getFieldProps('estado')}
                                placeholder=''
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Municipio</Form.Label>
                            <Form.Control
                                {...getFieldProps('municipio')}
                                placeholder=''
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Colonia</Form.Label>
                            <Form.Control
                                {...getFieldProps('colonia')}
                                placeholder=''
                            />
                        </Form.Group>
                    </Row>
                    {/* </div> */}

                </Tab>
                <Tab eventKey="profile" title="Credito">
                    {/* Contenido de la pestaña Profile */}
                    <Form.Group as={Col} className="mb-3" >
                        <Form.Check type="checkbox" {...getFieldProps('credito')} checked={values.credito} label="Tiene Credito" />
                    </Form.Group>
                    {/* credito: false,
            dias_credito: '',
            limite_credito: 0,
            saldo_actual: 0,
            credito_disponible: 0, */}
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>Limite de credito</Form.Label>
                            <Form.Control
                                {...getFieldProps('limite_credito')}
                                placeholder=''
                                value={values.numero_exterior === -1 ? '' : values.numero_exterior}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Saldo Actual</Form.Label>
                            <Form.Control
                                {...getFieldProps('saldo_actual')}
                                placeholder=''
                                value={values.numero_exterior === -1 ? '' : values.numero_exterior}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Credito Disponible</Form.Label>
                            <Form.Control
                                {...getFieldProps('credito_disponible')}
                                placeholder=''
                                value={values.numero_exterior === -1 ? '' : values.numero_exterior}
                            />
                        </Form.Group>
                    </Row>
                    <div className='container-fluid border p-2 mt-2 bg-body-secondary'>
                        <h2>Ultimo Pago</h2>
                        {/* //TODO: Verirficar Informacion */}
                        {/* fecha */}
                        {/* Monto */}
                        {/* Movimiento */}
                    </div>

                </Tab>
            </Tabs>
            <div className='container'>
                <Button variant="primary" type="submit" className='' style={{
                    position: 'fixed',
                    bottom: '15px',
                    right: '15px'
                }}>
                    Guardar
                </Button>
            </div>
        </Form>
    )
}
