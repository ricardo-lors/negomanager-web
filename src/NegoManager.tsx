
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './hooks';
import { AppRouter } from './routes/AppRouter';

import { RootState } from './store';
import { revalidarSesion } from './store/slices/usuario';


export const NegoManager = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('x-token')) {
            dispatch(revalidarSesion());
        }
    }, [dispatch]);

    const { cargando } = useSelector((state: RootState) => state.usuario);

    if (cargando) {
        return <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    return (
        <>
            <AppRouter />
        </>
    )
}
