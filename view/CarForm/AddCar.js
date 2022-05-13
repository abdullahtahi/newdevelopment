import React, { useState, useEffect } from "react";
import { getAllBrands } from "../../features/brand/brand.action";
import { getAllCarByBrand } from "../../features/carname/carname.action";
import Alert from "../../components/Alert/Alert";
import DateFnsUtils from "@date-io/date-fns";
import { Autocomplete } from "@material-ui/lab";
import {
  Grid,
  FormControl,
  FormControlLabel,
  TextField,
  CircularProgress,
  Button,
  Checkbox,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { getAllFeature } from "../../features/feature/feature.action";
import { getActiveUser } from "../../features/users/user.action";
import { addCar } from "../../features/car/car.action";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "../../features/alert/alert.action";
import api from "../../api/index";
import "./AddCar.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { Redirect } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import { getAllCategories } from "../../features/car_category/carcategory.action";
import moment from "moment";

const AddCar = () => {
  const useStyles = makeStyles((theme) => ({
    carImages: {
      height: 200,
      width: 280,
      margin: 10,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 450,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  let dispatch = useDispatch();
  const { activeUsers } = useSelector((state) => state.users);
  const { carnamebyBrand } = useSelector((state) => state.carname);
  const { brands } = useSelector((state) => state.brand);
  const { saved, addLoader } = useSelector((state) => state.car);
  const { car_categories } = useSelector((state) => state.carcategory);
  const [model, set_model] = useState(new Date());
  const [car_name, set_car_name] = useState("");
  const [car_namebybrand, set_car_namebybrand] = useState(carnamebyBrand);
  const [brand, set_brand] = useState("");
  const [registeration_book, set_registeration_book] = useState([]);
  const [owner_id, set_owner_id] = useState("");
  const [type, setType] = useState("");
  const [car_seating_capacity, set_car_seating_capacity] = useState("");
  const [engine_capacity, set_engine_capacity] = useState("");
  const [fuel, setFuel] = useState("petrol");
  const [color, setColor] = useState("");
  const [max_weight, setMaxWeight] = useState("");
  const [waiting_charges, setWaitingCharges] = useState("");
  const [rent, setRent] = useState("");
  const [inspection_date, set_inspection_date] = useState(new Date());
  const [inspection_location, set_inspection_location] =
    useState(" --select-- ");
  const [registeration_number, set_registeration_number] = useState("");
  const [images_name, ser_images_name] = useState([]);
  const [errorMessage, seteerrorMessage] = useState("");
  const [errortype, seterrortype] = useState("");
  const [regLoading, setregLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getActiveUser());
    dispatch(getAllCategories());
  }, []);

  const set_brand_func = (_id) => {
    dispatch(getAllCarByBrand(_id));
    set_brand(_id);
    set_car_namebybrand(carnamebyBrand);
  };

  const uploadImage = async (formData, type) => {
    setregLoading(true);
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
      setregLoading(false);
    } catch (err) {
      console.log(err);

      if (err.response) {
        dispatch(setAlertMessage(err.response.message, "error"));
      }
    }
  };
  const updateRegistrationImageFunc = async (e) => {
    e.preventDefault();
    let requestFile = e.target.files[0];
    const formData = new FormData();
    formData.append("files", requestFile);
    await uploadImage(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registeration_book.length == 0) {
      dispatch(setAlertMessage("Please upload registration book.", "error"));
      return;
    }

    const modified_model = model && model.getFullYear();
    if (
      !car_name ||
      !brand ||
      !modified_model ||
      !registeration_book ||
      !owner_id ||
      !car_seating_capacity ||
      !engine_capacity ||
      !fuel ||
      !registeration_number ||
      !color ||
      !max_weight ||
      !rent ||
      !waiting_charges ||
      !inspection_location ||
      !inspection_date ||
      !type
    ) {
      dispatch(setAlertMessage("Missing Information", "error"));
      return;
    }

    const body = {
      car_name: car_name,
      company: brand,
      model: modified_model,
      registration_book_img: registeration_book,
      owner: owner_id,
      seating_capacitiy: car_seating_capacity,
      engine_capacitiy: engine_capacity,
      fuel: fuel,
      registration_number: registeration_number,
      waiting_charges,
      rent,
      type,
      max_weight,
      color,
      inspection_details: {
        location: inspection_location,
        date: moment(inspection_date).seconds(0).milliseconds(0).toISOString(),
      },
      is_active: true,
    };
    dispatch(addCar(body));
    set_car_name("");
    set_brand("");
    set_model("");
    set_registeration_number("");
    set_registeration_book();
    set_owner_id("");
    set_car_seating_capacity("");
    set_engine_capacity("");
    setFuel("petrol");
    ser_images_name([]);
    set_inspection_location("");
    set_inspection_date("");
  };

  const validation = (name, value) => {
    if (name == "engincapacity") {
      const re = /^[0-9]+$/;
      if (!re.test(value) || value.length < 4) {
        seteerrorMessage(
          "Invalid Input, Engine number must be a 4 digit non negative value!"
        );
        seterrortype("enginecapacity");
        set_engine_capacity("");
      } else {
        seteerrorMessage("");
        seterrortype("");
        set_engine_capacity(value);
      }
    }
    if (name == "registeration_number") {
      if (!value.match(/^([a-zA-Z0-9 _-]+)$/)) {
        seteerrorMessage("Invalid format! Please follow this format AAA-111");
        seterrortype("registeration_number");
        set_registeration_number("");
      }
    }
    if (name == "car_seating_capacity") {
      const re = /^[0-9]+$/;
      if (!re.test(value)) {
        seteerrorMessage("Only positive numbers allowed");
        seterrortype("car_seating_capacity");
        set_car_seating_capacity("");
      }
    }
  };

  // **** Auto Complete select *****

  // OWNER DROPDOWN
  const ownersProps = {
    options: activeUsers,
    getOptionLabel: (option) => `${option.fullname} +92${option.mobile_number}`,
  };

  const handleChangeOwner = (event, value) => {
    if (!value) return;
    set_owner_id(value._id);
  };

  // BRAND DROPDOWN
  const brandProps = {
    options: brands,
    getOptionLabel: (option) => option.name,
  };
  const handleChangeBrand = (event, value) => {
    if (!value) return;
    // debugger;
    // set_car_name("");

    set_brand_func(value._id);
  };
  // CAR NAME DROPDOWN
  const carnameProps = {
    options: carnamebyBrand,
    getOptionLabel: (option) => option.name,
  };

  const handleChangeCarname = (event, value) => {
    set_car_name(value._id);
  };

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
  return (
    <div className="flex-space-around">
      <div className="formCar">
        <div className="addCar_head">
          <h2>{"Add Car"}</h2>
        </div>
        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              {...ownersProps}
              name="owner_id"
              onChange={handleChangeOwner}
              id="owner_id"
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={owner_id}
                  label="Owner Name"
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              {...brandProps}
              id="controlled-demo"
              onChange={handleChangeBrand}
              renderInput={(params) => (
                <TextField
                  name={"brand"}
                  value={brand}
                  {...params}
                  label="Company Name"
                  margin="normal"
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              {...carnameProps}
              id="controlled-demo"
              onChange={handleChangeCarname}
              renderInput={(params) => (
                <TextField
                  name={"car"}
                  value={car_name}
                  {...params}
                  label="Vehicle Name"
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              {...vehicleTypesProps}
              id="controlled-demo"
              onChange={handleChangeVehicleType}
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
                value={model}
                onChange={set_model}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                style={{ width: 450, marginLeft: 8 }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <TextField
                // type="number"
                name={"engine_capacity"}
                placeholder={"1800"}
                value={engine_capacity}
                onChange={(e) => set_engine_capacity(e.target.value)}
                id="standard-basic"
                label="Engine   ( CC )"
                inputProps={{ maxLength: 4, minLength: 4 }}
                onBlur={() => validation("engincapacity", engine_capacity)}
              />
              <FormHelperText id="my-helper-text" style={{ color: "red" }}>
                {errortype == "enginecapacity" && errorMessage && errorMessage}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <TextField
                name={"reg_no"}
                placeholder={"AAA-111"}
                value={registeration_number}
                onChange={(e) => set_registeration_number(e.target.value)}
                id="standard-basic"
                label="Registration Number"
                onBlur={() =>
                  validation("registeration_number", registeration_number)
                }
              />
              <FormHelperText id="my-helper-text" style={{ color: "red" }}>
                {errortype == "registeration_number" &&
                  errorMessage &&
                  errorMessage}
              </FormHelperText>
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
                onBlur={() =>
                  validation("car_seating_capacity", car_seating_capacity)
                }
              />
              <FormHelperText id="my-helper-text" style={{ color: "red" }}>
                {errortype == "car_seating_capacity" &&
                  errorMessage &&
                  errorMessage}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
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
                value={inspection_location}
              >
                <MenuItem value="--select--"> --select-- </MenuItem>
                <MenuItem key={"service_center"} value={"service_center"}>
                  {"Service Center"}
                </MenuItem>
                <MenuItem key={"home"} value={"home"}>
                  {"Home"}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={6}>
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
            <br />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
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
        </Grid>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <TextField
                name={"rent"}
                placeholder={"Rent"}
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                id="standard-basic"
                label="Rent"
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <TextField
                name={"waiting_charges"}
                placeholder={"Waiting Charges"}
                value={waiting_charges}
                onChange={(e) => setWaitingCharges(e.target.value)}
                id="standard-basic"
                label="Waiting Charges"
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <TextField
                name={"color"}
                placeholder={"Color"}
                value={color}
                onChange={(e) => setColor(e.target.value)}
                id="standard-basic"
                label="Color"
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <TextField
                name={"max_weight"}
                placeholder={"Max Weight"}
                value={max_weight}
                onChange={(e) => setMaxWeight(e.target.value)}
                id="standard-basic"
                label="Max Weight"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <FormControl className={classes.formControl}>
              <label htmlFor="input-field" style={{ fontWeight: "bold" }}>
                Registration Book
              </label>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                multiple
                name={"registeration_book"}
                onChange={(e) => updateRegistrationImageFunc(e)}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} xs={12}>
            {regLoading && (
              <>
                <CircularProgress size={20} style={{ marginRight: 10 }} />{" "}
                <span style={{ color: "blue" }}>Uploading...</span>
              </>
            )}
            {registeration_book != "" && (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div
                  style={{
                    width: 300,
                    textAlign: "center",
                    margin: 10,
                    border: "1px solid black",
                  }}
                >
                  <img src={registeration_book} className={classes.carImages} />
                </div>
              </div>
            )}
          </Grid>
        </Grid>

        <Button
          variant="contained"
          style={{
            marginLeft: 10,
            backgroundColor: "#1F1D61",
            color: "white",
            width: 150,
          }}
          onClick={(e) => handleSubmit(e)}
        >
          {addLoader ? <CircularProgress color="white" /> : "Submit"}
        </Button>
        <div className="alert-container" style={{ marginTop: 10 }}>
          <Alert />
        </div>
      </div>
    </div>
  );
};

export default AddCar;
