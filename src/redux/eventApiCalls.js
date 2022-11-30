import {
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
} from "./eventRedux";
import { publicRequest } from "../requestMethods";

export const getEvent = async (dispatch, token) => {
  dispatch(getEventStart());
  try {
    const res = await publicRequest.get("/event", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getEventSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(getEventFailure());
    return 0;
  }
};

export const deleteEvent = async (id, dispatch) => {
  dispatch(deleteEventStart());
  try {
    const res = await publicRequest.delete(`/event/delete/${id}`);
    dispatch(deleteEventSuccess(id));
    return 1;
  } catch (err) {
    dispatch(deleteEventFailure());
    return 0;
  }
};

export const updateEvent = async (id, event, dispatch, token) => {
  dispatch(updateEventStart());
  try {
    // update
    const res = await publicRequest.put(`/Event/update/${id}`, event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // dispatch(updateEventSuccess({ id, event }));
    console.log(res);
    return 1;
  } catch (err) {
    dispatch(updateEventFailure());
    return 0;
  }
};
export const addEvent = async (event, dispatch, token) => {
  dispatch(addEventStart());
  try {
    const res = await publicRequest.post(`/event/create-event`, event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(addEventSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(addEventFailure());
    return 0;
  }
};
