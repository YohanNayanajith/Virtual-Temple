import {
  getPostStart,
  getPostSuccess,
  getPostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
  addPostStart,
  addPostSuccess,
  addPostFailure,
} from "./postRedux";
import { publicRequest } from "../requestMethods";

export const getPost = async (dispatch, token) => {
  dispatch(getPostStart());
  try {
    const res = await publicRequest.get("/post", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getPostSuccess(res.data.data));
    return 1;
  } catch (err) {
    dispatch(getPostFailure());
    return 0;
  }
};

export const deletePost = async (id, dispatch) => {
  dispatch(deletePostStart());
  try {
    const res = await publicRequest.delete(`/post/delete/${id}`);
    console.log(res);
    //   dispatch(deletePostSuccess(id));
    return 1;
  } catch (err) {
    dispatch(deletePostFailure());
    return 0;
  }
};

export const updatePost = async (id, Post, dispatch, token) => {
  dispatch(updatePostStart());
  try {
    // update
    const res = await publicRequest.put(
      `/post/update-post?post_id=${id}`,
      Post,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    // dispatch(updatePostSuccess({ id, Post }));
    return 1;
  } catch (err) {
    dispatch(updatePostFailure());
    return 0;
  }
};
export const addPost = async (Post, token) => {
  // dispatch(addPostStart());
  try {
    const res = await publicRequest.post(`/post/createPost`, Post, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    // dispatch(addPostSuccess(res.data));
    return 1;
  } catch (err) {
    // dispatch(addPostFailure());
    return 0;
  }
};
