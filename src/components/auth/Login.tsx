import { Link } from "react-router-dom";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from "../shared/MyTextInput";
import { sesion } from "../../store/slices/usuario";
import { useAppDispatch } from "../../hooks/index";
import { UsuarioLogin } from "../../interfaces";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { comenzarCambioTema } from "../../store/slices/ui";
import { RootState } from "../../store";

export const Login = () => {

    const dispatch = useAppDispatch();

    const { darkMode } = useSelector((state: RootState) => state.ui);

    const { handleSubmit, errors, touched, getFieldProps } = useFormik<UsuarioLogin>({
        initialValues: {
            correo: '',
            contrasena: ''
        },
        onSubmit: (values) => dispatch(sesion(values)),
        validationSchema: Yup.object({
            correo: Yup.string().required('El correo es requerido'),
            contrasena: Yup.string().required('La contraseña es requerida'),

        })
    });

    const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
        const darkMode = e.target.checked;
        dispatch(comenzarCambioTema(darkMode));
    }

    return (
        <div>
            <div className="">
                <div className="form-check form-switch">
                    <i className="bi bi-moon-fill"></i>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked={darkMode ? true : false}
                        onChange={onChangeTheme} />
                    <label className="form-check-label" >Modo Oscuro</label>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                {/* <div className="w-100 mb-auto">
                <img src="/logo1.jpg" alt="" height={50} width={50} />
            </div> */}
                <section className="card d-flex flex-column justify-content-center w-75 w-lg-50" >
                    <div className="px-lg-5 p-4 w-100 align-self-center">
                        <h1 className="text-center">PuntoVPro</h1>
                        <h3 className="">Bienvenido</h3>
                        <hr className="mb-4" />

                        <form className="container mt-4" noValidate onSubmit={handleSubmit}>

                            <MyTextInput
                                label="Correo"
                                placeholder="correo@example.com"
                                className="form-control"
                                {...getFieldProps('correo')}
                                errors={touched.correo && errors.correo && errors.correo || ''}
                            />

                            <MyTextInput
                                type="password"
                                label="Contraseña"
                                className="form-control"
                                {...getFieldProps('contrasena')}
                                errors={touched.contrasena && errors.contrasena && errors.contrasena || ''}
                            />

                            <button type="submit" className="btn btn-primary text-decoration-none w-100">Iniciar</button>

                        </form>

                        {/* <p className="text-center text-muted">O inicie session</p>
                    <div className="d-flex justify-content-around">
                        <button className="btn btn-outline-light flex-grow-1 me-2"><i className="bi bi-google lead me-2"></i> Google</button>
                        <button className="btn btn-outline-light flex-grow-1 ms-2"><i className="bi bi-facebook lead me-2"></i> Facebook</button>
                    </div> */}
                    </div>
                    <div className="text-center px-lg-5 pt-lg-3 pb-lg-4 p-4 w-100 mt-auto">
                        <p className="d-inline-block mb-0">¿Todavia no tienes una cuenta?</p> <Link to="register" className="text-muted text-decoration-none">Crea una ahora</Link>
                    </div>

                </section >
            </div>
        </div>
    )
};

{/* 

<Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                const cred = { correo: values.correo, contrasena: values.contrasena };
                                dispatch(sesion(cred));
                            }}
                        >
                            {(formik) => (
                                <Form noValidate>
                                    {formJson.map(({ type, name, placeholder, label }) => {

                                        if (type === 'input' || type === 'password' || type === 'email') {
                                            return (<div key={name} className="mb-3">
                                                <MyTextInput
                                                    className="form-control form-control-focus bg-dark-x border-0 text-dark"
                                                    type={(type as any)}
                                                    name={name}
                                                    label={label}
                                                    placeholder={placeholder} />
                                            </div>);
                                        }

                                        throw new Error(`El type: ${type}, no es soportado`);
                                    })}

                                    <button type="submit" className="btn btn-primary text-decoration-none w-100">Iniciar</button>

                                </Form>
                            )}
                        </Formik>

<form className="mb-5">
<div className="mb-3">
    <label className="form-label font-weight-bold">Correo</label>
    <input type="email" className="form-control form-control-focus bg-dark-x border-0 text-light" placeholder="Ingresa tu correo"></input>
</div>
<div className="mb-3">
    <label className="form-label font-weight-bold">Contraseña</label>
    <input type="password" className="form-control form-control-focus bg-dark-x border-0 text-light mb-3" placeholder="Ingresa tu contraseña"></input>
    <Link to="#" className="form-text text-muted text-decoration-none" >¿Has olvidado tu contraseña?</Link>
</div>
<button type="submit" className="btn btn-primary text-decoration-none w-100">Iniciar</button>
</form> */}


// [
//     {
//         "type": "input",
//         "name": "firstName",
//         "placeholder": "Fernando",
//         "label": "First Name",
//         "value": "",
//         "validations": [
//             {
//                 "type": "required"
//             },
//             {
//                 "type": "minLength",
//                 "value": 5
//             }
//         ]
//     },
//     {
//         "type": "input",
//         "name": "lastName",
//         "placeholder": "Herrera",
//         "label": "Last Name",
//         "value": "",
//         "validations": [
//             {
//                 "type": "required"
//             }
//         ]
//     },
//     {
//         "type": "email",
//         "name": "email",
//         "placeholder": "fernando@google.com",
//         "label": "Email",
//         "value": "",
//         "validations": [
//             {
//                 "type": "required"
//             },
//             {
//                 "type": "email"
//             }
//         ]
//     },
//     {
//         "type": "select",
//         "name": "favoriteGame",
//         "label": "Favorite Game",
//         "value": "",
//         "options": [
//             {
//                 "id": 1,
//                 "label": "Super Smash"
//             },
//             {
//                 "id": 2,
//                 "label": "Metal Gear"
//             },
//             {
//                 "id": 3,
//                 "label": "Resident Evil"
//             }
//         ],
//         "validations": [
//             {
//                 "type": "required"
//             }
//         ]
//     }
// ]


// else if (type === 'select') {
//     return (
//         <MySelect
//             key={name}
//             label={label}
//             name={name}
//         >
//             <option value="">Select an option</option>
//             {
//                 options?.map(({ id, label }) => (
//                     <option key={id} value={id}>{label}</option>
//                 ))
//             }
//         </MySelect>
//     )
// }