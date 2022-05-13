import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  users: [],
  errors: false,
  user: [],
  history: [],
  clearance: [],
  pendingclearance: [],
  activeUsers: [],
  renters: [],
  owners: [],
};
const userSlice = createSlice({
  name: "userService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
    },
    getUsersListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    getUsersHistoryListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.history = payload.history;
      state.pendingclearance = payload.pendingClearance;
    },
    getActiveUsers: (state, { payload }) => {
      state.loading = false;
      state.activeUsers = payload;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },

    getUserClearance: (state, { payload }) => {
      state.loading = false;
      state.clearance = payload;
    },
    getUsersListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    updateUserSuccess: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    updateCnicSuccess: (state, { payload }) => {
      state.loading = false;
      state.hasErrors = false;
      state.user = payload;
    },
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
export const {
  getLoadingLists,
  getUsersHistoryListsSuccess,
  getUsersListsFailure,
  getActiveUsers,
  getUsersListsSuccess,
  getUserSuccess,
  updateUserSuccess,
  getUserClearance,
  updateCnicSuccess,
} = userSlice.actions;
