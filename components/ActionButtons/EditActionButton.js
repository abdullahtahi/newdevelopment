import React from "react";
import "./ActionButton.css";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
const EditActionButton = ({ path }) => {
  return (
    <Tooltip title="Edit Details">
      <Link to={path}>
        <EditIcon size={25} className="icon-edit" />
      </Link>
    </Tooltip>
  );
};

export default EditActionButton;
