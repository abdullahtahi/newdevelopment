import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import ReceiptIcon from "@material-ui/icons/Receipt";
import {
  Grid,
  makeStyles,
  TextField,
  CircularProgress,
  Button,
  Typography,
  FormHelperText,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Rating from "@material-ui/lab/Rating";
import Alert from "../../components/Alert/Alert";
import Map from "../../components/Map/Map";
import TransitionModal from "../../components/TransitionModal/TransitionModal";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  getBooking,
  updateInvoice,
  cancelBooking,
  endBooking,
  getInvoiceLink,
  approveBooking,
} from "../../features/booking/booking.action";
import { getAvailableCars } from "../../features/car/car.action";
import { setAlertMessage } from "../../features/alert/alert.action";
import AvailableCars from "./AvailableCars";
import moment from "moment";
import "leaflet/dist/leaflet.css";
import "./Booking.css";
function capitalizeFirstLetter(string) {
  return string && string.charAt(0).toUpperCase() + string.substring(1);
}

const BookingView = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { booking, loading, invoiceLink } = useSelector(
    (state) => state.booking
  );
  let dispatch = useDispatch();
  let { id } = useParams();
  const classes = useStyles();

  const [mapZoom, setMapZoom] = useState(12);
  const [expanded, setExpanded] = useState("panel1");

  const [cancellation_reason, setcancellation_reason] = useState("");
  const [position, setPosition] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openEndModal, setOpenEndModal] = useState(false);
  const [bookingDetails, setbookingDetails] = useState(booking);

  const [booking_status, setbooking_status] = useState(
    booking[0]?.status.slice(-1)[0].status
  );
  const [booking_number, setbooking_number] = useState(booking[0]?.t_id);
  const [owner_details, setowner_details] = useState(
    booking[0]?.owner?.fullname
  );
  const [renter_details, setrenter_details] = useState(
    booking[0]?.customer?.fullname
  );
  const [additional_charges, setadditional_charges] = useState();
  // bookingDetails && bookingDetails[0]?.additional_charges
  const [additional_charges_reason, setadditional_charges_reason] = useState();
  // bookingDetails && bookingDetails[0]?.additional_charges_reason
  const [showformatError, setshowformatError] = useState(false);
  const [brand, setbrand] = useState();
  // bookingDetails[0]?.vehicle.company._id
  const [pickupdate, setpickupdate] = useState();
  // bookingDetails && bookingDetails[0]?.pickup_date
  const [droppffdate, setdroppffdate] = useState();
  // bookingDetails && bookingDetails[0]?.dropoff_date
  const [city, setcity] = useState();
  // bookingDetails && bookingDetails[0]?.vehicle.city
  const [hours, sethours] = useState();
  // bookingDetails && bookingDetails[0]?.hours
  const [carId, setcarId] = useState();
  // bookingDetails && bookingDetails[0]?.vehicle._id

  const [car_details, setcar_details] = useState();
  // booking &&
  //   booking[0]?.vehicle?.car_name?.name +
  //     " " +
  //     booking[0]?.vehicle?.company?.name +
  //     " " +
  //     booking[0]?.vehicle?.model +
  //     " ( " +
  //     booking[0]?.vehicle?.registeration_number +
  //     " ) "
  function fetchMyAPI() {
    dispatch(getBooking(id));
  }

  useEffect(() => {
    fetchMyAPI(id);
  }, []);
  console.log(bookingDetails);

  useEffect(() => {
    if (id && booking.length > 0) {
      // fetchAvailableCars();
      setbooking_status(booking[0]?.status.slice(-1)[0].status);
      setcancellation_reason(booking[0].cancellation_reason);
      setbooking_number(booking[0]?.t_id);
      setcar_details(
        booking[0]?.vehicle?.company?.name +
          " " +
          booking[0]?.vehicle?.car_name?.name +
          " - " +
          booking[0]?.vehicle?.model +
          " ( " +
          booking[0]?.vehicle?.registration_number +
          " ) "
      );
      setowner_details(booking[0]?.captain?.fullname);
      setrenter_details(booking[0]?.customer?.fullname);
      setbookingDetails(booking);
    }
    // dispatch(getInvoiceLink(id));
  }, [booking]);

  useEffect(() => {
    if (booking.length > 0 && booking[0].pickup_point) {
      setPosition([
        booking && booking[0]?.pickup?.location.latitude,
        booking && booking[0]?.pickup?.location.longitude,
      ]);
    }
  }, [booking]);

  const formatHours = (decimalTimeString) => {
    var decimalTime = parseFloat(decimalTimeString);

    decimalTime = decimalTime * 60 * 60;

    var hours = Math.floor(decimalTime / (60 * 60));

    decimalTime = decimalTime - hours * 60 * 60;

    var minutes = Math.floor(decimalTime / 60);

    decimalTime = decimalTime - minutes * 60;

    var seconds = Math.round(decimalTime);

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return hours + ":" + minutes + ":" + seconds;
  };

  function fetchAvailableCars() {
    dispatch(getAvailableCars(brand, pickupdate, droppffdate, city, carId));
  }

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleOpenEndModal = () => {
    setOpenEndModal(true);
  };

  const handleCloseEndModal = () => {
    setOpenEndModal(false);
  };

  const updateRejectCall = () => {
    const body = {
      cancellation_reason: cancellation_reason,
      cancelled_by: "Deliver it mini customer support",
    };
    if (!body.cancellation_reason) {
      dispatch(setAlertMessage("Please fill reason", "error"));
      if (loading == false)
        setTimeout(function () {
          setOpenUpdateModal(false);
        }, 400);
      return;
    }
    dispatch(cancelBooking(body, id));
    setbooking_status("cancelled");
    if (loading == false)
      setTimeout(function () {
        setOpenUpdateModal(false);
      }, 400);
  };
  const updateApproveCall = () => {
    let body = { approved_by: userInfo.user_role };
    dispatch(approveBooking(body, id));
    setbooking_status("approved");
    if (loading == false)
      setTimeout(function () {
        setOpenUpdateModal(false);
      }, 400);
  };
  const updateEndCall = () => {
    const body = {
      additional_charges:
        additional_charges == undefined ? 0 : additional_charges,
      additional_charges_reason:
        additional_charges_reason == undefined
          ? "-"
          : additional_charges_reason,
      payment_status: "verified",
    };
    dispatch(endBooking(body, id));
    setbooking_status("ended");
    if (loading == false)
      setTimeout(function () {
        setOpenEndModal(false);
      }, 400);
  };

  const updateInvoiceCall = () => {
    if (id) {
      dispatch(updateInvoice(id));
      dispatch(getInvoiceLink(id));
    }
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  console.log(bookingDetails);

  return loading ? (
    <CircularProgress className="loader" style={{ marginTop: 50 }} />
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div className="viewbooking">
          <div className="viewbooking_head">
            <Grid item xs={4} sm={4} align="left">
              <h2
                style={{
                  fontWeight: 300,
                  fontSize: 20,
                  marginBottom: 10,
                }}
              >
                Trip - {booking_number}
              </h2>
            </Grid>
          </div>
          <Grid item xs={8} sm={8} align="right">
            <Button
              variant="contained"
              size="medium"
              style={{ marginRight: 10, width: 200 }}
              className={
                booking_status == "accepted"
                  ? classes.bstatusApproved
                  : booking_status == "cancelled"
                  ? classes.bstatuscancelled
                  : booking_status == "started"
                  ? classes.bstatusprogress
                  : booking_status == "pending"
                  ? classes.bstatusprogress
                  : booking_status == "ended"
                  ? classes.bstatusend
                  : classes.pstatusPending
              }
            >
              {booking_status}
            </Button>
          </Grid>
        </div>

        <div className="alert-container">
          <Alert />
        </div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions2-content"
            id="additional-actions2-header"
          >
            <Typography className={classes.headingAccordian}>
              Booking Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Booking Number
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {booking_number}
            </Typography>
          </AccordionDetails>

          <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Customer Name
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {renter_details}
              <Button className={classes.cnicImageModal}>
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  to={`/customers/${
                    bookingDetails && bookingDetails[0]?.customer?._id
                  }`}
                  style={{
                    textDecoration: "none",
                    color: "#1F1D61",
                  }}
                >
                  View Full Details
                </Link>
              </Button>
            </Typography>
          </AccordionDetails>

          <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Booking Date
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {moment(bookingDetails && bookingDetails[0]?.createdAt).format(
                "DD - MMM - YYYY hh:mm:ss a"
              )}
            </Typography>
          </AccordionDetails>

          {booking_status == "ended" && (
            <>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Start Time
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {bookingDetails && bookingDetails[0]?.start_time
                    ? bookingDetails &&
                      moment(bookingDetails[0]?.start_time).format(
                        "DD-MMM-YYYY hh:mm:ss a"
                      )
                    : "-"}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  End Time
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {bookingDetails && bookingDetails[0]?.end_time
                    ? bookingDetails &&
                      moment(bookingDetails[0]?.end_time).format(
                        "DD-MMM-YYYY hh:mm:ss a"
                      )
                    : "-"}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Captain Amount
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {bookingDetails[0]?.amt_paid} Rs
                </Typography>
              </AccordionDetails>
            </>
          )}
          <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Distance
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {bookingDetails && bookingDetails[0]?.distance} km
            </Typography>
          </AccordionDetails>

          {booking_status == "cancelled" && (
            <>
              {bookingDetails[0]?.cancelled_by == "captain" ? (
                <AccordionDetails>
                  <Typography className={classes.subheadingAccordian}>
                    Captain Amount Deducted
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {bookingDetails[0]?.amt_paid} Rs
                  </Typography>
                </AccordionDetails>
              ) : (
                <AccordionDetails>
                  <Typography className={classes.subheadingAccordian}>
                    Captain Amount
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {bookingDetails[0]?.amt_paid} Rs
                  </Typography>
                </AccordionDetails>
              )}
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Cancelled By
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {bookingDetails && bookingDetails[0]?.cancelled_by}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Cancellation Reason
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {bookingDetails && bookingDetails[0]?.cancellation_reason}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Cancel time
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {bookingDetails &&
                    moment(bookingDetails[0]?.cancel_time).format(
                      "DD-MMM-YYYY hh:mm:ss a"
                    )}
                </Typography>
              </AccordionDetails>
            </>
          )}

          {bookingDetails && bookingDetails[0]?.booking_status != "cancelled" && (
            <>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Rating Customer
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  <Rating
                    readOnly
                    name="rating"
                    precision={0.1}
                    value={bookingDetails && bookingDetails[0]?.rating.customer}
                  />
                  {bookingDetails &&
                    bookingDetails[0]?.rating?.customer == 0 && (
                      <div>No feedback given</div>
                    )}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Rating Captain
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  <Rating
                    readOnly
                    name="rating"
                    precision={0.1}
                    value={bookingDetails && bookingDetails[0]?.rating?.captain}
                  />
                  {bookingDetails &&
                    bookingDetails[0]?.rating?.captain == 0 && (
                      <div>No feedback given</div>
                    )}
                </Typography>
              </AccordionDetails>
            </>
          )}
          {bookingDetails &&
            bookingDetails[0]?.status?.map((status, ind) => (
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Booking Statuses {ind + 1}
                </Typography>

                <Typography className={classes.secondaryHeading}>
                  {status.status} &nbsp; - &nbsp;{" "}
                  {new Date(status.date).toLocaleString()}
                </Typography>
              </AccordionDetails>
            ))}
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions2-content"
            id="additional-actions2-header"
          >
            <Typography className={classes.headingAccordian}>
              Pickup And Drop off Details
            </Typography>
          </AccordionSummary>
          {bookingDetails && bookingDetails[0]?.days && (
            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                Number Of Days
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {bookingDetails && bookingDetails[0]?.days}
              </Typography>
            </AccordionDetails>
          )}

          <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Pickup Date & Time
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {moment(bookingDetails && bookingDetails[0]?.pickup_date).format(
                "DD - MMMM - YYYY"
              )}{" "}
              at{" "}
              {moment(bookingDetails && bookingDetails[0]?.pickup_date).format(
                "hh:mm:ss a"
              )}{" "}
            </Typography>
          </AccordionDetails>

          <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Drop Off Date & Time
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {moment(bookingDetails && bookingDetails[0]?.dropoff_date).format(
                "DD - MMMM - YYYY"
              )}
              at
              {moment(bookingDetails && bookingDetails[0]?.dropoff_date).format(
                "hh:mm:ss a"
              )}
            </Typography>
          </AccordionDetails>

          <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Pickup Location
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {bookingDetails && bookingDetails[0]?.pickup?.name}
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Drop off Location
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {bookingDetails && bookingDetails[0]?.dropoff?.name}
            </Typography>
          </AccordionDetails>

          <AccordionDetails>
            <Grid item xs={12} sm={12}>
              {position && (
                <Map
                  className={classes.map}
                  position={position}
                  popup_text={`${
                    bookingDetails && bookingDetails[0]?.pickup?.address
                  }`}
                  zoom={mapZoom}
                />
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions2-content"
            id="additional-actions2-header"
          >
            <Typography className={classes.headingAccordian}>
              Vehicle Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Vehicle Name
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {car_details}
              <Button className={classes.cnicImageModal}>
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  to={`/cars/${
                    bookingDetails && bookingDetails[0]?.vehicle?._id
                  }`}
                  style={{
                    textDecoration: "none",
                    color: "#1F1D61",
                  }}
                >
                  View Full Details
                </Link>
              </Button>
            </Typography>
          </AccordionDetails>
          {/* <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Vehicle Rent
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {bookingDetails[0]?.vehicle?.rent}
            </Typography>
          </AccordionDetails> */}
          <AccordionDetails>
            <Typography className={classes.subheadingAccordian}>
              Owner Name
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {owner_details}
              <Button className={classes.cnicImageModal}>
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  to={`/captains/${
                    bookingDetails && bookingDetails[0]?.captain?._id
                  }`}
                  style={{
                    textDecoration: "none",
                    color: "#1F1D61",
                  }}
                >
                  View Full Details
                </Link>
              </Button>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* 
            
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <Typography className={classes.headingAccordian}>
                Available Cars
              </Typography>
            </AccordionSummary>
            <AvailableCars
              booking_number={booking_number}
              booking_id={id}
              hours={hours}
              pickupdate={pickupdate}
              droppffdate={droppffdate}
              fetchAvailableCars={fetchAvailableCars}
            />
          </Accordion>
          <TransitionModal
            loading={loading}
            open={openUpdateModal}
            handleClose={handleCloseUpdateModal}
            handleOpen={handleOpenUpdateModal}
          >
            <>
              <Grid item xs={12} sm={12}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  required
                  id="Cancellation Reason"
                  name="cancellation_reason"
                  label="Rejection Reason"
                  value={cancellation_reason}
                  multiline
                  rows="5"
                  onChange={(e) => setcancellation_reason(e.target.value)}
                  fullWidth
                />
                {showformatError && (
                  <FormHelperText style={{ color: "red" }}>
                    Invalid Format, Please use letters.
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  color="#4CAF50"
                  className={classes.approveBtn}
                  variant="contained"
                  size="medium"
                  onClick={() => updateApproveCall()}
                >
                  Approve
                </Button>
                <Button
                  className={classes.rejectBtn}
                  color="secondary"
                  variant="contained"
                  size="medium"
                  onClick={() => updateRejectCall()}
                >
                  Reject
                </Button>
              </Grid>
            </>
          </TransitionModal>

          <TransitionModal
            loading={loading}
            open={openEndModal}
            handleClose={handleCloseEndModal}
            handleOpen={handleOpenEndModal}
            style={{ width: 200 }}
          >
            <Grid item xs={12} sm={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                id="Additional Charges"
                name="additional_charges"
                label="Additional Charges"
                value={additional_charges}
                onChange={(e) => setadditional_charges(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                style={{ marginTop: 10, width: 300 }}
                InputLabelProps={{ shrink: true }}
                required
                id="Additional Charges Reason"
                name="additional_charges_reason"
                label="Additional Charges Reason"
                value={additional_charges_reason}
                multiline
                rows="5"
                onChange={(e) => setadditional_charges_reason(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} align="center" style={{ marginTop: 10 }}>
              <Button
                className={classes.btn}
                color="secondary"
                variant="contained"
                size="medium"
                onClick={() => updateEndCall()}
              >
                End Booking
              </Button>
            </Grid>
          </TransitionModal>
        </div>
      </Grid> */}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
  },
  label: {
    fontSize: "12px",
  },
  btn: {
    backgroundColor: "#1F1D61",
    color: "white",
    border: "1px solid white",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1F1D61",
    },
  },
  rejectBtn: {
    boxShadow: "none",
    color: "white",
    margin: 5,
    "&:hover": {
      backgroundColor: "#F50057",
    },
  },
  approveBtn: {
    backgroundColor: "#4CAF50",
    color: "white",
    margin: 5,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#4CAF50",
    },
  },
  bstatuscancelled: {
    backgroundColor: "#e55353",
    color: "white",
  },
  bstatusprogress: {
    backgroundColor: "#2eb85c",
    color: "white",
  },
  bstatusend: {
    backgroundColor: "#2eb85c",
    color: "white",
  },
  bstatusApproved: {
    backgroundColor: "#2eb85c",
    color: "white",
  },
  heading: {
    fontSize: 22,
    paddingLeft: 12,
    paddingTop: 12,
    paddingBottom: 12,
    fontWeight: "bold",
  },
  headingAccordian: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  subheadingAccordian: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  cnicImageModal: {
    textTransform: "initial",
    color: "#1F1D61",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "white",
    },
    marginTop: -5,
    marginRight: 10,
  },
}));

export default BookingView;
