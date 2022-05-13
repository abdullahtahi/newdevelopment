import React, { useEffect, useState } from "react";
import { getCar } from "../../features/car/car.action";
import { bookCar, emptyState } from "../../features/booking/booking.action";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns";
import Rating from "@material-ui/lab/Rating";
import moment from "moment";
import { useParams, Redirect } from "react-router-dom";
import GoogleMap from "./MapComponents/GoogleMap";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import {
  Typography,
  CircularProgress,
  Button,
  Grid,
  Modal,
  Backdrop,
  Fade,
  makeStyles,
  TextField,
  FormControl,
} from "@material-ui/core";
import Alert from "../../components/Alert/Alert";
import { getAllBookingReasons } from "../../features/reason/reason.action";
import { toNearest30Minutes } from "../../utills/index";
import { cities } from "../../utills/data";
import "leaflet/dist/leaflet.css";
import "./Booking.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
  },
  btn: {
    backgroundColor: "#1F1D61",
    color: "white",
    width: 180,
    border: "1px solid white",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1F1D61",
    },
  },
  formControl: {
    minWidth: 350,
  },
  heading2: {
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: 1.2,
    color: "#2D1967",
    marginLeft: 10,
    marginBottom: 10,
  },
  headingAccordian: {
    flexBasis: "33.33%",
    flexShrink: 0,
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "visible",
    zIndex: 2,
  },
  accordianRow: {
    display: "flex",
    alignItems: "center",
    margin: 8,
  },
}));

const RequestBooking = (props) => {
  const { state } = props.location;

  const classes = useStyles();
  let dispatch = useDispatch();
  let { id } = useParams();
  const { car, loading } = useSelector((state) => state.car);
  const { saved, bookingLoader } = useSelector((state) => state.booking);
  const { reasons } = useSelector((state) => state.reason);
  const { activeUsers } = useSelector((state) => state.users);
  const [_pickuppoint, set_pickuppoint] = useState([]);
  const [pickup_date, setpickup_date] = useState(
    toNearest30Minutes(new Date())
  );
  const [dropoff_date, setdropoff_date] = useState();
  const [display_dropoff_date, setdisplay_dropoff_date] = useState(
    moment(new Date()).format("DD-MM-YYYY HH:mm:ss a")
  );
  const [renter_id, set_renter_id] = useState("");
  const [pickuptime_error, setpickuptime_error] = useState(false);
  const [openmap, setopenmap] = useState(false);
  const [booking_reason, setbooking_reason] = useState("");
  const [traveling_city, settraveling_city] = useState("");
  const [days, setdays] = useState(0);
  const [maploading, setmaploading] = useState(true);
  const [transmission, setTransmission] = useState(
    car[0]?.transmission == "auto" ? "Automatic" : "Manual"
  );

  async function fetchMyAPI() {
    dispatch(getCar(id));
    dispatch(emptyState());
  }

  async function BookCarFunction() {
    if (!_pickuppoint.latitude || !_pickuppoint.longitude) {
      window.alert("Please select location from map.");
      return;
    }
    const body = {
      car_id: id,
      pickup_date: moment(pickup_date).seconds(0).milliseconds(0).toISOString(),
      days: days,
      dropoff_date: dropoff_date,
      renter_id: renter_id,
      pickup_point: _pickuppoint,
      booking_reason: booking_reason,
      traveling_city: traveling_city,
    };
    dispatch(bookCar(body));
  }
  const ownersProps = {
    options: activeUsers,
    getOptionLabel: (option) => `${option.fullname} +92${option.mobilenumber}`,
  };
  const reasonsProps = {
    options: reasons,
    getOptionLabel: (option) => `${option.reason}`,
  };

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
  const citiesProps = {
    options: cities,
    getOptionLabel: (option) => `${option.name}`,
  };

  const openMapModal = () => {
    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then(function (result) {
        if (result.state == "granted") {
          setopenmap(true);
        } else if (result.state == "prompt") {
          setopenmap(true);
        } else if (result.state == "denied") {
          window.alert("Please turn on location!");
        }
      });
  };
  const handleChangeReason = (event, value) => {
    if (!value) return;
    setbooking_reason(value.reason);
  };
  const handleChangeTravelingCity = (event, value) => {
    if (!value) return;
    settraveling_city(value.name);
  };
  const handleChangeDays = (event, value) => {
    if (!value) return;
    setdays(value.value);
    let _date = new Date(pickup_date);
    var new_date = moment(_date).add(value.hours, "hours");
    setdisplay_dropoff_date(moment(new_date).format("DD-MM-YYYY HH:mm:ss a"));
    setdropoff_date(moment(new_date).seconds(0).milliseconds(0).toISOString());
  };
  const handleChangeOwner = (event, value) => {
    if (!value) return;
    set_renter_id(value._id);
  };
  useEffect(() => {
    fetchMyAPI(id);
    dispatch(getAllBookingReasons());
  }, []);

  if (saved == true) {
    return <Redirect to="/bookings" />;
  }
  const checkPickuppDate = (date) => {
    let check = moment(date).isBefore(new Date()); // true
    if (check) {
      setpickup_date(new Date());
      setpickuptime_error(true);
    } else {
      setpickup_date(date);
      setpickuptime_error(false);
    }
  };
  const handleCloseMapModal = () => {
    setopenmap(false);
  };

  const setPickupPoint = (e) => {
    set_pickuppoint({
      ..._pickuppoint,
      address: e.target.value,
      name: e.target.value,
    });
  };
  if (maploading == true) {
    setTimeout(() => {
      setmaploading(false);
    }, 3000);
  }

  return loading ? (
    <CircularProgress className="loader" style={{ marginTop: 50 }} />
  ) : (
    <>
      <div>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <div className="viewcar">
              <Typography className={classes.heading2}>
                Request Booking
              </Typography>
              <Grid container>
                <Grid xs={12} sm={12}>
                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Car
                    </Typography>
                    <Typography className={classes.headingAccordian}>
                      {car &&
                        car[0]?.brand?.brand_name +
                          " " +
                          car[0]?.car_name?.name +
                          " " +
                          car[0]?.model +
                          " - " +
                          transmission}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Registration Number
                    </Typography>
                    <Typography className={classes.headingAccordian}>
                      {car && car[0]?.registeration_number}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Available From
                    </Typography>
                    <Typography className={classes.headingAccordian}>
                      {moment(car && car[0]?.availableFrom_date).format(
                        "DD - MMMM - YYYY HH:mm:ss a"
                      )}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Available To
                    </Typography>
                    <Typography className={classes.headingAccordian}>
                      {moment(car && car[0]?.availableTo_date).format(
                        "DD - MMMM - YYYY HH:mm:ss a"
                      )}{" "}
                    </Typography>
                  </Grid>

                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Charges per 10 hours
                    </Typography>
                    <Typography className={classes.headingAccordian}>
                      {car && car[0]?.rent}
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Rating
                    </Typography>
                    <Typography className={classes.headingAccordian}>
                      <Rating
                        value={car && car[0]?.rating}
                        readOnly
                        precision={0.1}
                      />
                    </Typography>
                  </Grid>
                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Renter Name
                    </Typography>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        {...ownersProps}
                        style={{ marginTop: 0 }}
                        name="renter_id"
                        onChange={handleChangeOwner}
                        id="renter_id"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            value={renter_id}
                            style={{ minWidth: 500 }}
                            margin="normal"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Booking Reason
                    </Typography>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        {...reasonsProps}
                        style={{ marginTop: 0 }}
                        name="reason"
                        onChange={handleChangeReason}
                        id="reason"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            value={booking_reason}
                            style={{ minWidth: 500 }}
                            margin="normal"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                  <Typography className={classes.headingAccordian}>
                      Traveling City
                    </Typography>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        {...citiesProps}
                        style={{ marginTop: 0 }}
                        name="reason"
                        onChange={handleChangeTravelingCity}
                        id="reason"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            value={traveling_city}
                            style={{ minWidth: 500 }}
                            margin="normal"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Pickup Point{" "}
                    </Typography>
                    <Typography className={classes.headingAccordian}>
                      <TextField
                        name={"address"}
                        onClick={() => openMapModal()}
                        onChange={(e) => setPickupPoint(e)}
                        value={_pickuppoint?.address}
                        margin="normal"
                        style={{ width: 500 }}
                        fullWidth
                      />
                    </Typography>
                  </Grid>
                  {/* <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      DropOff Point
                    </Typography>
                    <Typography
                      className={classes.headingAccordian}
                      style={{ width: 500 }}
                    >
                      {_pickuppoint?.address}
                    </Typography>
                  </Grid> */}

                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Pickup Date
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDateTimePicker
                        margin="normal"
                        style={{ minWidth: 500 }}
                        id="time-picker"
                        minutesStep={30}
                        label="Pickup Date"
                        value={pickup_date}
                        disablePast
                        minDate={car && car[0]?.availableFrom_date}
                        maxDate={car && car[0]?.availableTo_date}
                        onChange={(date) => checkPickuppDate(date)}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    {pickuptime_error && (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Invalid pick up time
                      </span>
                    )}
                  </Grid>
                  {}

                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      Number of days
                    </Typography>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        {...daysProps}
                        style={{ marginTop: 0 }}
                        name="days"
                        onChange={handleChangeDays}
                        id="days"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            value={days.value}
                            placeholder="--Select days--"
                            style={{ minWidth: 500 }}
                            margin="normal"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} className={classes.accordianRow}>
                    <Typography className={classes.headingAccordian}>
                      DropOff Date
                    </Typography>
                    {days != 0 && <p>{display_dropoff_date}</p>}
                  </Grid>

                  <Grid xs={12} sm={12}>
                    <Button
                      className={classes.btn}
                      onClick={() => BookCarFunction()}
                    >
                      {bookingLoader ? <CircularProgress /> : "Book Car"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <div className="alert-container" style={{ marginBottom: 8 }}>
                <Alert />
              </div>
            </div>
          </Grid>
        </Grid>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openmap}
          onClose={handleCloseMapModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openmap}>
            <div className={classes.modalPaper}>
              {maploading ? (
                <CircularProgress
                  className={"loader"}
                  style={{ marginTop: 220 }}
                />
              ) : (
                <GoogleMap
                  set_pickuppoint={set_pickuppoint}
                  handleCloseMapModal={handleCloseMapModal}
                />
              )}
            </div>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default RequestBooking;
