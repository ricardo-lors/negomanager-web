
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../../hooks";
import { RootState } from "../../../../../store";
import * as Yup from 'yup';
import { Linea } from "../../../../../interfaces/Linea.interface";
import { ColumnDef } from "@tanstack/react-table";
import { TituloPagina } from "../../shared/TituloPagina";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { Formik, FormikHelpers } from "formik";
import { Tabla } from "../../../../shared/Tabla";
import { useEffect, useMemo } from "react";
import { crearLinea, obtenerLineas } from "../../../../../store/slices/linea";


const initialValues: Linea = {
    clave: '',
    descripcion: ''
}

export const LineasPage = () => {

    const dispatch = useAppDispatch();

    const { lineas } = useSelector((state: RootState) => state.linea);

    useEffect(() => {
        dispatch(obtenerLineas());
        // return () => {
        //   second
        // }
    }, [])

    const columnasLineas = useMemo<ColumnDef<Linea>[]>(
        () => [
            {
                accessorKey: 'clave',
                cell: info => info.getValue(),
                header: () => <span>Clave</span>,
            },
            {
                accessorKey: 'descripcion',
                cell: info => info.getValue(),
                header: () => <span>Descripcion</span>,
            }
        ], [lineas]
    );

    const handleSubmit = (values: Linea, formikHelpers: FormikHelpers<Linea>) => dispatch(crearLinea(values));
    return (
        <div>
            <TituloPagina centro="LINEAS" />
            <Row>
                <Col md={4} className="bg-body-secondary ms-md-2 me-md-2 p-3" style={{ height: '89vh' }}>
                    <Container className=" p-2" fluid>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            {({ handleSubmit, getFieldProps }) => <Form onSubmit={handleSubmit}>
                                <fieldset>
                                    <legend>Nueva Linea</legend>
                                    <Form.Group>
                                        <Form.Label>Clave</Form.Label>
                                        <Form.Control {...getFieldProps('clave')} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control {...getFieldProps('descripcion')} />
                                    </Form.Group>
                                </fieldset>
                                <div className="d-grid gap-2 mt-3">
                                    <Button variant="primary" type="submit" >
                                        Guardar
                                    </Button>
                                </div>
                            </Form>
                            }
                        </Formik>
                    </Container>
                </Col>
                <Col className="bg-body-secondary me-2 pt-2" >
                    <Tabla
                        columns={columnasLineas}
                        data={lineas}
                    />
                </Col>
            </Row>

        </div>
    )
}