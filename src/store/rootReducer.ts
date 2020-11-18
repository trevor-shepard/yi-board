import { combineReducers } from '@reduxjs/toolkit'
import art from './slices/artSlice'
import user from './slices/userSlice'

const rootReducer = combineReducers({
	art,
	user
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
