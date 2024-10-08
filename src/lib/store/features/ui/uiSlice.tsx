import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UiSliceInitialState = {
    sidebarIsOpen: boolean
}

const initialState: UiSliceInitialState = { sidebarIsOpen: true }

export const uiSlice = createSlice({
    initialState,
    name: 'ui',
    reducers: {
        toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => {
            state.sidebarIsOpen = action.payload ?? !state.sidebarIsOpen
        }
    },
    selectors: {
        sidebarIsOpen: (state) => state.sidebarIsOpen
    }
})
