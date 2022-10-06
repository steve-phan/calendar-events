import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IEvent {
  _id: string;
  title: string;
  user: string;
  time: string;
  date: string;
}

interface IStoreState {
  events: IEvent[];
  viewEvent: IEvent;
  openViewEvent: boolean;
}
const eventInit = {
  _id: "",
  title: "",
  user: "",
  time: "",
  date: "",
};
const eventInitialState: IStoreState = {
  events: [],
  viewEvent: eventInit,
  openViewEvent: false,
};

const eventSlice = createSlice({
  name: "event",
  initialState: eventInitialState,
  reducers: {
    getAllEvent: (state, { payload }) => {
      state.events = payload;
    },
    addEvent: (state, { payload }) => {
      state.events.push(payload);
    },
    viewEvent: (state, { payload }) => {
      state.viewEvent = payload;
      state.openViewEvent = true;
    },
    closeViewEvent: (state) => {
      state.viewEvent = eventInit;
      state.openViewEvent = false;
    },
    updateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
  },
});

export default eventSlice.reducer;
export const { getAllEvent, addEvent, viewEvent, closeViewEvent, updateEvent } =
  eventSlice.actions;
