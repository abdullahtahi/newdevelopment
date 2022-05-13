import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  makeStyles,
  Button,
  Divider,
  Grid,
} from "@material-ui/core";
import MaterialTable from "material-table";
import { updateCarInBooking } from "../../features/booking/booking.action";
import icons from "./icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Booking.css";

const AvailableCars = ({ booking_id, hours, fetchAvailableCars }) => {
  const classes = useStyles();
  let dispatch = useDispatch();

  const { availableCars, loading } = useSelector((state) => state.car);

  const getTotalBill = (hours, rentpertenhours) => {
    let totalBill;
    const _hours = Math.ceil(hours / 10);
    return (totalBill = _hours * rentpertenhours);
  };
  const renderOnwerLink = (params) => {
    return (
      <Link
        to={`/owners/${params.owner_id}`}
        style={{ textDecoration: "none", color: "black" }}
        target="_blank" rel="noopener noreferrer"
      >
        {params.owner_name}
      </Link>
    );
  };
  const renderCarLink = (params) => {
    return (
      <Link
        to={`/cars/${params._id}`}
        target="_blank" rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "black" }}
      >
        {params.car_name}
      </Link>
    );
  };

  const changeCarApiCall = (car_id) => {
    dispatch(updateCarInBooking(car_id, booking_id));
    fetchAvailableCars();
  };
  const columns = [
    {
      field: "s",
      title: "S #",
    },
    {
      field: "car_name",
      title: "Car",
      render: renderCarLink,
    },
    {
      field: "rent",
      title: "Rent ",
    },
    {
      field: "owner_name",
      title: "Owner Name ",
      render: renderOnwerLink,
    },
  ];

  let rows = [];
  if (availableCars) {
    let s = 1;
    availableCars.forEach((hist) => {
      rows.push({
        s: s++,
        _id: hist._id,
        rent: hist.rent,
        car_name:
          hist.brand.brand_name +
          " " +
          hist.car_name.name +
          " " +
          hist.model +
          " ( " +
          hist.registeration_number +
          " ) ",
        owner_name: hist.owner_id.fullname,
        owner_id: hist.owner_id._id,
        feature: hist.features,
        brand: hist.brand.brand_name,
        make: hist.car_name.name,
        engine_capacity: hist.engine_capacity,
        seating_capacity: hist.car_seating_capacity,
        registeration_number: hist.registeration_number,
        model: hist.model,
        is_driver: hist.is_driver,
        pickup_date: moment(hist.availableFrom_date).format(
          "DD - MMMM - YYYY HH:mm:ss a"
        ),
        dropoff_date: moment(hist.availableTo_date).format(
          "DD - MMMM - YYYY HH:mm:ss a"
        ),
      });
    });
  }

  return loading ? (
    <CircularProgress className="loader" style={{ marginTop: 50 }} />
  ) : (
    <div className="table-availablecars">
      <MaterialTable
        title=""
        icons={icons}
        data={rows}
        columns={columns}
        sortable={false}
        detailPanel={[
          {
            tooltip: "Show Name",
            render: (rowData) => {
              return (
                <div className={classes.mainRow}>
                  <div className={classes.row}>
                    <p>Brand : </p>
                    <p>{rowData.brand}</p>
                  </div>
                  <div className={classes.row}>
                    <p>Make : </p>
                    <p>{rowData.make}</p>
                  </div>
                  <div className={classes.row}>
                    <p>Registration Number : </p>
                    <p> {rowData.registeration_number}</p>
                  </div>
                  <div className={classes.row}>
                    <p> Engine Capacity :</p>
                    <p> {rowData.engine_capacity}</p>
                  </div>
                  <div className={classes.row}>
                    <p> Seating Capacity : </p>
                    <p>{rowData.seating_capacity}</p>
                  </div>
                  <div className={classes.row}>
                    <p> Model : </p>
                    <p>{rowData.model}</p>
                  </div>
                  <div className={classes.row}>
                    <p>Driver : </p>
                    <p>
                      {rowData.is_driver ? (
                        <CheckCircleIcon color="primary" />
                      ) : (
                        <CancelIcon color="secondary" />
                      )}
                    </p>
                  </div>
                  <p>Features : </p>

                  <div className="featureholder">
                    {rowData.feature.map((featr) => {
                      return (
                        <p className={classes.features}>{featr.feature_name}</p>
                      );
                    })}
                  </div>
                  <Divider style={{ marginTop: 5, marginBottom: 5 }} />

                  <Grid container className={classes.row}>
                    <p>
                      Total Bill for
                      {Math.floor(hours) < 10 ? 10 : Math.floor(hours)} hours is{" "}
                      {getTotalBill(hours, rowData.rent)}
                    </p>
                    <Button
                      className={classes.btn}
                      onClick={() => changeCarApiCall(rowData._id)}
                      justify="flex-end"
                    >
                      {" "}
                      Request Booking{" "}
                    </Button>
                  </Grid>
                </div>
              );
            },
          },
        ]}
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
      />{" "}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: "white",
    color: "#1F1D61",
    border: "1px solid #1F1D61",
    textTransform: "initial",
    borderRadius: 5,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1F1D61",
      color: "white",
    },
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainRow: {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 230,
    marginRight: 230,
  },
}));

export default AvailableCars;
