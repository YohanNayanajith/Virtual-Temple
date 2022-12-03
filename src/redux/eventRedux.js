import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events:null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getEventStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getEventSuccess: (state, action) => {
      state.isFetching = false;
      state.events = action.payload;
    },
    getEventFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    removeEvents: (state) => {
      state.events = null;
    },
    //DELETE
    deleteEventStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteEventSuccess: (state, action) => {
      state.isFetching = false;
      state.events.splice(
        state.events.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteEventFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateEventStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateEventSuccess: (state, action) => {
      state.isFetching = false;
      state.otherEvents[
        state.events.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.event;
    },
    updateEventFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addEventStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addEventSuccess: (state, action) => {
      state.isFetching = false;
      state.events.push(action.payload);
    },
    addEventFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getEventStart,
  getEventSuccess,
  getEventFailure,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
  updateEventStart,
  updateEventSuccess,
  updateEventFailure,
  addEventStart,
  addEventSuccess,
  addEventFailure,
  removeEvents
} = eventSlice.actions;
export default eventSlice.reducer;
