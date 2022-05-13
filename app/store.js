import alertReducer from "../features/alert/alert.reducer";
import authReducer from "../features/auth/auth.reducers";
import userReducer from "../features/users/user.reducers";
import carReducer from "../features/car/car.reducer";
import bookingReducer from "../features/booking/booking.reducer";
import supportReducer from "../features/support/support.reducer";
import adminReducer from "../features/admin/admin.reducer";
import brandReducer from "../features/brand/brand.reducer";
import carnameReducer from "../features/carname/carname.reducer";
import notificationReducer from "../features/notification/notification.reducer";
import earningsReducer from "../features/earnings/earnings.reducer";
import companyearnings from "../features/companyearnings/earnings.reducer";
import imageUploadReducer from "../features/imageUpload/imageUpload.reducer";
import carCategoryReducer from "../features/car_category/carcategory.reducer";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import disputeReducer from "../features/dispute/dispute.reducer";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducers = combineReducers({
  // dashboard: dashboardReducer,
  users: userReducer,
  auth: authReducer,
  alert: alertReducer,
  booking: bookingReducer,
  car: carReducer,
  support: supportReducer,
  admin: adminReducer,
  brand: brandReducer,
  image: imageUploadReducer,
  carname: carnameReducer,
  notifications: notificationReducer,
  companyearnings: companyearnings,
  earnings: earningsReducer,
  dispute: disputeReducer,
  carcategory: carCategoryReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
