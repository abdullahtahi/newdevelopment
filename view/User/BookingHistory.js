import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, CircularProgress, makeStyles, Tooltip } from "@material-ui/core";
import Alert from "../../components/Alert/Alert";
import MaterialTable from "material-table";
import icons from "./icons";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import { AiFillEye } from "react-icons/ai";

import "./User.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
  },
  label: {
    fontSize: "12px",
  },
  heading2: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
  },
  heading1: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
    color: "black",
  },
  label1: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  btn: {
    backgroundColor: "#1F1D61",
    color: "white",
    border: "1px solid white",
    textTransform: "initial",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1F1D61",
    },
  },
  Pending: {
    color: "#f9b115",
    border: "1px solid #f9b115",
    fontWeight: "bold",
  },
  Rejected: {
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  bstatuscancelled: {
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  bstatusprogress: {
    border: "1px solid #2eb85c",
    fontWeight: "bold",
    color: "#2eb85c",
    backgroundColor: "white",
  },
  bstatusend: {
    border: "1px solid #1F1D61",
    color: "#1F1D61",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  bstatusApproved: {
    border: "1px solid #2eb85c",
    color: "#2eb85c",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  pstatusPending: {
    color: "#f9b115",
    border: "1px solid #f9b115",
    fontWeight: "bold",
  },
  Cleared: {
    border: "1px solid #2eb85c",
    color: "#2eb85c",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  NotCleared: {
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
    backgroundColor: "white",
  },
}));

const ViewUser = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const location = useLocation();
  let { id } = useParams();

  const { data } = location && location.state;
  const { user, loading, history, clearance } = useSelector(
    (state) => state.users
  );
  const [bookingDetails, setBookingDetails] = useState(data && data.bookings);
  const [totalearned, settotalearned] = useState(data && data.totalEarned);
  const [company_profit, setcompany_profit] = useState(
    data && data.company_profit
  );
  const [dateRange, setdateRange] = useState(data && data._id);

  // const clearAccountCall = () => {
  //     const body = { clear_account: true };
  //     dispatch(clearUserAccount(body, user_id));
  //     setOpenClearModal(false);
  // };

  const renderStatusButton = (params) => {
    return (
      <Chip
        variant="outlined"
        color="warning"
        size="small"
        className={
          params?.is_cleared
            ? classes?.bstatusApproved
            : classes?.bstatuscancelled
        }
        label={params.is_cleared ? "Cleared" : "Not-cleared"}
      ></Chip>
    );
  };

  const renderActionButton = (params) => {
    return (
      <>
        <Tooltip title="View Details">
          <Link to={`/bookings/${params._id}`}>
            <AiFillEye
              size={25}
              style={{
                padding: 2,
                border: "1px solid #1F1D61",
                borderRadius: 8,
                backgroundColor: "white",
                color: "#1F1D61",
              }}
            />
          </Link>
        </Tooltip>
      </>
    );
  };
  const renderBookingStatusButton = (params) => {
    return (
      <Chip
        variant="outlined"
        color="warning"
        size="small"
        className={classes.bstatusend}
        label={params.booking_status}
      ></Chip>
    );
  };
  const columns = [
    {
      field: "booking_number",
      title: "Trip Number",
      width: 60,
    },
    {
      field: "car_name",
      title: "Vehicle ",
    },
    {
      field: "booking_status",
      title: "Trip Status",
      render: renderBookingStatusButton,
    },
    {
      field: "final_bill",
      title: "Total Bill",
    },
    {
      field: "company_profit",
      title: "Company Profit",
    },
    {
      field: "status",
      title: "Status",
      render: renderStatusButton,
    },
    {
      field: "action",
      title: "Action",
      render: renderActionButton,
    },
  ];

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const getDateRange = (date) => {
    let month = new Date(date).getMonth();
    let day = new Date(date).getDate();
    let year = new Date(date).getFullYear();

    const endOfMonth = moment(date).endOf("month").format("DD/MMM/YYYY");

    let modifiedRange;
    if (day == 1) {
      modifiedRange =
        "01" + " - " + "15" + "/" + monthNames[month] + "/" + year;
    } else if (day == 16) {
      modifiedRange = day + " - " + endOfMonth;
    }
    return modifiedRange;
  };

  let rows = [];
  if (bookingDetails) {
    let s = 1;
    bookingDetails.forEach((hist) => {
      rows.push({
        _id: hist._id,
        booking_number: hist.booking_number,
        booking_status: hist.booking_status,
        is_cleared: hist.is_cleared,
        company_profit: hist.company_profit.toFixed(2),
        numberOfBookings: hist.numberOfBookings,
        final_bill: hist.final_bill.toFixed(2),
        car_name:
          hist.company +
          " " +
          hist.car_name +
          " " +
          hist.model +
          " ( " +
          hist.type +
          " ) ",
      });
    });
  }

  return loading ? (
    <CircularProgress className="loader" style={{ marginTop: 50 }} />
  ) : (
    <>
      <div className="users">
        <div className="table">
          <div className="table__head">
            <Grid container>
              <Grid item xs={6}>
                <h2 className={classes.heading2}>
                  Trips History <br /> {getDateRange(dateRange)}
                </h2>
              </Grid>
            </Grid>
          </div>

          <div className="alert-container">
            <Alert />
          </div>
          <div style={{ width: "100%" }}>
            {loading ? (
              <CircularProgress className="loader" />
            ) : (
              <MaterialTable
                title={
                  <div>
                    <h6 className={classes.label1}>
                      Total Earnings: {totalearned}
                    </h6>
                    <h6 className={classes.label1}>
                      Total Company Profit: {company_profit}
                    </h6>
                  </div>
                }
                icons={icons}
                data={rows}
                columns={columns}
                sortable={false}
                options={{
                  pageSize: 20,

                  search: true,

                  headerStyle: {
                    fontWeight: "bold",
                  },
                  rowStyle: {
                    fontSize: 14,
                    // fontWeight: "bold",
                    color: "#604339",
                    letterSpacing: "0.5px",
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
