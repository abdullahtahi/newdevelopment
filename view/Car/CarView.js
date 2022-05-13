import React, { useEffect, useState } from "react";
import {
  getCar,
  updateCar,
  updateCarStatus,
} from "../../features/car/car.action";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { Link, useParams } from "react-router-dom";
import { setAlertMessage } from "../../features/alert/alert.action";
import {
  Accordion,
  AccordionDetails,
  Button,
  Typography,
  CircularProgress,
  TextField,
  Grid,
  AccordionSummary,
} from "@material-ui/core";
import moment from "moment";
import Alert from "../../components/Alert/Alert";
import Carousel from "react-material-ui-carousel";
import TransitionModal from "../../components/TransitionModal/TransitionModal";
// import "leaflet/dist/leaflet.css";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./Car.css";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
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
  heading: {
    fontSize: 22,
    // color:"#C4C4C4",
    paddingLeft: 12,
    paddingTop: 12,
    paddingBottom: 12,
    // borderBottom: `solid #6495ED`,
  },
  featureList: {
    border: "2px solid #1F1D61",
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 7,
    marginRight: 7,
    borderRadius: 5,
    padding: 5,
    cursor: "pointer",
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
}));

const CarView = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const { car, loading } = useSelector((state) => state.car);
  const [expanded, setExpanded] = useState("panel1");
  const [carDetails, setcarDetails] = useState(car);
  const [approval_status, setapproval_status] = useState("pending");
  const [car_details, setcar_details] = useState(
    car[0]?.car_name?.name + " " + car[0]?.company?.name
  );
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCarModal, setOpenCarModal] = useState(false);
  const [openRegistrationImageModal, setOpenRegistrationImageModal] =
    useState(false);
  let { id } = useParams();

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleOpenRegistrationImageModal = () => {
    setOpenRegistrationImageModal(true);
  };

  const handleCloseRegistrationImageModal = () => {
    setOpenRegistrationImageModal(false);
  };

  const handleOpenCarModal = () => {
    setOpenCarModal(true);
  };

  const handleCloseCarModal = () => {
    setOpenCarModal(false);
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async function fetchMyAPI() {
    dispatch(getCar(id));
  }

  useEffect(() => {
    fetchMyAPI(id);
  }, []);

  useEffect(() => {
    if (id && car.length > 0) {
      setapproval_status(car[0].status);
      setcar_details(car[0]?.car_name?.name + " " + car[0]?.company?.name);
      // setTransmission(car[0]?.transmission == "auto" ? "Automatic" : "Manual");
      setcarDetails(car);
    }
  }, [car]);

  const updateRejectCall = () => {
    const body = {
      is_active: false,
      status: "rejected",
    };
    dispatch(updateCarStatus(body, id));
    setapproval_status("rejected");
    if (loading == false)
      setTimeout(function () {
        setOpenUpdateModal(false);
      }, 400);
  };

  const updateApproveCall = () => {
    if (car[0]?.owner?.status !== "approved") {
      dispatch(setAlertMessage(`Please approve captain account!`, "error"));
      setOpenUpdateModal(false);
      return;
    }
    const body = {
      is_active: true,
      status: "approved",
    };
    dispatch(updateCarStatus(body, id));
    setapproval_status("approved");
    if (loading == false)
      setTimeout(function () {
        setOpenUpdateModal(false);
      }, 400);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return !car?.length > 0 && loading ? (
    <CircularProgress className="loader" style={{ marginTop: 50 }} />
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div className="viewcar">
          <div className="viewbooking_head">
            <Grid item xs={12} sm={6} align="left">
              <h2
                style={{
                  fontWeight: 300,
                  fontSize: 20,
                  marginBottom: 10,
                  marginRight: 40,
                }}
              >
                Vehicle - {car_details}
              </h2>
            </Grid>

            <Grid item xs={12} sm={6} align="right">
              <Button
                variant="contained"
                size="medium"
                className={
                  approval_status == "approved"
                    ? classes.Approved
                    : approval_status == "rejected"
                    ? classes.Rejected
                    : classes.Pending
                }
                style={{ marginRight: 10, width: 200 }}
              >
                {approval_status == "approved"
                  ? "Approved"
                  : approval_status == "rejected"
                  ? "Rejected"
                  : "Pending"}
              </Button>
              <Button
                className={classes.btn}
                variant="contained"
                size="medium"
                style={{ marginRight: 10, width: 200 }}
                startIcon={<EditIcon />}
                onClick={
                  // updateActionCall();
                  handleOpenUpdateModal
                }
              >
                Update Status
              </Button>
            </Grid>
          </div>
          <div className="alert-container" style={{ marginBottom: 10 }}>
            <Alert />
          </div>
          <div className={classes.root}>
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
                  Car Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Car Company
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.company?.name}
                  {/* <Button
                    className={classes.cnicImageModal}
                    onClick={handleOpenCarModal}
                  >
                    View Car Images
                  </Button> */}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Car Make
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.car_name?.name}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Weight Range
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.min_weight}-{carDetails[0]?.max_weight}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Inspection Date
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {new Date(
                    carDetails[0]?.inspection_details?.date
                  ).toLocaleString()}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Inspection location
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.inspection_details?.location}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Registration Number
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.registration_number}
                  <Button
                    className={classes.cnicImageModal}
                    onClick={handleOpenRegistrationImageModal}
                  >
                    View Registration Book Image
                  </Button>
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Rent
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.rent == 0
                    ? "Rent is not updated"
                    : carDetails[0]?.rent}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Color
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.color}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Available
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.owner.is_inTrip == true ? "Yes" : "No"}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Driver
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.is_driver == true ? "Yes" : "No"}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Captain Name
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.owner?.fullname}
                  <Button className={classes.cnicImageModal}>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      to={`/captains/${carDetails[0]?.owner?._id}`}
                      style={{
                        textDecoration: "none",
                        color: "#1F1D61",
                      }}
                    >
                      View Full details
                    </Link>
                  </Button>
                </Typography>
              </AccordionDetails>
              {/* <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  No Of Rentals
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.noofRentals}
                </Typography>
              </AccordionDetails> */}
              {/* <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Rating
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  <Rating
                    name="rating"
                    value={carDetails[0]?.rating}
                    readOnly
                    precision={0.1}
                  />
                  {carDetails && carDetails[0]?.rating == 0 && (
                    <div>No feedback given</div>
                  )}{" "}
                </Typography>
              </AccordionDetails> */}
            </Accordion>
            {/* <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions3-content"
                id="additional-actions3-header"
              >
                <Typography className={classes.headingAccordian}>
                  Availability Dates
                </Typography>
              </AccordionSummary>
              {car[0]?.availableFrom_date ? (
                <>
                  {" "}
                  <AccordionDetails>
                    <Typography className={classes.subheadingAccordian}>
                      Available From - Date
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      {moment(carDetails[0]?.availableFrom_date).format(
                        "DD - MMMM - YYYY"
                      )}{" "}
                      at{" "}
                      {moment(carDetails[0]?.availableFrom_date).format(
                        "hh:mm a"
                      )}
                    </Typography>
                  </AccordionDetails>
                  <AccordionDetails>
                    <Typography className={classes.subheadingAccordian}>
                      Available To - Date
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      {moment(carDetails[0]?.availableTo_date).format(
                        "DD - MMMM - YYYY"
                      )}{" "}
                      at{" "}
                      {moment(carDetails[0]?.availableTo_date).format(
                        "hh:mm a"
                      )}
                    </Typography>
                  </AccordionDetails>
                </>
              ) : (
                <AccordionDetails>
                  <Typography className={classes.headingAccordian}>
                    No details provided{" "}
                  </Typography>
                </AccordionDetails>
              )}
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-actions3-content"
                id="additional-actions3-header"
              >
                <Typography className={classes.headingAccordian}>
                  Inspection Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Location
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {carDetails[0]?.inspection_details?.inspection_location &&
                    capitalize(
                      carDetails[0]?.inspection_details?.inspection_location
                    )}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Inspection Date and Time
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {moment(
                    carDetails[0]?.inspection_details?.inspection_date
                  ).format("DD - MMM - YYYY")}{" "}
                  at{" "}
                  {moment(
                    carDetails[0]?.inspection_details?.inspection_date
                  ).format("hh:mm a")}
                </Typography>
              </AccordionDetails> */}

            {/* {approval_status && (
                <AccordionDetails>
                  <Typography className={classes.subheadingAccordian}>
                    Feedback
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {approval_feedback}
                  </Typography>
                </AccordionDetails>
              )} */}
            {/* </Accordion> */}
          </div>
        </div>
      </Grid>
      <TransitionModal
        loading={loading}
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        handleOpen={handleOpenUpdateModal}
      >
        <>
          {/* <Grid item xs={12} sm={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              id="approval_feedback"
              name="approval_feedback"
              label="Feedback"
              multiline
              rows={5}
              value={approval_feedback}
              onChange={(e) => setapproval_feedback(e.target.value)}
              fullWidth
            />
          </Grid> */}
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
        open={openRegistrationImageModal}
        handleClose={handleCloseRegistrationImageModal}
        handleOpen={handleOpenRegistrationImageModal}
      >
        <Grid justifyContent="center" xs={12} sm={12}>
          {/* <Carousel autoPlay={false}>
            {carDetails[0]?.registeration_book?.map((item, i) => (
              <div className="cnicImage">
                <img src={item} />
              </div>
            ))}
          </Carousel> */}
          <div className="cnicImage">
            <img src={carDetails[0]?.registration_book_img} />
          </div>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            {"Registration Image"}
          </p>
        </Grid>
      </TransitionModal>
      <TransitionModal
        open={openCarModal}
        handleClose={handleCloseCarModal}
        handleOpen={handleOpenCarModal}
      >
        <Grid justifyContent="center" xs={12} sm={12}>
          <div>
            <Carousel autoPlay={false}>
              {/* {carDetails[0]?.car_images.map((item, i) => (
                <div className="cnicImage" key={i}>
                  <img src={item} />
                </div>
              ))} */}
            </Carousel>
          </div>
        </Grid>
      </TransitionModal>
    </Grid>
  );
};

export default CarView;
