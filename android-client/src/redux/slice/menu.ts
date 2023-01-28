import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isOpen: false,
  },
  reducers: {
    set_openMenu_true: (state) => {
      state.isOpen = true;
    },

    set_openMenu_false: (state) => {
      state.isOpen = false;
    },
  },
});

export const { set_openMenu_true, set_openMenu_false } = menuSlice.actions;
export default menuSlice.reducer;
