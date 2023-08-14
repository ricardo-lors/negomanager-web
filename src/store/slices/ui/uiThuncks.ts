import { AppDispatch } from "../../store";
import { openAndCloseMenu } from "./uiSlice";

export const startOpenAndCloseMenu = (state: boolean) => {
    return async (dispatch: AppDispatch) => {
        dispatch(openAndCloseMenu(state));
    }
};
