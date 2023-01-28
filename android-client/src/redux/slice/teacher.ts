import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    teacher: {},
  },
  reducers: {
    set_teacher: (
      state,
      action: PayloadAction<{
        idNumber: string;
        teacher: string;
        qrCode: string;
      }>
    ) => {
      state.teacher = action;
    },
    delete_teacher: (state) => {
      state.teacher = {};
    },
  },
});

export const { set_teacher, delete_teacher } = teacherSlice.actions;
export default teacherSlice.reducer;
