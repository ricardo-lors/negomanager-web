
import { Form, Formik } from "formik";
import { MySelect, MyTextInput } from "./";
import formJson from "./../../resource/forms/usuario-form.json";

import * as Yup from 'yup';

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {};

for (const input of formJson) {
    initialValues[input.name] = input.value;

    if (!input.validation) continue;

    let schema = Yup.string();

    for (const rule of input.validation) {
        if (rule.type === 'required') {
            schema = schema.required('Este campo es requrido');
        }

        if (rule.type === 'minLength') {
            schema = schema.min((rule as any).value || 2, `Minimo de ${(rule as any).value || 2} caracteres`);
        }

        if (rule.type === 'email') {
            schema = schema.email('Correo incorrecto');
        }

    }

    requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredFields });

export const DynamicForm = () => {
    return (
        <div>
            <h1>DynamicForm</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {(formik) => (
                    <Form>
                        {formJson.map(({ type, name, placeholder, label, options }) => {

                            if (type === "input" || type === "password" || type === "email") {
                                // return <MyTextInput key={name} type={(type as any)} label={label} name={name} />
                            } else if (type === "select") {
                                return <MySelect
                                    key={name}
                                    label={label}
                                    name={name}
                                >
                                    <option value={""}>Selet an optionm</option>
                                    {
                                        options?.map(opt => (
                                            <option key={opt.id} value={opt.id}>{opt.label}</option>
                                        ))
                                    }
                                </MySelect>
                            }

                            throw new Error(`El type: ${type}, no es soportado`)

                        })}

                        <button type="submit" >Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}