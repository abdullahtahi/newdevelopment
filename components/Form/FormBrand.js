import React from "react";
import "./Form.css";
import Alert from "../Alert/Alert";
import {
  makeStyles,
  TextField,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Form = ({ forminputs, uploadImageCall, handleSubmit, handleChange }) => {
  const { imageUrl } = useSelector((state) => state.image);
  const classes = useStyles();
  const location = useLocation();
  const active_url = location.pathname.split("/");

  return (
    <div className={classes.root}>
      <div className="alert-container">
        <Alert />
      </div>
      <Typography className={classes.heading2}>
        {active_url[2] == "add" ? "Add" : "Edit"} Brand
      </Typography>

      <form onSubmit={handleSubmit}>
        {forminputs.map((forminput) => (
          <Grid container>
            {forminput.type == "file" && (
              <TextField
                id="outlined-uncontrolled"
                variant="outlined"
                style={{ marginTop: 20, marginBottom: 20, width: 350 }}
                type={forminput.type}
                value={active_url[2] == "edit" ? forminput.value : ""}
                name={forminput.name}
                onChange={(e) => {
                  uploadImageCall(e);
                }}
              />
            )}
            {forminput.type == "text" && (
              <TextField
                id="outlined-uncontrolled"
                style={{ width: 350 }}
                label="Brand Name"
                variant="outlined"
                type={forminput.type}
                value={forminput.value}
                name={forminput.name}
                onChange={handleChange}
              />
            )}
          </Grid>
        ))}

        {imageUrl && active_url[2] == "add" && (
          <img src={imageUrl} width="180px" height="180px" />
        )}
        {!imageUrl && active_url[2] == "edit" && (
          <img src={forminputs[1].value} width="180px" height="180px" />
        )}
        <Grid container style={{ marginTop: 20 }}>
          <Button
            type="submit"
            variant="contained"
            style={{ width: 180,backgroundColor:'#1F1D61' ,color:'white' }}
          >
            Submit
          </Button>
        </Grid>
      </form>
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
export default Form;
