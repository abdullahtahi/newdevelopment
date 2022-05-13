import api from "../../api/index";
import {
  getLoadingLists,
  getDisputesListsFailure,
  getDisputesListsSuccess,
  getDisputeSuccess,
  putDisputeSuccess,
} from "./dispute.reducer";
import { setAlertMessage } from "../alert/alert.action";

// GET All Disputes
export const getAllDisputes = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/dispute`);
    dispatch(getDisputesListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getDisputesListsFailure(err));
    }
  }
};

export const getDisputesByStatus = (status) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/dispute?status=${status}`);
    dispatch(getDisputesListsSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getDisputesListsFailure(err));
    }
  }
};

export const getDispute = (id) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/dispute?_id=${id}`);
    dispatch(getDisputeSuccess(res.data.data[0]));
  } catch (err) {
    if (err) {
      dispatch(getDisputesListsFailure(err));
    }
  }
};

export const updateDisputeStatus = (id) => async (dispatch) => {
  await api
    .put(`/dispute/closeDispute/${id}`)
    .then((response) => {
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllDisputes());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getDisputesListsFailure(err));
      }
    });
};

export const sendDisputeReply = (id, body) => async (dispatch) => {
  await api
    .put(`/dispute/${id}`, body)
    .then((res) => {
      dispatch(setAlertMessage(res.data.message, "success"));
      dispatch(putDisputeSuccess(res.data.data));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getDisputesListsFailure(err));
      }
    });
};
