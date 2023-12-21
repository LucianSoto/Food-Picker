import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import searchOptionsSlice from './searchOptionsSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    searchOptions: searchOptionsSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
})