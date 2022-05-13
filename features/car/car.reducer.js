import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  saved: false,
  addLoader: false,
  cars: [],
  nonbookedcars: [],
  availableCars: [],
  searchedCar: [],
  errors: false,
  availabilityUpdating: false,
  editCarLoader: false,
  car: [],
};
const carSlice = createSlice({
  name: "carService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
      state.saved = false;
      state.addLoader = false;
      state.editCarLoader = false;
    },
    getEditLoadingLists: (state) => {
      state.editCarLoader = true;
    },
    getLoading: (state) => {
      state.addLoader = true;
    },
    getNonBooked: (state, { payload }) => {
      state.loading = false;
      state.nonbookedcars = payload;
    },
    getCarListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.cars = payload;
      state.car = [];
    },
    getCarAvailableListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.availableCars = payload;
    },
    getCarSearch: (state, { payload }) => {
      state.loading = false;
      state.searchedCar = payload;
    },
    getEmptyCarSearch: (state, { payload }) => {
      state.loading = false;
      state.searchedCar = [];
    },
    getCarSuccess: (state, { payload }) => {
      state.car = payload;
      state.loading = false;
    },
    getCarListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.addLoader = false;
      state.cars = [];
      state.searchedCar = [];
      state.availabilityUpdating = false;
      state.editCarLoader = false;
    },
    updateCarSuccess: (state, { payload }) => {
      state.car = payload;
      state.loading = false;
      state.saved = true;
      state.availabilityUpdating = false;
    },
    updateEditCarSuccess: (state, { payload }) => {
      state.car = payload;
      state.loading = false;
      state.editCarLoader = false;
    },
    updateAvailabilitySuccess: (state, { payload }) => {
      state.car = payload;
      state.availabilityUpdating = false;
    },
    getUpdatedRegistrationImage: (state, { payload }) => {
      state.car = {
        ...state.car,
        registration_image: payload.registration_image,
      };
      state.loading = false;
      state.saved = true;
    },
    addCarSuccess: (state, { payload }) => {
      state.loading = false;
      state.saved = true;
      state.addLoader = false;
    },
    getAvailablityLoading: (state) => {
      state.availabilityUpdating = true;
    },
  },
});

const carReducer = carSlice.reducer;
export default carReducer;
export const {
  getLoadingLists,
  getCarSuccess,
  getCarListsFailure,
  getCarListsSuccess,
  updateCarSuccess,
  addCarSuccess,
  getCarAvailableListsSuccess,
  getLoading,
  getCarSearch,
  getEmptyCarSearch,
  getNonBooked,
  getUpdatedRegistrationImage,
  getAvailablityLoading,
  updateAvailabilitySuccess,
  getEditLoadingLists
} = carSlice.actions;
