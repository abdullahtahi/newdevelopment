import React, { useState, useEffect } from "react";
import { addCategoryPricing } from "../../features/car_pricing/carpricing.action";
import { setAlertMessage } from "../../features/alert/alert.action";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getAllCategories } from "../../features/car_category/carcategory.action";
import { getAllBrands } from "../../features/brand/brand.action";
import { getAllCarByBrand } from "../../features/carname/carname.action";
import Alert from "../../components/Alert/Alert";
import {
  TextField,
  Grid,
  CircularProgress,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
const Pricing = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const { carnamebyBrand } = useSelector((state) => state.carname);
  const { car_categories } = useSelector((state) => state.carcategory);
  const { brands } = useSelector((state) => state.brand);
  const [car_namebybrand, set_car_namebybrand] = useState(carnamebyBrand);
  const { loading } = useSelector((state) => state.carpricing);
  const [years, setYears] = useState([]);
  const [brand, setbrand] = useState();
  const [carname, setcarname] = useState([]);
  const [category, setcategory] = useState("");
  const [model, set_model] = useState([]);

  const brandProps = {
    options: brands,
    getOptionLabel: (option) => option.brand_name,
  };
  const handleChangeBrand = (event, value) => {
    if (!value) return;
    set_brand_func(value);
  };
  const set_brand_func = (value) => {
    dispatch(getAllCarByBrand(value._id));
    setbrand(value._id);
    set_car_namebybrand(carnamebyBrand);
  };
  const getYears = () => {
    var d = new Date("01 " + "January 2012");
    let first = d.getFullYear();
    var s = new Date();
    let second = s.getFullYear();
    let arr = Array();

    for (var i = first; i <= second; i++) arr.push(i);
    setYears(arr);
  };
  useEffect(() => {
    getYears();
  }, []);

  const yearProps = {
    options: years,
    getOptionLabel: (option) => `${option}`,
  };

  const categoryProps = {
    options: car_categories,
    getOptionLabel: (option) => `${option.name}`,
  };

  // CAR NAME DROPDOWN
  const carnameProps = {
    options: carnamebyBrand,
    getOptionLabel: (option) => option.name,
  };
  const handleChangeCarname = (event, value) => {
    if (!value) return;
    // setcarname(value._id);
    const tempArr = [];
    value.forEach((res) => {
      tempArr.push(res._id);
    });
    setcarname(tempArr);
  };
  const handleChangeModel = (event, value) => {
    if (!value) return;
    const tempArr = [];
    value.forEach((res) => {
      tempArr.push(res);
    });
    set_model(tempArr);
  };
  const handleChangeCategory = (event, value) => {
    if (!value) return;
    setcategory(value._id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let _body = [];
    carname.forEach((element) => {
      model.forEach((_model) => {
        _body.push({
          brand: brand,
          car_name: element,
          category: category,
          model: _model,
        });
      });
    });

    if (!brand) {
      dispatch(setAlertMessage("Please select brand.", "error"));
      return;
    }
    if (carname.length == 0) {
      dispatch(setAlertMessage("Please select car name.", "error"));
      return;
    }
    if (category.length == 0) {
      dispatch(setAlertMessage("Please select category.", "error"));
      return;
    }
    if (model.length == 0) {
      dispatch(setAlertMessage("Please select reason.", "error"));
      return;
    }
    _body.forEach((res) => {
      dispatch(addCategoryPricing(res));
    });
    setbrand("");
    set_model(new Date());
    setcarname("");
  };
  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllCategories());
  }, []);
  // if (saved == true) {
  //   return <Redirect to="/category" />;
  // }
  return (
    <div className="mainForm">
      <div className={classes.root}>
        <Typography className={classes.heading2}>{"Add Price"}</Typography>

        <form onSubmit={handleSubmit}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                {...categoryProps}
                id="controlled-demo"
                onChange={handleChangeCategory}
                renderInput={(params) => (
                  <TextField
                    name={"Category"}
                    style={{ marginTop: 15 }}
                    variant={"outlined"}
                    value={category}
                    autoComplete="false"
                    {...params}
                    label="Category"
                    margin="normal"
                    placeholder="--select--"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>
          {loading ? (
            <CircularProgress className="loader" style={{ marginTop: 50 }} />
          ) : (
            <>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  {...brandProps}
                  id="controlled-demo"
                  onChange={handleChangeBrand}
                  clearOnEscape={true}
                  renderInput={(params) => (
                    <TextField
                      id={"brand"}
                      style={{ marginTop: 15 }}
                      {...params}
                      variant={"outlined"}
                      label="Brand Name"
                      placeholder="--select--"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  {...carnameProps}
                  multiple
                  id="controlled-demo"
                  onChange={handleChangeCarname}
                  renderInput={(params) => (
                    <TextField
                      name={"brand"}
                      placeholder="--select--"
                      style={{ marginTop: 15 }}
                      variant={"outlined"}
                      value={carname}
                      {...params}
                      label="Car Name"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  {...yearProps}
                  multiple
                  id="controlled-demo"
                  onChange={handleChangeModel}
                  renderInput={(params) => (
                    <TextField
                      name={"Model"}
                      placeholder="--select--"
                      style={{ marginTop: 15 }}
                      variant={"outlined"}
                      value={model}
                      {...params}
                      label="Model"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid container style={{ marginTop: 20 }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "#1F1D61", color: "white" }}
                >
                  Submit
                </Button>
              </Grid>{" "}
            </>
          )}
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
export default Pricing;
