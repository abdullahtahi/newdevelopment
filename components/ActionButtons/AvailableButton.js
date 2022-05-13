import React from "react";
import { Chip } from "@material-ui/core";
import "./ActionButton.css";

const AvaiableButton = ({ available_status }) => {
  return (
    <Chip
      variant="contained"
      className={
        available_status == "Available"
          ? "statusActive"
          : available_status == "Not available"
          ? "statusInActive"
          : "statusInActive"
      }
      size="small"
      label={available_status}
    />
  );
};

export default AvaiableButton;
