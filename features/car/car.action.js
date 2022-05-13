import api from "../../api/index";
import {
  getLoadingLists,
  getCarListsFailure,
  getCarListsSuccess,
  getCarSuccess,
  updateCarSuccess,
  addCarSuccess,
  getLoading,
  getCarAvailableListsSuccess,
  getCarSearch,
  getEmptyCarSearch,
  getEditLoadingLists,
  getNonBooked,
  getAvailablityLoading,
  updateAvailabilitySuccess,
} from "./car.reducer";
import { setAlertMessage } from "../alert/alert.action";

// get All car
export const getAllCars = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/vehicle`);
    dispatch(getCarListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarListsFailure(err));
    }
  }
};

export const getAvailableCars =
  (brand, pickupdate, dropdate, city, carId) => async (dispatch, getState) => {
    dispatch(getLoadingLists());
    try {
      const res = await api.get(
        `/car?availableFrom_date=${pickupdate}&availableTo_date=${dropdate}&brand=${brand}&city=${city}`
      );
      const filteredCars = res?.data.data.filter(function (item) {
        return item._id != carId;
      });
      dispatch(getCarAvailableListsSuccess(filteredCars));
    } catch (err) {
      if (err.response) {
        // dispatch(setAlertMessage(err.response.data.message, "warning"));
        dispatch(getCarListsFailure(err));
      }
    }
  };

export const searchCar = (query) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(
      // `/car?availableFrom_date=${query.pickupdate}&availableTo_date=${query.dropoffdate}&brand=${query.brand}&city=${query.city}&longitude=${query.longitude}&latitude=${query.latitude}&car_name=${query.car_name}`
      `/car?availableFrom_date=${query.pickupdate}&availableTo_date=${query.dropoffdate}&brand=${query.brand}&city=${query.city}&car_name=${query.car_name}&is_driver=${query.is_driver}`
    );
    dispatch(getCarSearch(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarListsFailure(err));
    }
  }
};

export const getNonBookedCars = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/car`);
    dispatch(getNonBooked(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarListsFailure(err));
    }
  }
};

export const filterCar = (query) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  let getquery = `/car?availableFrom_date=${query.pickupdate}&availableTo_date=${query.dropoffdate}&brand=${query.brand}&city=${query.city}&pickup_point=${query.pickup_point}&car_name=${query.car_name}&minEngine=${query.minEngineCapacity}&maxEngine=${query.maxEngineCapacity}&minRent=${query.minRent}&maxRent=${query.maxRent}&minModel=${query.minModel}&maxModel=${query.maxModel}&transmission=${query.transmission}`;
  query.selectedfeatures.map((item) => {
    getquery = getquery + "&features=" + item;
  });
  try {
    const res = await api.get(getquery);
    dispatch(getCarSearch(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarListsFailure(err));
    }
  }
};

export const emptySearch = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  dispatch(getEmptyCarSearch());
};

export const getCar = (id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/vehicle?_id=${id}`);
    dispatch(getCarSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarListsFailure(err));
    }
  }
};

export const getCarByStatus = (status) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(
      `/vehicle?is_active=${status == "active" ? true : false}`
    );
    dispatch(getCarListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarListsFailure(err));
    }
  }
};

export const getCarByBookingStatus = (value) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/car/getallcars/admin`);
    const result = res?.data?.data?.filter((rec) => rec.is_booked == true);

    dispatch(getCarListsSuccess(result));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarListsFailure(err));
    }
  }
};

export const getRealTimeAvailableCars = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/car/getAvailableCars`);
    dispatch(getCarListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarListsFailure(err));
    }
  }
};

export const getRealTimeNonAvailableCars = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/car/getNonAvailableCars`);
    dispatch(getCarListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getCarListsFailure(err));
    }
  }
};

export const updateCar = (body, id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  await api
    .put(`/vehicle/${id}`, body)
    .then((response) => {
      dispatch(updateCarSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getCarListsFailure(err));
      }
    });
};

export const updateCarStatus = (body, id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  await api
    .put(`/vehicle/updateVehicleStatus/${id}`, body)
    .then((response) => {
      dispatch(updateCarSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getCarListsFailure(err));
      }
    });
};

export const updateEditCar = (body, id) => async (dispatch, getState) => {
  dispatch(getEditLoadingLists());
  await api
    .put(`/vehicle/${id}`, body)
    .then((response) => {
      dispatch(updateCarSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getCarListsFailure(err));
      }
    });
};

export const deleteCarImages = (_body, id) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  let body = { imageIndex: _body };
  await api
    .put(`/car/admin/deleteCarImage/${id}`, body)
    .then((response) => {
      dispatch(updateAvailabilitySuccess(response.data.data));
      dispatch(getCar(id));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getCarListsFailure(err));
      }
    });
};

export const updateAvailability = (body, id) => async (dispatch, getState) => {
  dispatch(getAvailablityLoading());
  await api
    .put(`/car/admin/updateCar/${id}`, body)
    .then((response) => {
      dispatch(updateAvailabilitySuccess(response.data.data));
      dispatch(getCar(id));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getCarListsFailure(err));
      }
    });
};

export const addCar = (body) => async (dispatch, getState) => {
  dispatch(getLoading());
  try {
    const res = await api.post(`/vehicle/add`, body);
    dispatch(addCarSuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
    dispatch(getAllCars());
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getCarListsFailure(err));
    }
  }
};
