import api from "../../api/index";
import {
  getLoadingLists,
  getSupportsListsFailure,
  getSupportsListsSuccess,
  addSupportSuccess,
  deleteSupportSuccess,
} from "./support.reducer";
import { setAlertMessage } from "../alert/alert.action";

// get All Support users
export const getAllSupportUsers = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/staff?user_role=support`);
    dispatch(getSupportsListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getSupportsListsFailure(err));
    }
  }
};

export const addSupportUser =
  (email, password, role) => async (dispatch, getState) => {
    const body = {
      email,
      password,
      role,
    };
    dispatch(getLoadingLists());
    try {
      const res = await api.post(`/staff/registerSupport`, body);
      dispatch(addSupportSuccess(res.data.data));
      dispatch(setAlertMessage(res.response.data.message, "success"));
    } catch (err) {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getSupportsListsFailure(err));
      }
    }
  };

export const deleteSupportUser = (id) => async (dispatch, getState) => {
  await api
    .delete(`/staff/${id}`)
    .then((response) => {
      dispatch(deleteSupportSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllSupportUsers());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getSupportsListsFailure(err));
      }
    });
};
