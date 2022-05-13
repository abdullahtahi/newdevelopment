import api from "../../api/index";
import {
  getLoadingLists,
  getBookingListsFailure,
  getBookingListsSuccess,
  getInvoiceLinkSuccess,
  getBookingSuccess,
  updateBookingSuccess,
  updateInvoiceSuccess,
  addBooking,
  getLoadingFalse,
} from "./booking.reducer";
import { setAlertMessage } from "../alert/alert.action";
// get All booking
export const getAllBookings = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/trip/getTrips`);
    dispatch(getBookingListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getBookingListsFailure(err));
    }
  }
};

export const getBooking = (id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/trip/getTrips?_id=${id}`);
    dispatch(getBookingSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getBookingListsFailure(err));
    }
  }
};
export const emptyState = () => async (dispatch, getState) => {
  dispatch(getLoadingFalse());
};

export const getBookingsByStatus = (status) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/trip/tripquerybyStatus?status=${status}`);
    dispatch(getBookingListsSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getBookingListsFailure(err));
    }
  }
};

export const bookCar = (body) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  await api
    .post(`/booking/addNewBooking`, body)
    .then((response) => {
      dispatch(addBooking(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getBookingListsFailure(err));
      }
    });
};

export const updateBooking = (body, id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  await api
    .put(`/car/updateCarStatus/${id}`, body)
    .then((response) => {
      dispatch(updateBookingSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getBookingListsFailure(err));
      }
    });
};

export const updateCarInBooking =
  (car_id, booking_id) => async (dispatch, getState) => {
    const body = { car_id: car_id };
    dispatch(getLoadingLists());
    await api
      .put(`/booking/changeCar/${booking_id}`, body)
      .then((response) => {
        dispatch(updateBookingSuccess(response.data.data));
        dispatch(getBooking(booking_id));
        dispatch(setAlertMessage(response.data.message, "success"));
      })
      .catch((err) => {
        if (err.response) {
          dispatch(setAlertMessage(err.response.data.message, "error"));
          dispatch(getBookingListsFailure(err));
        }
      });
  };

export const approveBooking = (body, id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  await api
    .put(`/booking/approveBooking/${id}`, body)
    .then((response) => {
      dispatch(updateBookingSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getBookingListsFailure(err));
      }
    });
};

export const cancelBooking = (body, id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());

  await api
    .put(`/booking/admin/cancelBooking/${id}`, body)
    .then((response) => {
      dispatch(updateBookingSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getBookingListsFailure(err));
      }
    });
};

export const endBooking = (body, id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());

  await api
    .put(`/booking/endRide/${id}`, body)
    .then((response) => {
      dispatch(updateBookingSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getBookingListsFailure(err));
      }
    });
};

export const getInvoiceLink = (id) => async (dispatch, getState) => {
  // dispatch(getLoadingLists());
  try {
    const res = await api.get(`/invoice/${id}`);
    dispatch(getInvoiceLinkSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(getBookingListsFailure(err));
    }
  }
};
export const updateInvoice = (id) => async (dispatch, getState) => {
  // dispatch(getLoadingLists());
  dispatch(setAlertMessage("Generating invoice...", "info", 6000));
  await api
    .put(`/invoice/uploadinvoice/${id}`)
    .then((response) => {
      dispatch(updateInvoiceSuccess(response.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getInvoiceLink(id));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getBookingListsFailure(err));
      }
    });
};
