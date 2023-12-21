import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface uiState {
    openMenu: boolean,
    darkMode: boolean,
}

const initialState: uiState = {
    openMenu: false,
    darkMode: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openAndCloseMenu: (state, actions: PayloadAction<boolean>) => {
            state.openMenu = actions.payload;
        },
        cambiarThemaApp: (state, actions: PayloadAction<boolean>) => {
            state.darkMode = actions.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { openAndCloseMenu, cambiarThemaApp } = uiSlice.actions

// export default usuarioSlice.reducer