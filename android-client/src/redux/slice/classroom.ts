import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const classRoomSlice = createSlice({
  name: 'classroom',
  initialState: {
    classroom: {},
  },
  reducers: {
    set_classroom: (
      state,
      action: PayloadAction<{
        date?: string | undefined;
        classId?: string | undefined;
        timeIn?: string | undefined;
        status: string | undefined;
        room: string | undefined;
        subject: string | undefined;
        subjectTime: string | undefined;
      }>
    ) => {
      state.classroom = action;
    },
    delete_classroom: (state) => {
      state.classroom = {};
    },
  },
});

export const { set_classroom, delete_classroom } = classRoomSlice.actions;
export default classRoomSlice.reducer;
