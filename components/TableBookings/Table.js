import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Grid, Chip } from "@material-ui/core";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch } from "react-redux";
import Alert from "../Alert/Alert";
import { Tooltip } from "@material-ui/core";
import "./Table.css";
import icons from "../SearchTable/icons";
import MaterialTable from "material-table";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import { useHistory } from "react-router-dom";

const TableBooking = ({
  header,
  loading,
  bookings,
  getBookingListByStatus,
  getAllBooking,
  value,
  setValue,
}) => {
  let dispatch = useDispatch();
  const styles = useStyles();
  let history = useHistory();
  const renderPaymentStatusButton = (params) => {
    return (
      <Chip
        variant="outlined"
        color="warning"
        size="small"
        className={
          params.payment_status === "pending"
            ? styles.pstatusPending
            : params.payment_status === "complete"
            ? styles.pstatusComplete
            : params.payment_status === "verified"
            ? styles.pstatusVerified
            : styles.pstatusNotVerified
        }
        label={params.payment_status}
      />
    );
  };
  const renderBookingStatusButton = (params) => {
    return (
      <Chip
        variant="outlined"
        className={
          params?.booking_status === "accepted"
            ? styles?.bstatusApproved
            : params?.booking_status === "cancelled"
            ? styles?.bstatuscancelled
            : params?.booking_status === "inprogress"
            ? styles?.bstatusprogress
            : params?.booking_status === "ended"
            ? styles?.bstatusend
            : styles?.pstatusPending
        }
        size="small"
        label={params.booking_status}
      />
    );
  };
  const renderActionButton = (params) => {
    return (
      <Grid justifyContent="center">
        <Tooltip title="View Details">
          <Link to={`/bookings/${params.action}`}>
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
      </Grid>
    );
  };
  const columns = [
    { field: "id", title: "Trip Number", sortable: true },
    {
      field: "car_name",
      title: "Vehicle",
    },
    {
      field: "owner_name",
      title: "Captain",
      sortable: false,
    },
    {
      field: "customer",
      title: "Customer",
      sortable: false,
    },
    {
      field: "booking_status",
      title: "Booking Status",
      sortable: false,
      render: renderBookingStatusButton,
    },
    {
      field: "payment_status",
      title: "Payment",
      sortable: false,
      render: renderPaymentStatusButton,
    },
    {
      field: "createdAt",
      title: "Date Created",
      sortable: false,
    },
    {
      field: "updatedAt",
      title: "Date Updated",
      sortable: false,
    },
    {
      field: "action",
      title: "Action",
      sortable: false,
      render: renderActionButton,
    },
  ];
  let rows = [];
  if (bookings) {
    bookings.forEach((booking) => {
      rows.push({
        id: booking?.t_id,
        booking_status: booking?.status.slice(-1)[0].status,
        car_name: booking.vehicle?.car_name?.name
          ? booking.vehicle?.car_name?.name
          : "",
        owner_name: booking?.captain ? booking.captain.fullname : "",
        payment_status: booking.payment_mode,
        customer: booking?.customer ? booking.customer.fullname : "",
        createdAt: booking?.createdAt
          ? moment(booking?.createdAt)
              .utcOffset("+0500")
              .format("DD-MMM-YYYY HH:mm:ss")
          : "-",
        updatedAt: booking?.updatedAt
          ? moment(booking?.updatedAt)
              .utcOffset("+0500")
              .format("DD-MMM-YYYY HH:mm:ss")
          : "-",
        action: booking._id,
      });
    });
  }
  return (
    <Grid item xs={12}>
      <div className="viewuser">
        <div className="viewuser__head">
          <h2 className={styles.heading2}>{header}</h2>
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
                <Tabs
                  className={styles.tabs}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  value={value}
                >
                  <Tab
                    className={styles.tab}
                    value={0}
                    label="All trips"
                    onClick={() => {
                      dispatch(getAllBooking());
                      history.push("/bookings#all");
                      setValue(0);
                    }}
                  />
                  <Tab
                    className={styles.tab}
                    value={1}
                    label="pending"
                    onClick={() => {
                      getBookingListByStatus("pending");
                      history.push("/bookings#pending");
                      setValue(1);
                    }}
                  />
                  <Tab
                    className={styles.tab}
                    value={2}
                    label="accepted"
                    onClick={() => {
                      getBookingListByStatus("accepted");
                      history.push("/bookings#accepted");
                      setValue(2);
                    }}
                  />

                  <Tab
                    className={styles.tab}
                    value={3}
                    label="started"
                    onClick={() => {
                      getBookingListByStatus("started");
                      history.push("/bookings#started");
                      setValue(3);
                    }}
                  />
                  <Tab
                    className={styles.tab}
                    value={4}
                    label="ended"
                    onClick={() => {
                      getBookingListByStatus("ended");
                      history.push("/bookings#ended");
                      setValue(4);
                    }}
                  />
                  <Tab
                    className={styles.tab}
                    value={5}
                    label="cancelled"
                    onClick={() => {
                      getBookingListByStatus("cancelled");
                      history.push("/bookings#cancelled");
                      setValue(5);
                    }}
                  />
                </Tabs>
              }
              icons={icons}
              data={rows}
              columns={columns}
              options={{
                pageSize: 100,
                pageSizeOptions: [5, 20, 50, 100],
                paginationType: "stepped",
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
    </Grid>
  );
};
const useStyles = makeStyles({
  heading2: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
  },
  pstatusPending: {
    color: "#f9b115",
    border: "1px solid #f9b115",
    fontWeight: "bold",
  },
  pstatusComplete: {
    border: "1px solid #2eb85c",
    color: "#2eb85c",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  pstatusVerified: {
    border: "1px solid #2eb85c",
    fontWeight: "bold",
    color: "#2eb85c",
    backgroundColor: "white",
  },
  pstatusNotVerified: {
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
  bstatuscancelled: {
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  tabs: {
    marginBottom: "2px",
    margin: "0px",
    padding: "0px",
  },
  tab: {
    fontSize: "12px",
    margin: "0px",
    padding: "0px",
  },
});

export default TableBooking;
