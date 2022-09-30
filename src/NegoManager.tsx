
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './hooks';
import { AppRouter } from './routes/AppRouter';

import { RootState } from './store';
import { revalidarSesion } from './store/slices/usuario';


export const NegoManager = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(revalidarSesion())
    }, [dispatch]);

    const { cargando } = useSelector((state: RootState) => state.usuario);

    if (cargando) {
        return <h2>Cargando</h2>
    }

    return (
        <>
            <AppRouter />
        </>
    )
}
