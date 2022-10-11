import { FormikErrors } from "formik";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    errors?: FormikErrors<string>;
    [x: string]: any;
}


export const MySelect = ({ label, errors, ...props }: Props) => {

    // const [field] = useField(props) {...field}

    return (
        <div className="mb-2">
            {label ?? <label className='form-label' htmlFor={props.id || props.name}>{label}</label>}
            <select  {...props} />
            <span className="text-danger">{errors}</span>
        </div>
    )
}