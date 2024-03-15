import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { useFormik } from 'formik';
import { Almacen } from '../../../../interfaces';

export const HomePage = () => {

    const { usuario } = useSelector((state: RootState) => state.sesion);


    const { handleSubmit, errors, touched, getFieldProps, resetForm, setValues } = useFormik({
        initialValues: {
            almacen: (usuario?.almacen as Almacen)?.id
        },
        onSubmit: async (values) => {

        },
        // validationSchema: Yup.object({
        //     nombre: Yup.string().required('Nombre es nesesario'),
        //     contrasena: Yup.string().min(6, 'La contraseña debe tener mas de 6 caracteres')
        // })
    });

    return (
        <div>
            <div className='container-fluid rounded border mt-5' style={{
                // backgroundColor: '#B5CC18',
                // boxShadow: '60px -16px ',
                boxShadow: 'var(--bs-box-shadow)!important'
            }}>
                <h1>{usuario?.negocio?.nombre}</h1>
                <h4>{usuario?.negocio?.descripcion}</h4>
                {
                    usuario!.rol === 'administrador' &&
                    <h1>Total Actual en negocio: {usuario?.negocio?.caja}</h1>
                }
            </div>

            <hr />
            <div className='container-fluid rounded border' style={{
                // boxShadow: var(--bs-box-shadow) 
            }}>
                {/* <h2>{usuario?.almacen?.nombre}</h2> */}
                {

                }

            </div>

            <hr />
            <div className='row'>
                {/* <h3> {usuario?.caja?.nombre} </h3>
                <h4>${usuario?.caja?.dinero}</h4> */}

                listar todos los movimientos de la caja
            </div>

        </div>
    )
}


// Paleta Vibrante:

// Colores: #FF5733 (Naranja), #33FF57 (Verde lima), #3366FF (Azul eléctrico), #FF33A1 (Rosa), #FFFF33 (Amarillo brillante).
// Paleta Profesional:

// Colores: #35424A (Gris azulado), #4D758B (Azul acero), #8C9FA3 (Gris claro), #E7E7E7 (Blanco hueso), #F26C4F (Naranja suave).
// Paleta Moderna:

// Colores: #2E86AB (Azul profundo), #F7DB4F (Amarillo mostaza), #D63AF9 (Morado vibrante), #4CAF50 (Verde esmeralda), #FF5A5F (Rojo coral).
// Paleta Neutra:

// Colores: #333333 (Gris oscuro), #666666 (Gris medio), #999999 (Gris claro), #DDDDDD (Gris muy claro), #FFFFFF (Blanco).
// Paleta de Contraste Alto:

// Colores: #232323 (Negro), #FFD700 (Amarillo oro), #006400 (Verde oscuro), #8B0000 (Rojo oscuro), #FFFFFF (Blanco)





// Paleta Bootstrap Predeterminada:

// Utiliza los colores predeterminados de Bootstrap, como el azul (#007BFF), el gris (#6C757D), el verde (#28A745), y el rojo (#DC3545). Puedes complementar estos colores con tonos más claros o más oscuros según sea necesario.
// Paleta Azul-Verde:

// Colores: #007BFF (Azul Bootstrap), #4CAF50 (Verde), #E7F3F0 (Gris claro), #FFFFFF (Blanco), #343A40 (Gris oscuro).
// Paleta Naranja-Verde:

// Colores: #FFA500 (Naranja), #28A745 (Verde Bootstrap), #F8F9FA (Gris muy claro), #FFFFFF (Blanco), #495057 (Gris).
// Paleta Azul-Gris Claro:

// Colores: #007BFF (Azul Bootstrap), #CED4DA (Gris claro Bootstrap), #FFFFFF (Blanco), #6C757D (Gris medio Bootstrap), #343A40 (Gris oscuro).
// Paleta Gris-Verde Oliva:

// Colores: #6C757D (Gris medio Bootstrap), #808E9B (Gris azulado), #B5CC18 (Verde oliva), #FFFFFF (Blanco), #495057 (Gris).