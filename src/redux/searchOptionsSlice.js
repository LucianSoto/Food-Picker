import { createSlice } from '@reduxjs/toolkit'

export const searchOptionsSlice = createSlice({
  name: 'searchOptionsState',
  initialState: {
    data: {
      distance: [3], 
      limit: 3, 
      price: '$$', 
      term: '',
      openNow: true,
      categories: '',
      attributes: [],
      sortBy: 'best_match',
    }
  },
  reducers: {
    setSearchOptions: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { setSearchOptions } = searchOptionsSlice.actions
export default searchOptionsSlice.reducer