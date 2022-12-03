import { createSlice } from "@reduxjs/toolkit";

const advertisementSlice = createSlice({
  name: "advertisement",
  initialState: {
    advertisements:null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getAdvertisementStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAdvertisementSuccess: (state, action) => {
      state.isFetching = false;
      state.advertisements = action.payload;
    },
    getAdvertisementFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    removeAdvertisement: (state) => {
      state.advertisements = null;
    },
    //DELETE
    deleteAdvertisementStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteAdvertisementSuccess: (state, action) => {
      state.isFetching = false;
      state.advertisements.splice(
        state.advertisements.findIndex((item) => item.advertisement_id === action.payload),
        1
      );
    },
    deleteAdvertisementFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateAdvertisementStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateAdvertisementSuccess: (state, action) => {
      state.isFetching = false;
      state.otherAdvertisements[
        state.advertisements.findIndex((item) => item.advertisement_id === action.payload.id)
      ] = action.payload.Advertisement;
    },
    updateAdvertisementFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addAdvertisementStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addAdvertisementSuccess: (state, action) => {
      state.isFetching = false;
      state.advertisements.push(action.payload);
    },
    addAdvertisementFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAdvertisementStart,
  getAdvertisementSuccess,
  getAdvertisementFailure,
  deleteAdvertisementStart,
  deleteAdvertisementSuccess,
  deleteAdvertisementFailure,
  updateAdvertisementStart,
  updateAdvertisementSuccess,
  updateAdvertisementFailure,
  addAdvertisementStart,
  addAdvertisementSuccess,
  addAdvertisementFailure,
  removeAdvertisement,
} = advertisementSlice.actions;
export default advertisementSlice.reducer;
