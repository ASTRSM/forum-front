import { configureStore } from '@reduxjs/toolkit'
import { loadingBarReducer } from 'react-redux-loading-bar'
import authUserReducer from './auth/reducer'
import isPreloadReducer from './isPreload/reducer'
import tagReducer from './tag/reducer'
import threadsReducer from './threads/reducer'
import usersReducer from './users/reducer'

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    activeTag: tagReducer,
    loadingBar: loadingBarReducer
  }
})
