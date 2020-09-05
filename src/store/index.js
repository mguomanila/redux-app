import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import sessionReducer from './sessionSlice';
import usersReducer from './userSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: usersReducer,
    session: sessionReducer,
  },
});
