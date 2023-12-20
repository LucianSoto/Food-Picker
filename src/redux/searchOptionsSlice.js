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
    setSearchOptions: (state, {payload}) => {
      // const action = 

      console.log(payload, 'SearchSLICE')
      state.data = {
        ...state.data,
        [payload.name] : payload.data
      }
    },
  },
})

export const { setSearchOptions } = searchOptionsSlice.actions
export default searchOptionsSlice.reducer