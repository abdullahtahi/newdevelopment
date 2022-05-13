import api from "../../api/index";
import {
  getLoadingLists,
  getLoading,
  getLoadingFalse,
  getNotificationsListsSuccess,
  getNotificationsListsFailure,
  updateNotificationSuccess,
  sendSuccess,
} from "./notification.reducer";
import { setAlertMessage } from "../alert/alert.action";

export const emptyState = (body) => async (dispatch, getState) => {
  dispatch(getLoadingFalse());
};

export const sendNotificationToAll = (body) => async (dispatch, getState) => {
  dispatch(getLoading());
  try {
    const res = await api.post(`/pushnotification/sendNotification`, body);
    dispatch(sendSuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getNotificationsListsFailure(err));
    }
  }
};

export const sendNotificationToUser = (body)=> async (dispatch) => {
  dispatch(getLoading());
  try {
    const res = await api.post(`/pushnotification/sendtouser`, body);
    dispatch(sendSuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getNotificationsListsFailure(err));
    }
  }
};
// get All Notification Of User
export const getAllNotificationOfUser = (id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/notification/${id}`);
    dispatch(getNotificationsListsSuccess(res.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getNotificationsListsFailure(err));
    }
  }
};

export const updateNotification =
  (id, userId) => async (dispatch, getState) => {
    dispatch(getLoadingLists());
    await api
      .put(`/notification/readNotification/admin/${userId}/${id}`)
      .then((response) => {
        dispatch(getAllNotificationOfUser(userId));
        dispatch(updateNotificationSuccess(response.data.data));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(setAlertMessage(err.response.data.message, "error"));
          dispatch(getNotificationsListsFailure(err));
        }
      });
  };
