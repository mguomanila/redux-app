import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import sessionReducer from './sessionSlice'
import usersReducer from './userSlice'
import postReducer from './postSlice'


export default configureStore({
  reducer: {
    counter: counterReducer,
    user: usersReducer,
    session: sessionReducer,
    post: postReducer,
  },
})
