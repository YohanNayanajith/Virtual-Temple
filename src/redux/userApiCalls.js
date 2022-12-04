import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getAdminUserSuccess,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import Swal from "sweetalert2";

export const normalUserRegister = async (User, token) => {
  // dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/user/createUser`, User, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return 1;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User registration Failed!",
    });
    return 0;
  }
};

export const adminRegister = async (User, token) => {
  // dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/local_user/createUser`, User, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return 1;
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "User registration Failed!",
    });
    return 0;
  }
};

export const login = async (dispatch, data) => {
  // const userData = JSON.stringify(data);
  console.log(data);
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/local_user/login", data);
    console.log(res);
    dispatch(loginSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(loginFailure());
    return 0;
  }
};

export const getUsers = async (dispatch, token) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getUserSuccess(res.data.data));
    return 1;
  } catch (err) {
    dispatch(getUserFailure());
    return 0;
  }
};

export const getAdminUsers = async (dispatch, token) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get("/local_user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAdminUserSuccess(res.data.data));
    return 1;
  } catch (err) {
    dispatch(getUserFailure());
    return 0;
  }
};

export const deleteUser = async (id, dispatch, token) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteUserSuccess(id));
    return 1;
  } catch (err) {
    dispatch(deleteUserFailure());
    return 0;
  }
};

export const updateNormalUser = async (user_id, User, dispatch, token) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await publicRequest.put(`/user/updateUser`, User, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    // dispatch(updateUserSuccess({ user_id, User }));
    return 1;
  } catch (err) {
    dispatch(updateUserFailure());
    return 0;
  }
};

export const updateAdminNormalUser = async (user_id, User, dispatch, token) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await publicRequest.put(`/local_user/updateUser`, User, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    // dispatch(updateUserSuccess({ user_id, User }));
    return 1;
  } catch (err) {
    dispatch(updateUserFailure());
    return 0;
  }
};

export const logOutUser = async (dispatch) => {
  dispatch(logout());
};

// export const addUserWithAuth = async (User, dispatch) => {
//   dispatch(addUserStart());
//   try {
//     const res = await userRequest.post(`/user/save`, User);
//     dispatch(addUserSuccess(res.data));
//   } catch (err) {
//     dispatch(addUserFailure());
//   }
// };
