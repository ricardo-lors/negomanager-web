import * as Yup from 'yup';

export const useForm = (formJson: any) => {

    const initialValues: { [key: string]: any } = {};
    const requiredFields: { [key: string]: any } = {}

    for (const input of formJson) {
        initialValues[input.name] = input.value;

        if (!input.validations) continue;

        let schema = Yup.string()

        for (const rule of input.validations) {
            if (rule.type === 'required') {
                schema = schema.required('Este campo es requerido');
            }

            if (rule.type === 'minLength') {
                schema = schema.min((rule as any).value || 2, `Mínimo de ${(rule as any).value || 2} caracteres`);
            }

            if (rule.type === 'email') {
                schema = schema.email(`Revise el formato del email`);
            }
        }

        requiredFields[input.name] = schema;
    }

    const validationSchema = Yup.object({ ...requiredFields });

    return { initialValues, requiredFields, validationSchema };
}
