import React from "react";
import { Chip } from "@material-ui/core";
import "./ActionButton.css";

const StatusButtons = ({ booking_status }) => {
  return (
    <Chip
      variant="outlined"
      className={booking_status == "Booked" ? "statusActive" : "statusInActive"}
      size="small"
      label={booking_status}
    />
  );
};
export default StatusButtons;
