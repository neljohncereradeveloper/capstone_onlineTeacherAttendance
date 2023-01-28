import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false,
    isClassRoomIn: false,
  },
  reducers: {
    set_loggedin_true: (state) => {
      state.isLoggedIn = true;
    },

    set_loggedin_false: (state) => {
      state.isLoggedIn = false;
    },

    set_classroomin_true: (state) => {
      state.isClassRoomIn = true;
    },

    set_classroomin_false: (state) => {
      state.isClassRoomIn = false;
    },
  },
});

export const {
  set_loggedin_true,
  set_loggedin_false,
  set_classroomin_true,
  set_classroomin_false,
} = loginSlice.actions;
export default loginSlice.reducer;
