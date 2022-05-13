import api from "../../api/index";
import {
  getLoadingLists,
  getCategoryListsFailure,
  getCategoryListsSuccess,
  addCategorySuccess,
  updateCategorySuccess,
  // getReasonSuccess,
} from "./carcategory.reducer";
import { setAlertMessage } from "../alert/alert.action";

export const addCategory = (body) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.post(`/vehicle_type/add`, body);
    dispatch(addCategorySuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getCategoryListsFailure(err));
    }
  }
};

export const editCategory = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.put(`/vehicle_type/${id}`, body);
    dispatch(updateCategorySuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
    }
  }
};

// get All Reasons
export const getAllCategories = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/vehicle_type`);
    dispatch(getCategoryListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCategoryListsFailure(err));
    }
  }
};

export const addCategoryPricing = (body) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.post(`/car_price/add`, body);
    // dispatch(addReasonsuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getCategoryListsFailure(err));
    }
  }
};

export const getCategoryPricing = (id) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/category_pricing?_id=${id}`);
    // dispatch(getReasonSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCategoryListsFailure(err));
    }
  }
};
