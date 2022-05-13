import React, { useState, useEffect } from "react";
import {
  addCarName,
  getCarName,
  updateCarName,
} from "../../features/carname/carname.action";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "../../features/alert/alert.action";
import { useParams, useLocation } from "react-router-dom";
import { getAllBrands } from "../../features/brand/brand.action";
import Select from "react-select";
import {
  CircularProgress,
  Typography,
  Grid,
  FormControl,
  FormHelperText,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import Alert from "../../components/Alert/Alert";
import "./CarName.css";

const CarNameForm = () => {
  let dispatch = useDispatch();
  const { saved, carname, loading } = useSelector((state) => state.carname);
  const { brands } = useSelector((state) => state.brand);
  const location = useLocation();
  const styles = useStyles();
  const classes = useStyles();
  let { id } = useParams();
  const active_url = location.pathname.split("/");
  const [name, setname] = useState("");
  const [brand, setbrand] = useState("");
  const [errortype, seterrortype] = useState("");
  const [errorMessage, seteerrorMessage] = useState("");
  const [error, seterror] = useState(false);

  function fetchMyAPI() {
    dispatch(getCarName(id));
  }
  function fetchBrands() {
    dispatch(getAllBrands());
  }

  useEffect(() => {
    fetchBrands();
    if (id) {
      fetchMyAPI(id);
    }
  }, []);

  useEffect(() => {
    if (id && carname.length > 0) {
      const _brand = {
        value: carname[0].company._id,
        label: carname[0].company.name,
      };
      setname(carname[0].name);
      setbrand(_brand);
    }
  }, [carname]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: name,
      company: brand.value,
    };
    if (!name || !brand) {
      dispatch(setAlertMessage("Please fill properly.", "error"));
      return;
    }
    if (id) {
      dispatch(updateCarName(body, id));
    } else {
      dispatch(addCarName(body));
      setname("");
      setbrand(brand);
    }
  };
  const handleChange = (name, value) => {
    if (name == "name") {
      setname(value);
    } else if (name == "brand") {
      setbrand(value);
    }
  };

  const handleChangeBrand = (event) => {
    if (!event) return;
    setbrand(event);
  };

  const optionsBrand = [];
  brands.forEach((res) => {
    optionsBrand.push({ value: res._id, label: res.name });
  });
  const validation = (type, name, value) => {
    if (type == "name") {
      if (!value.match(/^([a-zA-Z0-9 _-]+)$/) || value.length > 200) {
        seteerrorMessage("Only letters allowed.");
        setname("");
        seterror(true);
        seterrortype("name");
      } else {
        seteerrorMessage("");
        seterror(false);
      }
    }
  };
  if (active_url[2] == "edit" && brand == "" && carname.length > 0) {
    const _brand = {
      value: carname[0].company._id,
      label: carname[0].company.name,
    };
    setbrand(_brand);
  }

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      padding: 20,
      fontWeight: "bold",
    }),
  };
  return (
    <div className="mainForm">
      <div className={classes.root}>
        {loading ? (
          <CircularProgress className="loader" />
        ) : (
          <>
            <Typography className={styles.heading2}>
              {active_url[2] == "add" ? "Add" : "Edit"} Car Name
            </Typography>
            <form onSubmit={handleSubmit}>
              
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" className={styles.formControl}>
                  <TextField
                    id="outlined-uncontrolled"
                    variant="outlined"
                    value={name}
                    name={"name"}
                    label={"Name"}
                    placeholder={"Enter name"}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    onBlur={() => validation("name", "name", name)}
                  />
                  <FormHelperText id="my-helper-text" className={styles.error}>
                    {errortype == "name" && errorMessage && errorMessage}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} className={styles.formControl}>
                <Select
                  onChange={(e) => handleChangeBrand(e)}
                  className="basic-single"
                  classNamePrefix="Select Brand"
                  isClearable={true}
                  isSearchable={true}
                  options={optionsBrand}
                  defaultValue={brand}
                  placeholder="Select Brand"
                  styles={customStyles}
                />
              </Grid>
              <Grid container style={{ marginTop: 20 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ width: 180 }}
                >
                  Submit
                </Button>
              </Grid>
              <div className="alert-container" style={{ marginTop: 20 }}>
                <Alert />
              </div>
            </form>
          </>
        )}
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
  error: {
    color: "red",
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 340,
  },
}));

export default CarNameForm;
