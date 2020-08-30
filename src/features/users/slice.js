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
      Object.assign(state.validity, payload)
    },
    image: (state, {payload}) => {
      Object.assign(state, payload)
    }
  }
})

export const {
  createUser,
  editUser,
  validate,
  image
} = usersSlice.actions

export default usersSlice.reducer
