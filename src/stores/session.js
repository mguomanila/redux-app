// implement context store using redux
import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from '../features/session/slice'


export default configureStore({
  reducer: {
    session: sessionReducer
  }
})
