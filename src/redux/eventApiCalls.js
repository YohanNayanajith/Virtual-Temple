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
    dispatch(getEventSuccess(res.data.data));
    return 1;
  } catch (err) {
    dispatch(getEventFailure());
    return 0;
  }
};

export const getEventDummy = async (dispatch, token) => {
  dispatch(getEventStart());
  try {
    const res = await publicRequest.get("/event", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (err) {
    dispatch(getEventFailure());
    return 0;
  }
};

export const deleteEvent = async (id, dispatch,token) => {
  dispatch(deleteEventStart());
  try {
    const res = await publicRequest.delete(`/event/delete-event?event_id=${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // dispatch(deleteEventSuccess(id));
    console.log(res);
    return 1;
  } catch (err) {
    dispatch(deleteEventFailure());
    return 0;
  }
};

export const updateEvent = async (event, dispatch, token) => {
  dispatch(updateEventStart());
  try {
    // update
    const res = await publicRequest.put(`/event/update-event`, event, {
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
export const addEvent = async (event, token) => {
  // dispatch(addEventStart());
  try {
    const res = await publicRequest.post(`/event/create-event`, event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    // dispatch(addEventSuccess(res.data));
    return 1;
  } catch (err) {
    // dispatch(addEventFailure());
    return 0;
  }
};
