import {
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
} from "./permissionRedux";
import { publicRequest } from "../requestMethods";

export const getPermission = async (dispatch, token) => {
  dispatch(getPermissionStart());
  try {
    const res = await publicRequest.get("/permission", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getPermissionSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(getPermissionFailure());
    return 0;
  }
};

export const getOnePermission = async (dispatch, token, id) => {
    dispatch(getPermissionStart());
    try {
      const res = await publicRequest.get(`/permission/get-permission?user_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);
      dispatch(getPermissionSuccess(res.data.data));
      // return JSON.parse(res.data.data);
      return res.data.data;
    } catch (err) {
      dispatch(getPermissionFailure());
      return 0;
    }
  };

export const deletePermission = async (id, dispatch) => {
  dispatch(deletePermissionStart());
  try {
    const res = await publicRequest.delete(`/permission/delete/${id}`);
    dispatch(deletePermissionSuccess(id));
    return 1;
  } catch (err) {
    dispatch(deletePermissionFailure());
    return 0;
  }
};

export const updatePermission = async (Permission, dispatch, token) => {
  dispatch(updatePermissionStart());
  try {
    // update
    const res = await publicRequest.put(`/permission/update-permission`, Permission, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // dispatch(updatePermissionSuccess({ id, Permission }));
    console.log(res);
    return 1;
  } catch (err) {
    dispatch(updatePermissionFailure());
    return 0;
  }
};
export const addPermission = async (Permission, token) => {
  // dispatch(addPermissionStart());
  try {
    const res = await publicRequest.post(`/permission/add-permission`, Permission, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    // dispatch(addPermissionSuccess(res.data));
    return 1;
  } catch (err) {
    // dispatch(addPermissionFailure());
    return 0;
  }
};
