import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  bookings: [],
  errors: false,
  booking: [],
  saved: false,
  update: false,
  bookingLoader: false,
  invoiceLink: "",
};
const bookingSlice = createSlice({
  name: "bookingService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
      state.saved = false;
      state.bookingLoader = true;
    },
    getLoadingFalse: (state) => {
      state.bookingLoader = false;
      state.saved = false;
    },
    getupdating: (state) => {
      state.update = true;
    },
    getBookingListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.bookings = payload;
    },
    getBookingSuccess: (state, { payload }) => {
      state.loading = false;
      state.booking = payload;
    },
    getBookingListsFailure: (state) => {
      state.loading = false;
      state.bookingLoader = false;
      state.bookings = null;
    },
    updateBookingSuccess: (state, { payload }) => {
      state.booking = payload;
      state.loading = false;
      state.saved = true;
      state.update = false;
    },
    addBooking: (state) => {
      state.loading = false;
      state.bookingLoader = false;
      state.saved = true;
    },
    updateInvoiceSuccess: (state) => {
      state.loading = false;
      state.saved = true;
    },
    getInvoiceLinkSuccess: (state, { payload }) => {
      state.loading = false;
      state.invoiceLink = payload.invoice_pdf_link;
    },
  },
});

const bookingReducer = bookingSlice.reducer;
export default bookingReducer;
export const {
  getLoadingLists,
  getBookingListsFailure,
  getBookingListsSuccess,
  getBookingSuccess,
  updateBookingSuccess,
  updateInvoiceSuccess,
  getupdating,
  getInvoiceLinkSuccess,
  addBooking,
  getLoadingFalse,
} = bookingSlice.actions;
