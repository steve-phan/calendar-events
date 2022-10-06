import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEvent {
  title: string;
  user: string;
  time: string;
  date: string;
}

const eventInitialState = {
  data: [],
  currentEvent: {
    title: "",
    user: "",
    time: "",
    date: "",
  },
};

const eventSlice = createSlice({
  name: "event",
  initialState: eventInitialState,
  reducers: {
    addEvent: (state, { payload }) => {
      console.log({ payload });
      state.currentEvent = payload;
    },
  },
});

export default eventSlice.reducer;
export const { addEvent } = eventSlice.actions;
