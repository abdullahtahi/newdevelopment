import api from "../../api/index";
import {
  getLoadingLists,
  getUploadSuccess,
  getUploadFailure,
  getUploadRegistrationImageSuccess,
  getUploadCarImageSuccess,
  emptyUrl,
  getRegistrationUpload,
  getCarUpload,
} from "./imageUpload.reducer";
import { setAlertMessage } from "../alert/alert.action";
import {
  updateFrontCnicImages,
  updateBackCnicImages,
} from "../users/user.action";
export const uploadImage = (formData) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const config = {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    };
    const res = await api.post(`/upload/uploadFile`, formData, config);
    if (res.data.message) {
      dispatch(setAlertMessage(res.data.message, "success"));
    } else {
      dispatch(setAlertMessage(res.data.error, "error"));
    }
    dispatch(getUploadSuccess(res.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.message.error, "error"));
      dispatch(getUploadFailure(err));
    }
  }
};

export const uploadCnicFrontImage =
  (formData, id) => async (dispatch, getState) => {
    dispatch(getLoadingLists());
    try {
      const config = {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      };
      const res = await api.post(`/upload/uploadFile`, formData, config);
      dispatch(
        updateFrontCnicImages(res.data.locationArray[0]?.fileLocation, id)
      );
      if (res.data.message) {
        dispatch(setAlertMessage(res.data.message, "success"));
      } else {
        dispatch(setAlertMessage(res.data.error, "error"));
      }
    } catch (err) {
      if (err.response) {
        dispatch(setAlertMessage(err.response.message.error, "error"));
        dispatch(getUploadFailure(err));
      }
    }
  };

export const uploadCnicBackImage =
  (formData, id) => async (dispatch, getState) => {
    dispatch(getLoadingLists());
    try {
      const config = {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      };
      const res = await api.post(`/imageupload/imageUpload`, formData, config);
      dispatch(
        updateBackCnicImages(res.data.locationArray[0]?.fileLocation, id)
      );
      if (res.data.message) {
        dispatch(setAlertMessage(res.data.message, "success"));
      } else {
        dispatch(setAlertMessage(res.data.error, "error"));
      }
    } catch (err) {
      if (err.response) {
        dispatch(setAlertMessage(err.response.message.error, "error"));
        dispatch(getUploadFailure(err));
      }
    }
  };

export const _emptyUri = () => async (dispatch, getState) => {
  dispatch(emptyUrl());
};

export const uploadRegistrationImage =
  (formData) => async (dispatch, getState) => {
    dispatch(getRegistrationUpload());
    try {
      const config = {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      };
      const res = await api.post(`/imageupload/imageUpload`, formData, config);
      if (res.data.message) {
        dispatch(setAlertMessage(res.data.message, "success"));
      } else {
        dispatch(setAlertMessage(res.data.error, "error"));
      }
      dispatch(getUploadRegistrationImageSuccess(res.data));
      // dispatch(setAlertMessage(res.data.message, "success"));
    } catch (err) {
      if (err.response) {
        dispatch(setAlertMessage(err.response.message, "error"));
        dispatch(getUploadFailure(err));
      }
    }
  };

export const uploadCarImages = (formData) => async (dispatch, getState) => {
  dispatch(getCarUpload());
  try {
    const config = {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    };
    const res = await api.post(`/imageupload/imageUpload`, formData, config);
    if (res.data.message) {
      dispatch(setAlertMessage(res.data.message, "success"));
    } else {
      dispatch(setAlertMessage(res.data.error, "error"));
    }
    dispatch(getUploadCarImageSuccess(res.data));
    // dispatch(setAlertMessage(res.data.message, "success"));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.message, "error"));
      dispatch(getUploadFailure(err));
    }
  }
};
