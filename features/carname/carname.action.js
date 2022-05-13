import api from "../../api/index";
import {
  getLoadingLists,
  getCarNameListsFailure,
  getCarNameListsSuccess,
  addCarNameSuccess,
  deleteCarNameSuccess,
  getCarNameSuccess,
  updateCarNameSuccess,
  getCarNameBrandSuccess,
} from "./carname.reducer";
import { setAlertMessage } from "../alert/alert.action";

// get All CarName users
export const getAllCarName = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/car_name`);
    dispatch(getCarNameListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarNameListsFailure(err));
    }
  }
};

export const getAllCarByBrand = (brand) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/car_name?company=${brand}`);
    dispatch(getCarNameBrandSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarNameListsFailure(err));
    }
  }
};

export const addCarName = (body) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.post(`/car_name/add`, body);
    dispatch(addCarNameSuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getCarNameListsFailure(err));
    }
  }
};

export const deleteCarName = (id) => async (dispatch, getState) => {
  await api
    .delete(`/car_name/${id}`)
    .then((response) => {
      dispatch(deleteCarNameSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllCarName());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getCarNameListsFailure(err));
      }
    });
};

export const getCarName = (id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/car_name?_id=${id}`);
    dispatch(getCarNameSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarNameListsFailure(err));
    }
  }
};

export const updateCarName = (body, id) => async (dispatch, getState) => {
  await api
    .put(`/car_name/${id}`, body)
    .then((response) => {
      dispatch(updateCarNameSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllCarName());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getCarNameListsFailure(err));
      }
    });
};
