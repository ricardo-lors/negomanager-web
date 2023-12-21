import { AppDispatch } from "../../store";
import { cambiarThemaApp, openAndCloseMenu } from "./uiSlice";

export const startOpenAndCloseMenu = (state: boolean) => {
    return async (dispatch: AppDispatch) => {
        dispatch(openAndCloseMenu(state));
    }
};
export const comenzarCambioTema = (darkMode: boolean) => {
    return async (dispatch: AppDispatch) => {

        const html = document.getElementById('htmlprin');

        if (darkMode) {
            html?.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html?.setAttribute('data-bs-theme', 'ligth');
            localStorage.setItem('theme', 'ligth');
        }

        dispatch(cambiarThemaApp(darkMode));
    }
}