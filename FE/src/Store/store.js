import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './feature/ProfileSlide'
import tokenReducer from './feature/TokenSlide'
import accountReducer from './feature/AccountSlide'
export default configureStore({
    reducer: {
        profile: profileReducer,
        token: tokenReducer,
        account: accountReducer,
    }
})