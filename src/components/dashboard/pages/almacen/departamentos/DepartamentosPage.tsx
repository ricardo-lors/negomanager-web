import { Formik, FormikHelpers } from "formik";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../../hooks";
import { Departamento } from "../../../../../interfaces";
import { RootState } from "../../../../../store";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { TituloPagina } from "../../shared/TituloPagina";
import { Tabla } from "../../../../shared/Tabla";
import { ColumnDef } from "@tanstack/react-table";
import { crearDepartamento, obtenerDepartamentos } from "../../../../../store/slices/departamento";


const initialValues: Departamento = {
  clave: '',
  descripcion: ''
}

export const DepartamentosPage = () => {

  const dispatch = useAppDispatch();

  const { departamentos } = useSelector((state: RootState) => state.departamento);

  useEffect(() => {
    dispatch(obtenerDepartamentos());
    // return () => {
    //   second
    // }
  }, [])


  const columnasDeparatamentos = useMemo<ColumnDef<Departamento>[]>(
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
    ], [departamentos]
  );

  const handleSubmit = (values: Departamento, formikHelpers: FormikHelpers<Departamento>) => dispatch(crearDepartamento(values));
  // dispatch(crearCategoria(values)
  return (
    <div>
      <TituloPagina centro="DEPARTAMETOS" />
      <Row>
        <Col md={4} className="bg-body-secondary ms-md-2 me-md-2 p-3" style={{ height: '89vh' }}>
          <Container className=" p-2" fluid>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, getFieldProps }) => <Form onSubmit={handleSubmit}>
                <fieldset>
                  <legend>Nuevo Departamento</legend>
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
            columns={columnasDeparatamentos}
            data={departamentos}
          />
        </Col>
      </Row>

    </div>
  )
}
