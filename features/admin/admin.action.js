import api from "../../api/index";
import {
  getLoadingLists,
  getAdminsListsFailure,
  getAdminsListsSuccess,
  addAdminSuccess,
  deleteAdminSuccess,
} from "./admin.reducer";
import { setAlertMessage } from "../alert/alert.action";

// get All Admin users
export const getAllAdminUsers = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/staff?user_role=admin`);
    dispatch(getAdminsListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getAdminsListsFailure(err));
    }
  }
};

export const addAdminUser =
  (email, password, role) => async (dispatch, getState) => {
    const body = {
      email,
      password,
      role,
    };
    dispatch(getLoadingLists());
    try {
      const res = await api.post(`/staff/registerAdmin`, body);
      dispatch(addAdminSuccess(res.data.data));
      dispatch(setAlertMessage(res.response.data.message, "success"));
    } catch (err) {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getAdminsListsFailure(err));
      }
    }
  };

export const deleteAdminUser = (id) => async (dispatch, getState) => {
  await api
    .delete(`/staff/${id}`)
    .then((response) => {
      dispatch(deleteAdminSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllAdminUsers());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getAdminsListsFailure(err));
      }
    });
};
