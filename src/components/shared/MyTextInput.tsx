import { ErrorMessage, useField } from 'formik';

interface Props {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    classNameLabel?: string;
    [x: string]: any;
}


export const MyTextInput = ({ label, classNameLabel, ...props }: Props) => {

    const [field] = useField(props)

    return (
        <>
            <label className={classNameLabel} htmlFor={props.id || props.name}>{label}</label>
            <input {...field} {...props} />
            <ErrorMessage name={props.name} component="span" />
        </>
    )
}