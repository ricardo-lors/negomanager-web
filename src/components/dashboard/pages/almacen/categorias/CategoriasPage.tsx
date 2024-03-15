import { Formik, FormikHelpers, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../../hooks";
import { Categoria } from "../../../../../interfaces";
import { RootState } from "../../../../../store";
import { crearCategoria, obtenerCategorias } from "../../../../../store/slices/categoria/categoriaThuncks";
import * as Yup from 'yup';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { TituloPagina } from "../../shared/TituloPagina";
import { Tabla } from "../../../../shared/Tabla";
import { ColumnDef } from "@tanstack/react-table";


const initialValues: Categoria = {
    nombre: ""
}

export const CategoriasPage = () => {

    const dispatch = useAppDispatch();

    const { usuario } = useSelector((state: RootState) => state.sesion);
    const { categorias } = useSelector((state: RootState) => state.categoria);

    const columnaCategorias = useMemo<ColumnDef<Categoria>[]>(
        () => [
            {
                accessorKey: 'nombre',
                cell: info => info.getValue(),
                header: () => <span>Nombre</span>,
            }
        ], [categorias]
    );

    const handleSubmit = (values: Categoria, formikHelpers: FormikHelpers<Categoria>) => dispatch(crearCategoria(values));

    return (
        <div>
            <TituloPagina centro="CATEGORIAS" />
            <Row>
                <Col md={4} className="bg-body-secondary ms-md-2 me-md-2 p-3" style={{ height: '89vh' }}>
                    <Container className=" p-2" fluid>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            {({ handleSubmit, getFieldProps }) => <Form onSubmit={handleSubmit}>
                                <fieldset>
                                    <legend>Nueva Categoria</legend>
                                    <Form.Group>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control {...getFieldProps('nombre')} />
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
                        columns={columnaCategorias}
                        data={categorias}
                    />
                </Col>
            </Row>

        </div>
    )
}
