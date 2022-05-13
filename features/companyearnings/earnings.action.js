import api from "../../api/index";
import {
  getLoadingLists,
  getListsSuccess,
  getListsFailure,
} from "./earnings.reducer";
import { setAlertMessage } from "../alert/alert.action";

// get All Cities
export const getEarnings = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(`/payment/companyhistory`);
    const payload = res.data;
    dispatch(getListsSuccess(payload));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getListsFailure(err));
    }
  }
};
