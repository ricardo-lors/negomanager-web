import { FormikErrors } from "formik";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    errors?: FormikErrors<string>;
    multiple?: boolean;
    [x: string]: any;
}


export const MySelect = ({ label, errors, multiple = false, ...props }: Props) => {

    // const [field] = useField(props) {...field}

    return (
        <div className="mb-2">
            {label ?? <label className='form-label' htmlFor={props.id || props.name}>{label}</label>}
            <select  {...props} multiple={multiple} />
            <span className="text-danger">{errors}</span>
        </div>
    )
}