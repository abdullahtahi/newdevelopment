import React from "react";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import "./ActionButton.css";

const ViewActionButton = ({ path }) => {
  return (
    <Tooltip title="View Details">
      <Link to={path}>
        <AiFillEye size={25} className="icon-view" />
      </Link>
    </Tooltip>
  );
};

export default ViewActionButton;
