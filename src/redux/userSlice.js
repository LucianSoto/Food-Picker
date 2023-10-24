import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userState',
  initialState: {
    data: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload
    },
    logOut: (state) => {
      state.data = null
    },
  },
})

export const { setUser, logOut } = userSlice.actions

export default userSlice.reducer