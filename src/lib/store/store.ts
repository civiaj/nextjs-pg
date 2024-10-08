import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { uiSlice } from '@/lib/store/features/ui/uiSlice'

export const createStore = () => {
    return configureStore({
        reducer: combineReducers({
            ['ui']: uiSlice.reducer
        })
    })
}
