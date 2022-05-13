import React, { useEffect } from "react";
import SearchTable from "../../components/SearchTable/SearchTable";
import {
  getAllAdminUsers,
  deleteAdminUser,
} from "../../features/admin/admin.action";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip } from "@material-ui/core";
import moment from "moment";
import "./Admin.css";

const Admin = () => {
  let dispatch = useDispatch();
  const { admins, loading } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getAllAdminUsers());
  }, []);

  const deleteUser = (id) => {
    dispatch(deleteAdminUser(id));
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
    { field: "id", title: "S#", width: 200, sortable: false },
    {
      field: "email",
      title: "Email",
      sortable: false,
      width: 630,
    },
    {
      field: "createdAt",
      title: "Date Created",
      sortable: false,
      width: 630,
    },
    {
      field: "updatedAt",
      title: "Date Updated",
      sortable: false,
      width: 630,
    },

    {
      field: "action",
      title: "Action",
      sortable: false,
      render: renderActionButton,
      width: 200,
    },
  ];

  let rows = [];
  if (admins) {
    let s = 1;
    admins.forEach((user) => {
      rows.push({
        id: s++,
        email: user.email,
        createdAt: user.createdAt
          ? moment(user.createdAt)
              .utcOffset("+0500")
              .format("DD-MMM-YYYY HH:mm:ss")
          : "-",
        updatedAt: user.updatedAt
          ? moment(user.updatedAt)
              .utcOffset("+0500")
              .format("DD-MMM-YYYY HH:mm:ss")
          : "-",
        action: user._id,
      });
    });
  }
  return (
    <div className="feature">
      <SearchTable
        rows={rows}
        columns={columns}
        header={"Admin"}
        path={"admins"}
        loading={loading}
      />
    </div>
  );
};

export default Admin;
