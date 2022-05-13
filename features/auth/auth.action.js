import api from "../../api/index";
import { setAlertMessage } from "../alert/alert.action";
import {
  loginSuccess,
  loginFailed,
  logoutSuccess,
  getLoading,
  registerSuccess,
  registerFailure,
  forgetEmailSuccess,
  changePasswordSuccess,
  changePasswordFailed,
} from "./auth.reducers";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = (body) => async (dispatch) => {
  dispatch(getLoading());
  await api
    .post(`/staff/login`, body, config)
    .then((res) => {
      return dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);

        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(loginFailed(err));
      }
    });
};

export const googleLogin = (googleData) => async (dispatch) => {
  dispatch(getLoading());
  const body = JSON.stringify({
    token: googleData.tokenId,
  });

  await api
    .post(`/staff/google/login`, body, config)
    .then((res) => dispatch(loginSuccess(res.data)))
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(loginFailed(err));
      }
    });
};

export const forgetPassword = (email) => async (dispatch) => {
  dispatch(getLoading());
  if (!email) {
    dispatch(setAlertMessage("Please enter valid email", "error."));
    return;
  }
  const body = {
    email,
  };
  await api
    .put(`/staff/password/forgot`, body, config)
    .then((res) => {
      dispatch(setAlertMessage(res.data.data.status, "success"));
      dispatch(forgetEmailSuccess(res.data));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(loginFailed(err));
      }
    });
};

export const changePassword = (id, body) => async (dispatch) => {
  dispatch(getLoading());

  await api
    .put(`/staff/changePassword/${id}`, body)
    .then((res) => {
      dispatch(setAlertMessage(res.data.message, "success"));
      dispatch(changePasswordSuccess(res.data));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(changePasswordFailed(err));
      }
    });
};

export const register =
  (email, password, confirmPassword, role) => async (dispatch) => {
    if (confirmPassword != password) {
      dispatch(setAlertMessage("Passwords doesn't match", "error"));
      return;
    }
    dispatch(getLoading());
    const body = {
      email,
      password,
      role,
    };
    await api
      .post(`/staff/registerAdmin`, body, config)
      .then((res) => dispatch(registerSuccess(res.data)))
      .catch((err) => {
        if (err) {
          dispatch(setAlertMessage(err.response.data.message.message, "error"));
          dispatch(registerFailure(err));
        }
      });
  };

export const logout = (id) => async (dispatch) => {
  dispatch(getLoading());
  await api
    .delete(`/staff/logout/${id}`)
    .then((response) => {
      dispatch(logoutSuccess());
      localStorage.removeItem("token");
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(registerFailure(err));
      }
    });
};
