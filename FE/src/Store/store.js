import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './feature/ProfileSlide'
import tokenReducer from './feature/TokenSlide'
export default configureStore({
    reducer: {
        profile: profileReducer,
        token: tokenReducer,
    }
})