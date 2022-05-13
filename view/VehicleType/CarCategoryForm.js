import React, { useEffect, useState } from "react";
import { addCategory } from "../../features/car_category/carcategory.action";
import { setAlertMessage } from "../../features/alert/alert.action";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import api from "../../api/index";
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
  const { car_categories, saved } = useSelector((state) => state.carcategory);
  const [type, setType] = useState("");
  const [rent, setRent] = useState(0);
  const [max_weight, setMaxWeight] = useState(0);
  const [min_weight, setMinWeight] = useState(0);
  const [image, setTypeImage] = useState();
  const [waiting_charges, setWaitingCharges] = useState(0);

  const uploadImage = async (formData) => {
    try {
      const config = {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      };

      const res = await api.post(`/upload/uploadFile`, formData, config);
      setTypeImage(res.data.locationArray[0].fileLocation);
    } catch (err) {
      if (err.response) {
        dispatch(setAlertMessage(err.response.message, "error"));
      }
    }
  };
  const upload = async (e) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    await uploadImage(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type) {
      dispatch(setAlertMessage("Please fill type.", "error"));
      return;
    } else if (!rent) {
      dispatch(setAlertMessage("Please fill rent price.", "error"));
      return;
    } else if (!max_weight) {
      dispatch(setAlertMessage("Please fill max weight.", "error"));
      return;
    } else if (!min_weight) {
      dispatch(setAlertMessage("Please fill min weight.", "error"));
      return;
    } else if (!waiting_charges) {
      dispatch(setAlertMessage("Please fill waiting Charges.", "error"));
      return;
    } else if (!image) {
      dispatch(setAlertMessage("Please upload image.", "error"));
      return;
    }
    let body = {
      type: type,
      min_weight,
      max_weight,
      rent,
      waiting_charges,
      image,
    };
    dispatch(addCategory(body));
  };

  if (saved == true) {
    return <Redirect to="/types" />;
  }

  return (
    <div className="mainForm">
      <div className={classes.root}>
        <Typography className={classes.heading2}>
          {"Add Vehicle Type"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4} sm={12} xs={12} lg={12}>
            <Grid item xs={3} sm={3}>
              <TextField
                style={{ width: 305 }}
                id="outlined-uncontrolled"
                variant="outlined"
                type={"text"}
                value={type}
                name={"type"}
                placeholder={"Vehicle Type"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setType(e.target.value)}
                label={"Vehicle Type"}
              />
            </Grid>
            <Grid item xs={6} sm={12}>
              <TextField
                style={{ width: 305 }}
                id="outlined-uncontrolled"
                variant="outlined"
                type={"text"}
                value={rent}
                name={"rent"}
                placeholder={"Rent"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setRent(e.target.value)}
                label={"Rent"}
              />
            </Grid>
            <Grid item xs={6} sm={12}>
              <TextField
                style={{ width: 305 }}
                id="outlined-uncontrolled"
                variant="outlined"
                type={"text"}
                value={max_weight}
                name={"max_weight"}
                placeholder={"max weight"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setMaxWeight(e.target.value)}
                label={"Max Weight"}
              />
            </Grid>
            <Grid item xs={6} sm={12}>
              <TextField
                style={{ width: 305 }}
                id="outlined-uncontrolled"
                variant="outlined"
                type={"text"}
                value={min_weight}
                name={"min_weight"}
                placeholder={"min weight"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setMinWeight(e.target.value)}
                label={"Min Weight"}
              />
            </Grid>
            <Grid item xs={6} sm={12}>
              <TextField
                style={{ width: 305 }}
                id="outlined-uncontrolled"
                variant="outlined"
                type={"text"}
                value={waiting_charges}
                name={"waiting_charges"}
                placeholder={"Waiting Charges"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setWaitingCharges(e.target.value)}
                label={"Waiting Charges"}
              />
            </Grid>

            <Grid item xs={6} sm={12}>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                multiple
                name={"image"}
                onChange={(e) => upload(e)}
              />
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: 20 }}>
            <Button
              type="submit"
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
