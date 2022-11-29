import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: [],
    otherUsers: [],
    adminUsers: [],
    isFetching: false,
    authorities:[],
    token: null,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload.data;
      state.token = action.payload.token;
      //please set permissions
      // state.authorities = action.payload.authorities;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = [];
      state.isFetching = false;
      state.error = false;
      state.otherUsers = [];
      state.token = null;
      state.authorities = [];
      state.adminUsers = [];
    },

    //GET ALL
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.otherUsers = action.payload;
    },
    getAdminUserSuccess: (state, action) => {
      state.isFetching = false;
      state.adminUsers = action.payload;
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.otherUsers.splice(
        state.otherUsers.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.otherUsers[
        state.otherUsers.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.User;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.otherUsers.push(action.payload);
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  getUserStart,
  getUserSuccess,
  getAdminUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
