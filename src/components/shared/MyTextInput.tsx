import { FieldInputProps, FormikErrors } from "formik";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props {
    type?: 'text' | 'email' | 'password' | 'number';
    name: string;
    label?: string;
    value: string | number | readonly string[] | undefined;
    errors?: FormikErrors<string>;
    placeholder?: string;
    disabled?: boolean;
    [x: string]: any;
}

export const MyTextInput = ({ label, errors, value, ...props }: Props) => {
    return (
        <div className="mb-2">
            {label ?? <label className='form-label' htmlFor={props.id || props.name}>{label}</label>}
            <input value={(value !== undefined || value !== null) ? value : ''}  {...props} />
            <span className="text-danger">{errors}</span>
        </div>
    )
}