import { FormikErrors } from "formik";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    errors?: FormikErrors<string>;
    multiple?: boolean;
    simple?: boolean;
    [x: string]: any;
}


export const MySelect = ({ label, errors, multiple = false, simple = false, ...props }: Props) => {

    // const [field] = useField(props) {...field}

    if (simple) return (
        <select className="form-select" {...props} aria-label={label}>
        </select>
    )

    return (
        <div className="mb-2">
            {label ?? <label className='form-label' htmlFor={props.id || props.name}>{label}</label>}
            <select  {...props} multiple={multiple} />
            <span className="text-danger">{errors}</span>
        </div>
    )
}