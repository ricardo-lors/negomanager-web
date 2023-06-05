import { ErrorMessage } from 'formik';

interface Props {
    name: string;
    label: string;
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    style?: React.CSSProperties | undefined;
    className?: string;
    [x: string]: any;
}

export const MyCheckbox = ({ label, checked, onChange, name, style, ...props }: Props) => {

    return (
        <div className='form-check' style={style}>
            <input
                type='checkbox'
                className='form-check-input'
                checked={checked}
                onChange={onChange}
                name={name}
            />
            <label className='form-check-label'>
                {label}
            </label>
        </div>
    )
}