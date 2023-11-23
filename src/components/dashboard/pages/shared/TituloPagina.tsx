
interface tituloProps {
    izquierda?: string;
    centro?: string;
    derecha?: string
}


export const TituloPagina = (props: tituloProps) => {
    return (
        <div className='d-flex justify-content-between mt-0 p-0'>
            <div>{props.izquierda}</div>
            <div><h2>{props.centro}</h2></div>
            <div>{props.derecha}</div>
        </div>
    )
}
