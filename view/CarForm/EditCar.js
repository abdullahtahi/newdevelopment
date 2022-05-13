import React, { useState, useEffect } from "react";
import { getCar, updateEditCar } from "../../features/car/car.action";
import api from "../../api/index";
import Alert from "../../components/Alert/Alert";
import { useParams } from "react-router-dom";
import "./EditCar.css";
import {
  FormHelperText,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  TextField,
  CircularProgress,
  Button,
  Checkbox,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "../../features/alert/alert.action";
import "./AddCar.css";
import { Redirect } from "react-router-dom";
import { getAllBrands } from "../../features/brand/brand.action";
import { getActiveUser } from "../../features/users/user.action";
import { getAllCategories } from "../../features/car_category/carcategory.action";
import { getAllCarByBrand } from "../../features/carname/carname.action";
import { Autocomplete } from "@material-ui/lab";

const EditCar = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 465,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    updateButton: {
      backgroundColor: "#1F1D61",
      color: "white",
      width: 150,
    },
    regBookdiv: {
      height: 200,
      margin: "10px auto",
    },
    regBookImag: {
      height: "inherit",
      overflow: "auto",
      width: "auto",
    },
    carImages: {
      overflow: "auto",
      height: 200,
      margin: 10,
    },
    Pending: {
      backgroundColor: "#f9b115",
      color: "white",
    },
    Rejected: {
      backgroundColor: "#e55353",
      color: "white",
    },
    Approved: {
      backgroundColor: "#2EB85C",
      color: "white",
    },
  }));
  let dispatch = useDispatch();
  let { id } = useParams();
  const { car, editCarLoader } = useSelector((state) => state.car);
  async function fetchMyAPI() {
    dispatch(getCar(id));
  }
  const { saved, loading } = useSelector((state) => state.car);
  const [car_name, set_car_name] = useState(car[0]?.car_name);
  const { carnamebyBrand } = useSelector((state) => state.carname);
  const { car_categories } = useSelector((state) => state.carcategory);
  const [type, setType] = useState(car[0]?.type);
  const { brands } = useSelector((state) => state.brand);
  const [rent, set_rent] = useState(car[0]?.rent);
  const [fuel, setFuel] = useState(car[0]?.fuel);
  const [color, setColor] = useState(car[0]?.color);
  const [max_weight, setMaxWeight] = useState(car[0]?.max_weight);
  const [brand, set_brand] = useState(car[0]?.brand);
  const [car_namebybrand, set_car_namebybrand] = useState(carnamebyBrand);
  const [waiting_charges, setWaitingCharges] = useState(
    car[0]?.waiting_charges
  );
  const [registeration_book, set_registeration_book] = useState(
    car[0]?.registration_book_img
  );
  const [model, set_model] = useState(car[0]?.model);
  const [car_seating_capacity, set_car_seating_capacity] = useState(
    car[0]?.seating_capacitiy
  );
  const [car_engine_capacity, set_car_engine_capacity] = useState(
    car[0]?.engine_capacitiy
  );
  const [registeration_number, set_registeration_number] = useState(
    car[0]?.registration_number
  );
  const [inspection_location, set_inspection_location] = useState(
    car[0]?.inspection_details?.location
  );
  const [inspection_date, set_inspection_date] = useState(
    new Date(car[0]?.inspection_details?.date)
  );
  const classes = useStyles();
  useEffect(() => {
    fetchMyAPI(id);
    dispatch(getAllBrands());
    dispatch(getActiveUser());
    dispatch(getAllCategories());
  }, []);

  const set_brand_func = (_id) => {
    dispatch(getAllCarByBrand(_id));
    set_brand(_id);
    set_car_namebybrand(carnamebyBrand);
  };

  useEffect(() => {
    if (car.length > 0 && id) {
      set_rent(car[0]?.rent);
      setFuel(car[0].fuel);
      setColor(car[0].color);
      setWaitingCharges(car[0]?.waiting_charges);
      setMaxWeight(car[0].max_weight);
      set_car_name(car[0]?.car_name);
      set_registeration_number(car[0]?.registration_number);
      set_model(car[0]?.model);
      set_car_seating_capacity(car[0]?.seating_capacitiy);
      set_car_engine_capacity(car[0]?.engine_capacitiy);
      set_registeration_book(car[0]?.registration_book_img);
      set_inspection_date(new Date(car[0]?.inspection_details?.date));
      set_inspection_location(car[0]?.inspection_details?.location);
    }
  }, [car]);

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
      set_registeration_book(res.data.locationArray[0].fileLocation);
    } catch (err) {
      if (err.response) {
        dispatch(setAlertMessage(err.response.message, "error"));
      }
    }
  };
  const updateRegistrationImageFunc = async (e) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    await uploadImage(formData);
  };

  // BRAND DROPDOWN
  const brandProps = {
    options: brands,
    getOptionLabel: (option) => option.name,
  };
  const handleChangeBrand = (event, value) => {
    if (!value) return;
    set_brand_func(value._id);
    set_car_name("");
  };

  // CAR NAME DROPDOWN
  const carnameProps = {
    options: carnamebyBrand,
    getOptionLabel: (option) => option.name,
  };

  const handleChangeCarname = (event, value) => {
    set_car_name(value._id);
  };

  //Vehicle Type Dropdown
  const vehicleTypesProps = {
    options: car_categories,
    getOptionLabel: (option) => option.type,
  };
  const handleChangeVehicleType = (event, value) => {
    setType(value._id);
  };

  if (saved == true) {
    return <Redirect to="/cars" />;
  }

  const updateCarFunction = async () => {
    const modified_model = model && new Date(model).getFullYear();
    let body = {
      car_name: car_name,
      registration_number: registeration_number,
      seating_capacitiy: car_seating_capacity,
      engine_capacitiy: car_engine_capacity,
      fuel,
      color,
      model: modified_model,
      registration_book_img: registeration_book,
      max_weight,
      waiting_charges,
      rent,
      type,
      company: brand,
      inspection_details: {
        date: inspection_date,
        location: inspection_location,
      },
    };
    dispatch(updateEditCar(body, id));
  };
  console.log(car[0]);

  return loading && car.length == 0 ? (
    <CircularProgress className="loader" style={{ marginTop: 50 }} />
  ) : (
    <div className="flex-space-around">
      <div className="formCar">
        <div className="addCar_head">
          <Grid item xs={12} sm={6} align="left">
            <h2>{"Edit Car"}</h2>
          </Grid>
        </div>
        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              name="brand"
              {...brandProps}
              onChange={handleChangeBrand}
              defaultValue={brand == undefined ? car[0]?.company : brand}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  name="brand"
                  label="Select Brand"
                  placeholder="Brand"
                />
              )}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              {...carnameProps}
              id="controlled-demo"
              onChange={handleChangeCarname}
              defaultValue={car_name == undefined ? car[0]?.car_name : car_name}
              renderInput={(params) => (
                <TextField
                  name={"car_name"}
                  value={car_name}
                  {...params}
                  label="Vehicle Name"
                  margin="normal"
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              {...vehicleTypesProps}
              id="controlled-demo"
              onChange={handleChangeVehicleType}
              defaultValue={type == undefined ? car[0]?.type : type}
              renderInput={(params) => (
                <TextField
                  name={"type"}
                  value={type}
                  {...params}
                  label="Vehicle Type"
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl
              className={classes.formControl}
              style={{ marginTop: 16 }}
            >
              <TextField
                name={"rent"}
                placeholder={"200"}
                value={rent}
                onChange={(e) => set_rent(e.target.value)}
                id="standard-basic"
                label="Rent"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <TextField
                placeholder={"AAA-111"}
                value={registeration_number}
                onChange={(e) => set_registeration_number(e.target.value)}
                id="standard-basic"
                label="Registration Number"
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <TextField
                value={car_seating_capacity}
                name={"car_seating_capacity"}
                placeholder={"4"}
                onChange={(e) => set_car_seating_capacity(e.target.value)}
                id="standard-basic"
                inputProps={{ maxLength: 1, minLength: 1 }}
                label="Seating Capacity"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                margin="normal"
                id="date-picker-inline"
                label="Model"
                minDate={new Date("2012")}
                maxDate={new Date()}
                openTo="year"
                views={["year"]}
                value={new Date(model.toString())}
                onChange={set_model}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                style={{ width: 465 }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl
              className={classes.formControl}
              style={{ marginTop: 16 }}
            >
              <TextField
                name={"engine_capacity"}
                placeholder={"1800"}
                value={car_engine_capacity}
                onChange={(e) => set_car_engine_capacity(e.target.value)}
                id="standard-basic"
                label="Engine ( CC )"
                inputProps={{ maxLength: 4, minLength: 4 }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <FormControl
              className={classes.formControl}
              style={{ marginTop: 16 }}
            >
              <TextField
                name={"waiting_charges"}
                placeholder={"20"}
                value={waiting_charges}
                onChange={(e) => setWaitingCharges(e.target.value)}
                id="standard-basic"
                label="Waiting Charges"
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl
              className={classes.formControl}
              style={{ marginTop: 16 }}
            >
              <TextField
                name={"color"}
                placeholder={"white"}
                value={color}
                onChange={(e) => setColor(e.target.value)}
                id="standard-basic"
                label="Color"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <FormControl
              className={classes.formControl}
              style={{ marginTop: 16 }}
            >
              <InputLabel id="demo-simple-select-label">
                Inspection location
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                name={"inspection_location"}
                required
                className="form-control"
                onChange={(e) => set_inspection_location(e.target.value)}
                value={
                  inspection_location == undefined
                    ? car[0]?.inspection_details?.inspection_location
                    : inspection_location
                }
              >
                <MenuItem value=""> --select-- </MenuItem>
                <MenuItem key={"service_center"} value={"service_center"}>
                  {"Service Center"}
                </MenuItem>
                <MenuItem key={"home"} value={"home"}>
                  {"Home"}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={3} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                disableToolbar
                variant="inline"
                margin="normal"
                id="date-picker-inline"
                label="Inspection Date"
                value={inspection_date}
                minDate={new Date()}
                onChange={(date) => set_inspection_date(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                style={{ width: 465 }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>

        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <label htmlFor="input-field" style={{ fontWeight: "bold" }}>
              Fuel
            </label>
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fuel == "petrol"}
                  onChange={(e) => setFuel("petrol")}
                  required
                  style={{ color: "#1F1D61" }}
                />
              }
              label="Petrol"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={fuel == "cng"}
                  required
                  onChange={(e) => setFuel("cng")}
                  style={{ color: "#1F1D61" }}
                />
              }
              label="Cng"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl
              className={classes.formControl}
              style={{ marginTop: 16 }}
            >
              <TextField
                name={"max_weight"}
                placeholder={"1800"}
                value={max_weight}
                onChange={(e) => setMaxWeight(e.target.value)}
                id="standard-basic"
                label="Max Weight (kg)"
                inputProps={{ maxLength: 4, minLength: 4 }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sm={12} xs={12} lg={12}>
          <Grid item sm={12} xs={12}>
            <p style={{ fontWeight: "bold" }}>Registration Book</p>
            <div
              style={{
                display: "inline-flex",
                flexWrap: "wrap",
              }}
            >
              {registeration_book != "" && (
                <div
                  style={{
                    width: 300,
                    margin: 10,
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src={registeration_book} className={classes.carImages} />
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg"
              multiple
              name={"registeration_book"}
              onChange={(e) => updateRegistrationImageFunc(e)}
            />
          </Grid>
        </Grid>
        <div
          className="alert-container"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          <Alert />
        </div>
        <Button
          variant="contained"
          className={classes.updateButton}
          onClick={() => updateCarFunction()}
        >
          {editCarLoader ? (
            <>
              {" "}
              <CircularProgress color="white" />
              Updating...
            </>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditCar;
