import api from "../../api/index";
import {
  getLoadingLists,
  getUsersListsFailure,
  getUsersListsSuccess,
  getUserSuccess,
  updateUserSuccess,
  getUsersHistoryListsSuccess,
  getUserClearance,
  getActiveUsers,
  updateCnicSuccess,
} from "./user.reducers";
import { setAlertMessage } from "../alert/alert.action";
import { uploadImage } from "../imageUpload/imageUpload.action";

export const getAllUsers = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/user`);
    dispatch(getUsersListsSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const getAllUserHistory = (id) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/payment/userhistory/${id}`);
    const payload = res && res.data;
    dispatch(getUsersHistoryListsSuccess(payload));
  } catch (err) {
    if (err) {
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const getUser = (id) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/user?_id=${id}`);
    dispatch(getUserSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const getActiveUser = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/user`);
    let captains = res.data.data.filter((user) => user.user_role === "captain");
    dispatch(getActiveUsers(captains));
  } catch (err) {
    if (err) {
      dispatch(getUsersListsFailure(err));
    }
  }
};
export const getActiveRenterUser = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/user/getonlyactive/renter/users`);
    dispatch(getActiveUsers(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getUsersListsFailure(err));
    }
  }
};
export const getUserClearanceDetails = (id) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/wallet/${id}`);
    dispatch(getUserClearance(res.data));
  } catch (err) {
    if (err) {
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const getUsersByRole = (role) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/user?user_role=${role}`);
    dispatch(getUsersListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const getUsersByStatus = (role, status) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/user?user_role=${role}&is_active=${status}`);
    dispatch(getUsersListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(getUsersListsSuccess([]));
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const getOwnersCarCount = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/user/getUsersCarsCount`);
    dispatch(getUsersListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getUsersListsFailure(err));
    }
  }
};

// export const updateUser = (body, id) => async (dispatch) => {
//   dispatch(getLoadingLists());
//   await api
//     .put(`/user/activateOwnerAccount/${id}`, body)
//     .then((response) => {
//       dispatch(updateUserSuccess(response.data.data));
//       dispatch(setAlertMessage(response.data.message, "success"));
//       dispatch(getAllUsers());
//     })
//     .catch((err) => {
//       if (err.response) {
//         dispatch(setAlertMessage(err.response.data.message, "error"));
//         dispatch(getUsersListsFailure(err));
//       }
//     });
// };
export const updateUser = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await api
    .put(`/user/updateUser/${id}`, body)
    .then((response) => {
      dispatch(updateUserSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllUsers());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getUsersListsFailure(err));
      }
    });
};

export const updateUserStatus = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await api
    .put(`/user/updateUserStatus/${id}`, body)
    .then((response) => {
      dispatch(updateUserSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllUsers());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getUsersListsFailure(err));
      }
    });
};

export const clearUserAccount = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await api
    .put(`/user/clearuser/${id}`, body)
    .then((response) => {
      dispatch(updateUserSuccess(response.data.data));
      dispatch(getAllUserHistory(id));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllUsers());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getUsersListsFailure(err));
      }
    });
};

export const uploadCnic = (formData, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  const config = {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
  };
  const res = await api
    .post(`/imageupload/imageUpload`, formData, config)
    .then((response) => {
      dispatch(uploadImage);
      // dispatch(
      //   updateUserCnincImages(response.data.data.locationArray[0]?.fileLocation)
      // );
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getUsersListsFailure(err));
      }
    });
};
export const updateBackCnicImages = (_body, id) => async (dispatch) => {
  let body = { cnic_back_image: _body };
  dispatch(getLoadingLists());
  await api
    .put(`/user/updateUser/${id}`, body)
    .then((response) => {
      let payload = [];
      payload.push(response.data.data);
      dispatch(updateCnicSuccess(payload));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getUsersListsFailure(err));
      }
    });
};

export const updateFrontCnicImages = (_body, id) => async (dispatch) => {
  let body = { cnic_front_image: _body };
  dispatch(getLoadingLists());
  await api
    .put(`/user/updateUser/${id}`, body)
    .then((response) => {
      let payload = [];
      payload.push(response.data.data);
      dispatch(updateCnicSuccess(payload));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getUsersListsFailure(err));
      }
    });
};
