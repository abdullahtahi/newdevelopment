import React, { useState, useEffect } from "react";
import { getAllBrands } from "../../features/brand/brand.action";
import { getAllCarByBrand } from "../../features/carname/carname.action";
import Alert from "../../components/Alert/Alert";
import { getAllCities } from "../../features/city/city.action";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FilterIcon from "@material-ui/icons/Filter";
import { makeStyles } from "@material-ui/core/styles";
import { getAllFeature } from "../../features/feature/feature.action";
import { getActiveRenterUser } from "../../features/users/user.action";
import { Link } from "react-router-dom";
import { emptyState } from "../../features/booking/booking.action";
import {
  searchCar,
  emptySearch,
  filterCar,
} from "../../features/car/car.action";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from "material-table";
import icons from "./icons";
import moment from "moment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import {
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Button,
  Modal,
  Backdrop,
  Fade,
  Divider,
  TextField,
} from "@material-ui/core";
import { toNearest30Minutes } from "../../utills/index";

const BookingForm = () => {
  let dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      background: "trasparent",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflowY: "visible",
      zIndex: 2,
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "50vw",
    },
    modalPaper: {
      backgroundColor: "white",
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "80vw",
      height: "40vw",
    },
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
    features: {
      cursor: "pointer",
      fontWeight: "normal",
    },
    divider: { marginTop: 5, marginBottom: 5 },
    mainRow: {
      marginTop: 30,
      marginBottom: 30,
      marginLeft: 230,
      marginRight: 230,
    },
    mainDiv: {
      display: "flex",
      justifyContent: "space-around",
    },
    loader: { display: "flex", margin: "auto" },
    btnSearch: {
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: "#1F1D61",
      color: "white",
      width: 200,
    },
    filterLabel: { fontWeight: "bold", marginLeft: 20 },
    heading: {
      fontWeight: 300,
      fontSize: 20,
    },
  }));
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const { carnamebyBrand } = useSelector((state) => state.carname);
  const { brands } = useSelector((state) => state.brand);
  const { features } = useSelector((state) => state.feature);
  const { searchedCar, loading } = useSelector((state) => state.car);
  const { cities } = useSelector((state) => state.city);
  const [car_name, set_car_name] = useState("");
  const [car_namebybrand, set_car_namebybrand] = useState(carnamebyBrand);
  let [selectedfeaturesname, setselectedFeaturesName] = useState([]);
  let [selectedfeatures, setselectedFeatures] = useState([]);
  const [brand, set_brand] = useState("");
  const [city, set_city] = useState("");
  const [_pickuppoint, set_pickuppoint] = useState([]);
  const [pickupdate, set_pickupdate] = useState(toNearest30Minutes());
  const [dropoff_date, setdropoff_date] = useState();
  const [display_dropoff_date, setdisplay_dropoff_date] = useState();
  const [days, setdays] = useState(1);
  const [minRent, setminRent] = useState("");
  const [maxRent, setmaxRent] = useState("");
  const [minEngineCapacity, setminEngineCapacity] = useState("");
  const [maxEngineCapacity, setmaxEngineCapacity] = useState("");
  const [minModel, setminModel] = useState("");
  const [maxModel, setmaxModel] = useState("");
  const [is_driver, set_isdriver] = useState(false);
  const [transmission, set_transmission] = useState("auto");

  useEffect(() => {
    dispatch(emptyState());
    dispatch(emptySearch());
    dispatch(getAllBrands());
    dispatch(getAllFeature());
    dispatch(getActiveRenterUser());
    dispatch(getAllCities());
  }, []);
  console.log(days);
  const set_brand_func = (_id) => {
    dispatch(getAllCarByBrand(_id));
    set_brand(_id);
    set_car_namebybrand(carnamebyBrand);
  };

  const set_city_func = (_id) => {
    // dispatch(getPickupPointByCity(_id));
    set_city(_id);
  };
  const handleSubmit = async () => {
    const query = {
      car_name: car_name,
      brand: brand,
      pickupdate: moment(moment(pickupdate).format("DD-MMM-YYYY HH:mm:ss"))
        .seconds(0)
        .milliseconds(0)
        .toISOString(),
      dropoffdate: moment(moment(dropoff_date).format("DD-MMM-YYYY HH:mm:ss"))
        .seconds(0)
        .milliseconds(0)
        .toISOString(),
      city: city,
      is_driver: is_driver,
    };
    dispatch(searchCar(query));
  };

  const handleClose = () => {
    setOpen(false);
  };

  // **** Auto Complete select *****

  // OWNER DROPDOWN

  // BRAND DROPDOWN
  const brandProps = {
    options: brands,
    getOptionLabel: (option) => option.brand_name,
  };
  const handleChangeBrand = (event, value) => {
    if (!value) return;
    set_brand_func(value._id);
  };

  // CAR NAME DROPDOWN
  const carnameProps = {
    options: carnamebyBrand,
    getOptionLabel: (option) => option.name,
  };
  const handleChangeCarname = (event, value) => {
    if (!value) return;
    set_car_name(value._id);
  };
  const cityProps = {
    options: cities,
    getOptionLabel: (option) => option.city_name,
  };
  const handleChangecity = (event, value) => {
    if (!value) return;
    set_city_func(value._id);
  };

  const addInFeatureQuery = (e, name) => {
    const _id = e;
    if (selectedfeatures.includes(_id)) {
      selectedfeaturesname = selectedfeaturesname.filter(function (item) {
        return item !== name;
      });

      selectedfeatures = selectedfeatures.filter(function (item) {
        return item !== _id;
      });
      setselectedFeatures([...selectedfeatures]);
      setselectedFeaturesName([...selectedfeaturesname]);
    } else {
      selectedfeatures.push(_id);
      selectedfeaturesname.push(name);
      setselectedFeatures([...selectedfeatures]);
      setselectedFeaturesName([...selectedfeaturesname]);
    }
  };

  async function filterQuery() {
    const query = {
      car_name: car_name,
      brand: brand,
      pickupdate: pickupdate,
      dropoffdate: dropoff_date,
      city: city,
      pickup_point: _pickuppoint,
      minEngineCapacity: minEngineCapacity,
      maxEngineCapacity: maxEngineCapacity,
      minRent: minRent,
      maxRent: maxRent,
      minModel: minModel,
      maxModel: maxModel,
      transmission: transmission,
      selectedfeatures: selectedfeatures,
    };
    await dispatch(filterCar(query));
    setOpen(false);
  }
  const renderOnwerLink = (params) => {
    return (
      <Link
        to={`/owners/${params.owner_id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "black" }}
      >
        {params.owner_name}
      </Link>
    );
  };
  const renderCarLink = (params) => {
    return (
      <Link
        to={`/cars/${params._id}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "black" }}
      >
        {params.car_name}
      </Link>
    );
  };

  //   Available cars table
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
  if (searchedCar) {
    let s = 1;
    searchedCar.forEach((hist) => {
      rows.push({
        s: s++,
        _id: hist._id,
        rent: hist.rent,
        feature: hist.features,
        car_name:
          hist.brand.brand_name +
          " " +
          hist.car_name.name +
          " " +
          hist.model +
          " ( " +
          hist.registeration_number +
          " ) ",
        changePickup: hist.changePickUpPoint,
        brand: hist.brand.brand_name,
        make: hist.car_name.name,
        engine_capacity: hist.engine_capacity,
        seating_capacity: hist.car_seating_capacity,
        registeration_number: hist.registeration_number,
        model: hist.model,
        is_driver: hist.is_driver,
        owner_name: hist.owner_id.fullname,
        owner_id: hist.owner_id._id,
        pickup_date: moment(hist.availableFrom_date).format(
          "DD - MMMM - YYYY hh:mm a:ss a"
        ),
        dropoff_date: moment(hist.availableTo_date).format(
          "DD - MMMM - YYYY hh:mm a:ss a"
        ),
      });
    });
  }

  const daysOptions = [
    { value: 1, hours: 24 },
    { value: 2, hours: 48 },
    { value: 3, hours: 72 },
    { value: 4, hours: 96 },
    { value: 5, hours: 120 },
    { value: 6, hours: 144 },
    { value: 7, hours: 168 },
    { value: 8, hours: 198 },
    { value: 9, hours: 216 },
    { value: 10, hours: 240 },
    { value: 11, hours: 264 },
    { value: 12, hours: 288 },
    { value: 13, hours: 312 },
    { value: 14, hours: 336 },
    { value: 15, hours: 360 },
  ];
  const daysProps = {
    options: daysOptions,
    getOptionLabel: (option) => `${option.value}`,
  };
  const checkPickuppDate = (value) => {
    set_pickupdate(value);
    setdays(1);
    var new_date = moment(value).add(24, "hours");
    setdisplay_dropoff_date(moment(new_date).format("DD-MM-YYYY hh:mm a"));
    setdropoff_date(moment(new_date));
  };
  const handleChangeDays = (event, value) => {
    if (!value) return;
    setdays(value.value);
    let _date = pickupdate;
    var new_date = moment(_date).add(value.hours, "hours");
    setdisplay_dropoff_date(moment(new_date).format("DD-MM-YYYY hh:mm a"));
    setdropoff_date(moment(new_date));
  };
  useEffect(() => {
    setdays(1);
    let _date = pickupdate;
    var new_date = moment(_date).add(24, "hours");
    setdisplay_dropoff_date(moment(new_date).format("DD-MM-YYYY hh:mm a"));
    setdropoff_date(moment(new_date));
  }, []);

  return (
    <div className={classes.mainDiv}>
      <div className="formCar">
        <div className="addCar_head">
          <h2 className={classes.heading}>{"Add Booking"}</h2>
        </div>
        <Grid container spacing={4} sm={12} xs={12} lg={12}>
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
                  label="Brand Name"
                  margin="normal"
                  placeholder="--Select brand--"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Autocomplete
              {...carnameProps}
              id="controlled-demo"
              onChange={handleChangeCarname}
              renderInput={(params) => (
                <TextField
                  name={"brand"}
                  value={car_name}
                  {...params}
                  placeholder="--Select car name--"
                  label="Car Name"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={12} xs={12}>
            <Autocomplete
              {...cityProps}
              id="controlled-demo"
              onChange={handleChangecity}
              renderInput={(params) => (
                <TextField
                  name={"city"}
                  value={city}
                  {...params}
                  label="City"
                  placeholder="--Select city--"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={6} xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                value={pickupdate}
                minutesStep={30}
                disablePast
                onChange={(date) => checkPickuppDate(date)}
                label="Pickup Date & Time"
                showTodayButton
                style={{ width: 460 }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid xs={6} sm={6}>
            <Autocomplete
              {...daysProps}
              style={{ marginTop: 0 }}
              name="days"
              onChange={handleChangeDays}
              id="days"
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={days}
                  label="Number of days"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="--Select days--"
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid container spacing={4} sm={12} xs={12} lg={12}>
            <Grid item sm={12} xs={12}>
              <Typography style={{ marginLeft:15 }}>
                DropOff Date : {days != 0 && display_dropoff_date}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={4} sm={12} xs={12} lg={12}>
          <Grid item sm={12} xs={12}>
            <label
              htmlFor="input-field"
              style={{ fontWeight: "bold", marginRight: 20 }}
            >
              Driver
            </label>
            <FormControlLabel
              control={
                <Checkbox
                  checked={is_driver == true}
                  onChange={(e) => set_isdriver(true)}
                  required
                  name="Yes"
                  style={{ color: "#1F1D61" }}
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={is_driver == false}
                  required
                  onChange={(e) => set_isdriver(false)}
                  style={{ color: "#1F1D61" }}
                />
              }
              label="No"
            />
          </Grid>
        </Grid>

        <Grid className={classes.row}>
          <Button
            variant="contained"
            className={classes.btnSearch}
            onClick={(e) => handleSubmit(e)}
          >
            {"Search"}
          </Button>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            className={classes.btnSearch}
            startIcon={<FilterIcon color="#7294EF" />}
          >
            Filter Results
          </Button>
        </Grid>
        {loading ? (
          <CircularProgress className={classes.loader} />
        ) : (
          <>
            <div style={{ marginTop: 10 }}>
              <Alert />{" "}
            </div>
            <MaterialTable
              title={""}
              icons={icons}
              data={rows}
              columns={columns}
              sortable={false}
              detailPanel={[
                {
                  tooltip: "Show details",
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
                          <p>Charges per 10 hours : </p>
                          <p>PKR {rowData.rent}</p>
                        </div>
                        <div className={classes.row}>
                          <p>Change Pickup point: </p>
                          <p>{rowData.changePickup ? "Yes" : "No"}</p>
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
                              <p className={classes.features}>
                                {featr.feature_name}
                              </p>
                            );
                          })}
                        </div>
                        <Divider className={classes.divider} />
                        <Grid container justifyContent="flex-start">
                          <Link
                            to={{
                              pathname: `/bookings/requestbooking/${rowData._id}`,
                              days: days,
                            }}
                            className={classes.btn}
                          >
                            Request Booking
                          </Link>
                        </Grid>
                      </div>
                    );
                  },
                },
              ]}
              loading={loading}
              options={{
                pageSize: 10,
                pageSizeOptions: [5, 20, 50, 100],
                paginationType: "stepped",
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
            />
          </>
        )}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Filters</h3>
            <Divider style={{ margin: 20 }} />
            <Grid container>
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h3 className={classes.filterLabel}>Rent</h3>
              </Grid>

              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-required"
                  label="min rent"
                  variant="outlined"
                  style={{ width: 140 }}
                  value={minRent}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setminRent(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-required"
                  label="max rent"
                  variant="outlined"
                  style={{ width: 140 }}
                  value={maxRent}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setmaxRent(e.target.value)}
                />
              </Grid>
            </Grid>
            <Divider style={{ margin: 20 }} />
            <Grid container>
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h3 className={classes.filterLabel}>Engine Capacity</h3>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-required"
                  label="min engine"
                  variant="outlined"
                  style={{ width: 140 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={minEngineCapacity}
                  onChange={(e) => setminEngineCapacity(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-required"
                  label="max engine"
                  variant="outlined"
                  style={{ width: 140 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={maxEngineCapacity}
                  onChange={(e) => setmaxEngineCapacity(e.target.value)}
                />
              </Grid>
            </Grid>
            <Divider style={{ margin: 20 }} />
            <Grid container>
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h3 className={classes.filterLabel}>Model</h3>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-required"
                  label="min model"
                  variant="outlined"
                  className={classes.filterField}
                  style={{ width: 140 }}
                  value={minModel}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setminModel(e.target.value)}
                />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <TextField
                  id="outlined-required"
                  label="min model"
                  variant="outlined"
                  style={{ width: 140 }}
                  value={maxModel}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setmaxModel(e.target.value)}
                />
              </Grid>
            </Grid>
            <Divider style={{ margin: 20 }} />
            <Grid container>
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h3 className={classes.filterLabel}>Transmission</h3>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Button
                  id="outlined-required"
                  color="primary"
                  style={{ width: 140 }}
                  variant={transmission == "manual" ? "contained" : "outlined"}
                  onClick={(e) => set_transmission("manual")}
                >
                  Manual
                </Button>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Button
                  id="outlined-required"
                  color="primary"
                  variant={transmission == "auto" ? "contained" : "outlined"}
                  style={{ width: 140 }}
                  onClick={(e) => set_transmission("auto")}
                >
                  Auto
                </Button>
              </Grid>
            </Grid>
            <Divider style={{ margin: 20 }} />
            <Grid container>
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h3 className={classes.filterLabel}>Features</h3>
              </Grid>
              <Grid item xs={2} sm={4} md={8}>
                <div className="featureholder">
                  {features.map((featr) => {
                    return (
                      <p
                        style={{ cursor: "pointer" }}
                        className={
                          selectedfeaturesname.includes(featr.feature_name)
                            ? "selectedFeature"
                            : ""
                        }
                        value={featr._id}
                        onClick={() =>
                          addInFeatureQuery(featr._id, featr.feature_name)
                        }
                      >
                        {featr.feature_name}
                      </p>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
            <Divider style={{ margin: 20 }} />
            <Grid
              container
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  backgroundColor: "#1F1D61",
                  color: "white",
                  width: 200,
                }}
                onClick={() => {
                  filterQuery();
                }}
              >
                Apply
              </Button>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default BookingForm;
