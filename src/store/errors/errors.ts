import { AxiosError } from "axios";
import Swal from "sweetalert2";


export const getMeesageError = (error: unknown): string => {
    if (error instanceof AxiosError) {
        if(error.code === 'ERR_NETWORK') return 'Sin conexión a internet'
    } else {
        console.log('Unexpected error', error);
    }
    console.log(error);
    return 'Error no identificado';
}