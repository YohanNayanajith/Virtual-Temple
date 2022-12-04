import { createSlice } from "@reduxjs/toolkit";

const permissionSlice = createSlice({
  name: "permissionData",
  initialState: {
    permissionsData:null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getPermissionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPermissionSuccess: (state, action) => {
      state.isFetching = false;
      state.permissionsData = action.payload;
    },
    getPermissionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    removePermissions: (state) => {
      state.permissionsData = null;
    },
    //DELETE
    deletePermissionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePermissionSuccess: (state, action) => {
      state.isFetching = false;
      state.permissionsData.splice(
        state.permissionsData.findIndex((item) => item.permission_id === action.payload),
        1
      );
    },
    deletePermissionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updatePermissionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePermissionSuccess: (state, action) => {
      state.isFetching = false;
      state.otherPermissions[
        state.permissionsData.findIndex((item) => item.permission_id === action.payload.id)
      ] = action.payload.permissionsData;
    },
    updatePermissionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addPermissionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addPermissionSuccess: (state, action) => {
      state.isFetching = false;
      state.permissionsData.push(action.payload);
    },
    addPermissionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getPermissionStart,
  getPermissionSuccess,
  getPermissionFailure,
  deletePermissionStart,
  deletePermissionSuccess,
  deletePermissionFailure,
  updatePermissionStart,
  updatePermissionSuccess,
  updatePermissionFailure,
  addPermissionStart,
  addPermissionSuccess,
  addPermissionFailure,
  removePermissions
} = permissionSlice.actions;
export default permissionSlice.reducer;
