import api from "../../api/index";
import {
  getLoadingLists,
  getEarningsListsFailure,
  getEarningsListsSuccess,
} from "./earnings.reducer";
import { setAlertMessage } from "../alert/alert.action";

// get All Earnings
export const getAllEarnings = (body) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await api.get(
      `/payment/usersummery/${body.startDate}/${body.endDate}`
    );
    console.log(res)
    dispatch(getEarningsListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getEarningsListsFailure(err));
    }
  }
};
