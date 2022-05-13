import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  car_categories: [],
  car_category: [],
  errors: false,
  saved: false,
};
const carcategorySlice = createSlice({
  name: "car_categoryService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
      state.saved = false;
    },
    getCategoryListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.saved = false;
      state.car_categories = payload;
    },
    getReasonSuccess: (state, { payload }) => {
      state.car_category = payload;
      state.saved = false;
      state.loading = false;
    },
    getCategoryListsFailure: (state) => {
      state.loading = false;
      state.saved = false;
      state.hasErrors = true;
      state.car_categories = [];
    },
    addCategorySuccess: (state) => {
      console.log( "worked from reducer")
      state.loading = false;
      state.saved = true;
    },
    updateCategorySuccess: (state) => {
      state.loading = false;
      state.saved = true;
    },
  },
});

const car_categoryReducer = carcategorySlice.reducer;
export default car_categoryReducer;
export const {
  getLoadingLists,
  getCategoryListsFailure,
  getCategoryListsSuccess,
  addCategorySuccess,
  getReasonSuccess,
  updateCategorySuccess,
} = carcategorySlice.actions;
