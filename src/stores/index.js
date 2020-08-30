import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sessionReducer from '../features/session/slice';
import usersReducer from '../features/users/slice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: usersReducer,
    session: sessionReducer,
  },
});
