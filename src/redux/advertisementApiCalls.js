import {
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
  } from "./advertisementRedux";
  import { publicRequest } from "../requestMethods";
  
  export const getAdvertisement = async (dispatch, token) => {
    dispatch(getAdvertisementStart());
    try {
      const res = await publicRequest.get("/advertisement/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAdvertisementSuccess(res.data));
      return 1;
    } catch (err) {
      dispatch(getAdvertisementFailure());
      return 0;
    }
  };
  
  export const deleteAdvertisement = async (id, dispatch) => {
    dispatch(deleteAdvertisementStart());
    try {
      const res = await publicRequest.delete(`/advertisement/delete-advertisement?advertisement_id=${id}`);
      console.log(res);
    //   dispatch(deleteAdvertisementSuccess(id));
      return 1;
    } catch (err) {
    //   dispatch(deleteAdvertisementFailure());
      return 0;
    }
  };
  
  export const updateAdvertisement = async (Advertisement, dispatch, token) => {
    dispatch(updateAdvertisementStart());
    try {
      // update
      const res = await publicRequest.put(`/advertisement/update-advertisement`, Advertisement, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // dispatch(updateAdvertisementSuccess({ id, Advertisement }));
      console.log(res);
      return 1;
    } catch (err) {
      dispatch(updateAdvertisementFailure());
      return 0;
    }
  };
  export const addAdvertisement = async (Advertisement, token) => {
    // dispatch(addAdvertisementStart());
    try {
      const res = await publicRequest.post(`/advertisement/create-advertisement`, Advertisement, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      // dispatch(addAdvertisementSuccess(res.data));
      return 1;
    } catch (err) {
      // dispatch(addAdvertisementFailure());
      return 0;
    }
  };
  