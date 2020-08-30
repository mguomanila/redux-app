import { createSlice } from '@reduxjs/toolkit'


export const usersSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    validity: {},
  },
  reducers: {
    createUser: (state, action) => {
    },
    editUser: (state, action) => {
    },
    validate: (state, {payload}) => {
      state.users = payload
    }
  }
})

export const {
  createUser,
  editUser,
  validate
} = usersSlice.actions

export default usersSlice.reducer
