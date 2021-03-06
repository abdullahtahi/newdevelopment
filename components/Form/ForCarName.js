import React, { useState } from "react";
import Alert from "../Alert/Alert";
import {
  makeStyles,
  TextField,
  Grid,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Button,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import "./Form.css";

const Form = ({ forminputs, handleSubmit, handleChange, header }) => {
  const classes = useStyles();
  const location = useLocation();
  const active_url = location.pathname.split("/");
  const [errorNameMessage, seteerrorNameMessage] = useState("");
  const [error, seterror] = useState(false);
  const [errortype, seterrortype] = useState("");

  const validation = (value, att, name) => {
    if (att == "text") {
      if (!value.match(/^[a-zA-Z_ ]*$/) || value.length > 200) {
        seteerrorNameMessage("Only letters allowed.");
        handleChange(name, " ");
        seterror(true);
        seterrortype("text");
      } else {
        seteerrorNameMessage("");
        seterror(false);
      }
    }
    if (att == "email") {
      let regEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regEmail.test(value)) {
        seteerrorNameMessage("Invalid Email");
        handleChange(name, "");
        seterror(true);
        seterrortype("email");
      } else {
        seteerrorNameMessage("");
        seterror(false);
      }
    }
    if (att == "password") {
      if (value.length < 5) {
        seteerrorNameMessage("Password is too short");
        handleChange(name, "");
        seterror(true);
        seterrortype("password");
      } else {
        seteerrorNameMessage("");
        seterror(false);
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className="alert-container">
        <Alert />
      </div>
      <Typography className={classes.heading2}>
        {active_url[2] == "add" ? "Add" : "Edit"} {header}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12} sm={6}>
        <FormControl
            variant="outlined"
            className={classes.formControl}
            style={{ marginTop: 10 }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              {forminput.label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              style={{ width: 350 }}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={forminput.value}
              name={forminput.name}
              label={forminput.label}
            >
              <MenuItem value=""> -- select -- </MenuItem>
              {forminput.data &&
                forminput.data.map((record) => (
                  <MenuItem
                    key={record._id}
                    value={record._id}
                    selected={record._id == forminput.value}
                  >
                    {record.brand_name ||
                      record.city_name ||
                      record.feature_name ||
                      record.fullname ||
                      record.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              style={{ width: 350, marginTop: 10, marginBottom: 10 }}
              id="outlined-uncontrolled"
              variant="outlined"
              type={"text"}
              value={forminput.value}
              name={forminput.name}
              placeholder={forminput.placeholder}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              label={forminput.label}
            />
            <FormHelperText id="my-helper-text" style={{ color: "red" }}>
              {forminput.type == errortype &&
                errorNameMessage &&
                errorNameMessage}
            </FormHelperText>
          </FormControl>
     
        </Grid>
        <Grid container style={{ marginTop: 20 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
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
