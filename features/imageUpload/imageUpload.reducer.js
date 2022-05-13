import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  imageUrl: null,
  imageregistrationUrl: null,
  carimages: null,
  errors: false,
  saved: false,
  regLoad: false,
  carLoad: false,
  cnicBack: null,
  cnicFront: null,
};
const imageSlice = createSlice({
  name: "imageService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
      state.saved = false;
    },
    getRegistrationUpload: (state) => {
      state.regLoad = true;
      state.saved = false;
    },
    getCarUpload: (state) => {
      state.carLoad = true;
      state.saved = false;
    },
    getUploadSuccess: (state, { payload }) => {
      state.loading = false;
      state.saved = true;
      state.imageUrl = payload.locationArray[0]?.fileLocation;
    },
    getCnicFrontSuccess: (state, { payload }) => {
      state.loading = false;
      state.saved = true;
      state.cnicFront = payload.locationArray[0]?.fileLocation;
    },
    getCnicBackSuccess: (state, { payload }) => {
      state.loading = false;
      state.saved = true;
      state.cnicBack = payload.locationArray[0]?.fileLocation;
    },
    emptyUrl: (state) => {
      state.imageUrl = null;
      state.cnicBack = "";
      state.cnicFront = "";
    },
    getUploadRegistrationImageSuccess: (state, { payload }) => {
      state.loading = false;
      state.saved = true;
      state.imageregistrationUrl = payload.locationArray;
      state.regLoad = false;
    },
    getUploadCarImageSuccess: (state, { payload }) => {
      state.carimages = payload.locationArray;
      state.loading = false;
      state.saved = true;
      state.carLoad = false;
    },
    getUploadFailure: (state) => {
      state.loading = false;
      state.saved = false;
      state.imageUrl = null;
    },
  },
});

const imageReducer = imageSlice.reducer;
export default imageReducer;
export const {
  getCnicFrontSuccess,
  getCnicBackSuccess,
  getLoadingLists,
  getUploadFailure,
  getUploadSuccess,
  getUploadRegistrationImageSuccess,
  getUploadCarImageSuccess,
  emptyUrl,
  getRegistrationUpload,
  getCarUpload,
} = imageSlice.actions;
