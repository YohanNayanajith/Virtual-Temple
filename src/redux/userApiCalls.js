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
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./userSlice";
import { publicRequest, userRequest } from "../requestMethods";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export const register = async (User) => {
  // dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/register`, User);
    
    return 1;

    // alert("User registration Success!");
    //   dispatch(addUserSuccess(res.data));
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'User registration Failed!',
    })
    return 0;
    //   dispatch(addUserFailure());
  }
};

export const login = async (dispatch, user) => {
  // const userData = JSON.stringify(user);
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/user/login", user);
    dispatch(loginSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(loginFailure());
    return 0;
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/user", {
      headers: {
        "Content-Type": "application/json",
        // token: `Bearer ${token}`,
      },
    });
    dispatch(getUserSuccess(res.data));
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
        token: `Bearer ${token}`,
      },
    });
    dispatch(deleteUserSuccess(id));
    return 1;
  } catch (err) {
    dispatch(deleteUserFailure());
    return 0;
  }
};

export const updateUser = async (id, User, dispatch, token) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await userRequest.put(`/user/${id}`, User,{
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(updateUserSuccess({ id, User }));
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


