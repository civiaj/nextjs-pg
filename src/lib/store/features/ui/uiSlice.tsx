import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPostFilterOptions } from '@/types/post.types'

type UiSliceInitialState = {
    sidebarIsOpen: boolean
    postFilter: TPostFilterOptions
}

const initialState: UiSliceInitialState = {
    sidebarIsOpen: true,

    postFilter: { filterOption: 'popular', sortOption: 'today' }
}

export const uiSlice = createSlice({
    initialState,
    name: 'ui',
    reducers: {
        toggleSidebar: (state, action: PayloadAction<boolean | undefined>) => {
            state.sidebarIsOpen = action.payload ?? !state.sidebarIsOpen
        },

        setPostFilterOption: (state, action: PayloadAction<TPostFilterOptions['filterOption']>) => {
            switch (action.payload) {
                case 'self': {
                    state.postFilter.sortOption = 'new'
                    break
                }
                case 'popular': {
                    state.postFilter.sortOption = 'today'
                    break
                }
                case 'date': {
                    state.postFilter.sortOption = 'new'
                    break
                }
            }
            state.postFilter.filterOption = action.payload
        },

        setPostSortOption: (state, action: PayloadAction<TPostFilterOptions['sortOption']>) => {
            state.postFilter.sortOption = action.payload
        }
    },
    selectors: {
        sidebarIsOpen: (state) => state.sidebarIsOpen,
        getPostFilter: (state) => state.postFilter
    }
})
