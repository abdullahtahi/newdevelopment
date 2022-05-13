import api from "../../api/index";
import {
  getLoadingLists,
  getBrandsListsFailure,
  getBrandsListsSuccess,
  addBrandsuccess,
  deleteBrandsSuccess,
  getBrandSuccess,
  updateBrandsSuccess,
} from "./brand.reducer";
import { setAlertMessage } from "../alert/alert.action";

// get All Brands
export const getAllBrands = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/company`);
    dispatch(getBrandsListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getBrandsListsFailure(err));
    }
  }
};

export const addBrand = (body) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.post(`/company/add`, body);
    dispatch(addBrandsuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getBrandsListsFailure(err));
    }
  }
};

export const deleteBrand = (id) => async (dispatch, getState) => {
  await api
    .delete(`/brand/${id}`)
    .then((response) => {
      dispatch(deleteBrandsSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllBrands());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getBrandsListsFailure(err));
      }
    });
};

export const getBrand = (id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/company?_id=${id}`);
    dispatch(getBrandSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getBrandsListsFailure(err));
    }
  }
};

export const updateBrand = (body, id) => async (dispatch, getState) => {
  await api
    .put(`/company/${id}`, body)
    .then((response) => {
      dispatch(updateBrandsSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllBrands());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getBrandsListsFailure(err));
      }
    });
};
