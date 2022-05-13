import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  allnotifications: [],
  notification: [],
  errors: false,
  newNotification: false,
  sentto_all: false,
  newNotificationLength: 0,
};
const notificationSlice = createSlice({
  name: "notificationService",
  initialState,
  reducers: {
    getLoading:(state)  => {
      state.sentto_all = true;
    },
    getLoadingFalse:(state)  => {
      state.sentto_all = false;
    },
    getLoadingLists: (state) => {
      state.loading = true;
      state.newNotification = false;
      state.sentto_all = false;
    },
    getNotificationsListsSuccess: (state = initialState, { payload }) => {
      state.loading = false;
      state.newNotification = false;
      state.newNotificationLength = payload.count[0].count_notread;
      state.allnotifications = payload.data;
    },
    getNotificationsListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.sentto_all = false;
    },
    updateNotificationSuccess: (state, { payload }) => {
      state.allnotifications = payload;
      state.loading = false;
      state.saved = true;
    },
    sendSuccess: (state) => {
      state.sentto_all = false;
      state.loading = false;
    },
  },
});

const notificationReducer = notificationSlice.reducer;
export default notificationReducer;
export const {
  getLoadingFalse,
  getLoading,
  sendSuccess,
  getLoadingLists,
  updateNotificationSuccess,
  getNotificationsListsSuccess,
  getNotificationsListsFailure,
} = notificationSlice.actions;
