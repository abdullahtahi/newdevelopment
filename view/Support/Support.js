import React, { useEffect } from "react";
import SearchTable from "../../components/SearchTable/SearchTable";
import {
  getAllSupportUsers,
  deleteSupportUser,
} from "../../features/support/support.action";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Tooltip } from "@material-ui/core";
import moment from "moment";
import "./Support.css";

const Support = () => {
  let dispatch = useDispatch();
  const { supportsUsers, loading } = useSelector((state) => state.support);
  useEffect(() => {
    dispatch(getAllSupportUsers());
  }, []);

  const deleteUser = (id) => {
    dispatch(deleteSupportUser(id));
  };

  const renderActionButton = (params) => {
    return (
      <Tooltip title="Delete">
        <Button onClick={() => deleteUser(params.action)}>
          <DeleteIcon
            className="action-buttons"
            color="secondary"
            fontSize="medium"
            style={{
              padding: 2,
              border: "1px solid #F50057",
              borderRadius: 8,
              backgroundColor: "white",
              color: "#F50057",
            }}
          />
        </Button>
      </Tooltip>
    );
  };
  const columns = [
    { field: "id", title: "S#" },
    {
      field: "email",
      title: "Email",
    },
    // {
    //   field: "createdAt",
    //   title: "Date Created",
    //   sortable: false,
    //   width: 630,
    // },
    // {
    //   field: "updatedAt",
    //   title: "Date Updated",
    //   sortable: false,
    //   width: 630,
    // },
    {
      field: "action",
      title: "Action",
      render: renderActionButton,
    },
  ];

  let rows = [];
  if (supportsUsers) {
    let s = 1;
    supportsUsers.forEach((user) => {
      rows.push({
        id: s++,
        email: user.email,
        // createdAt: user.createdAt
        //   ? moment(user.createdAt)
        //       .utcOffset("+0500")
        //       .format("DD-MMM-YYYY HH:mm:ss")
        //   : "-",
        // updatedAt: user.updatedAt
        //   ? moment(user.updatedAt)
        //       .utcOffset("+0500")
        //       .format("DD-MMM-YYYY HH:mm:ss")
        //   : "-",
        action: user._id,
      });
    });
  }
  return (
    <div className="feature">
      <SearchTable
        rows={rows}
        columns={columns}
        header={"Support"}
        path={"support"}
        loading={loading}
      />
    </div>
  );
};

export default Support;
