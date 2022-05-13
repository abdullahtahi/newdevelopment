import React from "react";
import { Grid, CircularProgress, Chip, makeStyles } from "@material-ui/core";
import Alert from "../Alert/Alert";
import EditActionButton from "../ActionButtons/EditActionButton";
import ViewActionButton from "../ActionButtons/ViewActionButton";
import icons from "../SearchTable/icons";
import MaterialTable from "material-table";
import moment from "moment";
import Tabs from "../Tabs/CarTabs";
import StatusButtons from "../ActionButtons/StatusButton";
import ApprovalButton from "../ActionButtons/ApprovalButton";
import AvailableButton from "../ActionButtons/AvailableButton";
import "./Table.css";

const TableCars = ({
  header,
  loading,
  cars,
  getAllCars,
  getCarByStatus,
  getNonAvailableCars,
  getAvailableCars,
  value,
  setValue,
}) => {
  const renderActionButton = (params) => {
    return (
      <>
        <EditActionButton path={`/editcar/${params.action}`} />
        <ViewActionButton path={`/cars/${params.action}`} />
      </>
    );
  };
  const styles = useStyles();

  const renderStatusButton = (params) => {
    return (
      <Chip
        variant="contained"
        className={
          params.approval_status == "Active"
            ? styles.statusActive
            : styles.statusInActive
        }
        size="small"
        label={params.approval_status}
      />
    );
  };
  const columns = [
    { field: "id", title: "S#" },
    {
      field: "name",
      title: "Name",
    },
    {
      field: "owner_name",
      title: "Owner Name",
    },

    {
      field: "registeration_number",
      title: "Registration Number",
    },

    {
      field: "approval_status",
      title: "Approval Status",
      render: renderStatusButton,
    },
    {
      field: "action",
      title: "Action",
      render: renderActionButton,
    },
  ];

  let rows = [];
  if (cars) {
    let s = 1;
    cars.forEach((car) => {
      rows.push({
        id: s++,
        image: car?.registration_book_img,
        name: car?.car_name?.name,
        owner_name: car?.owner?.fullname ? car?.owner?.fullname : "-",
        approval_status: car?.is_active ? "Active" : "In active",
        registeration_number: car?.registration_number,
        action: car._id,
      });
    });
  }

  return (
    <Grid item xs={12}>
      <div className="viewMainDiv">
        <div className="viewMainDiv__head">
          <h2>{header}</h2>
        </div>
        <div className="alert-container">
          <Alert />
        </div>
        <div>
          {loading ? (
            <CircularProgress className="loader" />
          ) : (
            <>
              <MaterialTable
                style={{ overflow: "scroll" }}
                title={
                  <Tabs
                    value={value}
                    setValue={setValue}
                    getAllCars={getAllCars}
                    getCarByStatus={getCarByStatus}
                    getAvailableCars={getAvailableCars}
                    getNonAvailableCars={getNonAvailableCars}
                  />
                }
                icons={icons}
                data={rows}
                columns={columns}
                options={{
                  pageSize: 100,
                  pageSizeOptions: [5, 20, 50, 100],
                  paginationType: "stepped",
                  paging: true,
                  search: true,
                  headerStyle: {
                    fontWeight: "bold",
                  },
                  rowStyle: {
                    fontSize: 14,
                    color: "#604339",
                    letterSpacing: "0.5px",
                  },
                  showFirstLastPageButtons: true,
                }}
              />
            </>
          )}
        </div>
      </div>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  statusActive: {
    backgroundColor: "white",
    border: "1px solid green",
    color: "#2eb85c",
    fontWeight: "bold",
  },
  statusInActive: {
    backgroundColor: "white",
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
  },
}));
export default TableCars;
