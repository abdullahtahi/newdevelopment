import React, { useState, useEffect } from "react";
import { addCategory } from "../../features/car_category/carcategory.action";
import { setAlertMessage } from "../../features/alert/alert.action";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getByCategoryId } from "../../features/car_pricing/carpricing.action";
import Alert from "../../components/Alert/Alert";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

const Categor = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const { saved } = useSelector((state) => state.carcategory);
  const { car_prices } = useSelector((state) => state.carpricing);
  console.log(car_prices);
  let { id } = useParams();
  useEffect(() => {
    dispatch(getByCategoryId(id));
  }, []);
  const getTableRows = () => {};
  return (
    <div className="mainForm">
      <div className={classes.root}>
        <Typography className={classes.heading2}>
          {"Add Cars to Category"}
        </Typography>
        <Typography>{`Category Name: ${
          car_prices && car_prices[0] && car_prices[0]?.category?.name
        }`}</Typography>
        <Typography>{`Min Price: ${
          car_prices && car_prices[0] && car_prices[0]?.category?.min_price
        }`}</Typography>
        <Typography>{`Max Price: ${
          car_prices && car_prices[0] && car_prices[0]?.category?.max_price
        }`}</Typography>

        <table>
          <thead>
            <th>S#</th>
            <th>Car Name</th>
          </thead>
          <tbody>
            {" "}
            {car_prices?.map((res) => {
              <tr>
                {res?.brand?.brand_name} {res?.car_name?.name} {res?.model}
              </tr>;
            })}
          </tbody>
        </table>

        <form>
          <Grid container spacing={4} sm={12} xs={12} lg={12}></Grid>

          <Grid container style={{ marginTop: 20 }}>
            <Button
              type="submit"
              tukgmftvasghjsd
              variant="contained"
              style={{ backgroundColor: "#1F1D61", color: "white" }}
            >
              Submit
            </Button>
          </Grid>
        </form>
        <div className="alert-container" style={{ marginTop: 20 }}>
          <Alert />
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: 460,
    width: "max-width",
    backgroundColor: theme.palette.background.paper,
    paddingTop: 20,
    paddingBottom: 35,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 20,
  },
  heading2: {
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: 1.2,
    color: "#2D1967",
    marginBottom: 20,
  },
  primary: {
    margin: "auto",
  },
}));
export default Categor;
