import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface uiState {
    openMenu: boolean,
}

const initialState: uiState = {
    openMenu: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openAndCloseMenu: (state, actions: PayloadAction<boolean>) => {
            state.openMenu = actions.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { openAndCloseMenu } = uiSlice.actions

// export default usuarioSlice.reducer