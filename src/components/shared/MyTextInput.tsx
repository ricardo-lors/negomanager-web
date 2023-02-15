import { FormikErrors } from "formik";

interface Props {
    type?: 'text' | 'email' | 'password' | 'number';
    name: string;
    label?: string;
    errors?: FormikErrors<string>;
    placeholder?: string;
    [x: string]: any;
}

export const MyTextInput = ({ label, errors, ...props }: Props) => {
    return (
        <div className="mb-2">
            {label ?? <label className='form-label' htmlFor={props.id || props.name}>{label}</label>}
            <input  {...props} />
            <span className="text-danger">{errors}</span>
        </div>
    )
}