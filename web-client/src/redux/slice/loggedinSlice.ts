import { createSlice } from '@reduxjs/toolkit';

export const loggedinSlice = createSlice({
  name: 'loggedin',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    isLoggedIn_true: (state) => {
      state.isLoggedIn = true;
    },
    isLoggedIn_false: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { isLoggedIn_true, isLoggedIn_false } = loggedinSlice.actions;
export default loggedinSlice.reducer;
