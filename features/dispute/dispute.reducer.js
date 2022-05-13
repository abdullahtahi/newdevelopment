import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  disputes: [],
  dispute: [],
  errors: false,
};
const disputeSlice = createSlice({
  name: "disputeService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
      state.saved = false;
    },
    getDisputesListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.disputes = payload;
      state.saved = false;
    },
    getDisputesListsFailure: (state) => {
      state.loading = false;
      state.saved = false;
      state.hasErrors = true;
      state.disputes = [];
    },
    addDisputeSuccess: (state) => {
      state.loading = false;
      state.saved = true;
    },
    getDisputeSuccess: (state, { payload }) => {
      state.loading = false;
      state.dispute = payload;
    },
    putDisputeSuccess: (state, { payload }) => {
      state.loading = false;
      state.dispute = payload;
    },
    deleteDisputeSuccess: (state) => {
      state.loading = false;
      state.saved = false;
    },
  },
});

const disputeReducer = disputeSlice.reducer;
export default disputeReducer;
export const {
  getLoadingLists,
  getDisputesListsFailure,
  getDisputesListsSuccess,
  addDisputeSuccess,
  deleteDisputeSuccess,
  getDisputeSuccess,
  putDisputeSuccess,
} = disputeSlice.actions;
