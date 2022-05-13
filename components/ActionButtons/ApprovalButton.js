import React from "react";
import { Chip } from "@material-ui/core";
import "./ActionButton.css";

const ApprovalButtons = ({ approval_status }) => {
  return (
    <Chip
      variant="contained"
      className={
        approval_status == "approved"
          ? "Approved"
          : approval_status == "rejected"
          ? "Rejected"
          : "Pending"
      }
      size="small"
      label={approval_status}
    />
  );
};

export default ApprovalButtons;
