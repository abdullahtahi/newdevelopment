import React, { useEffect, useState } from "react";
import {
  getUser,
  updateUser,
  clearUserAccount,
  getAllUserHistory,
  updateUserStatus,
} from "../../features/users/user.action";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios"
import {
  sendNotificationToUser,
  emptyState,
} from "../../features/notification/notification.action";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { useParams, useLocation } from "react-router-dom";
import {
  Grid,
  TextField,
  Chip,
  Button,
  FormLabel,
  CircularProgress,
  Typography,
  makeStyles,
  FormHelperText,
  Tooltip,
  Input
} from "@material-ui/core";
import TransitionModal from "../../components/TransitionModal/TransitionModal";
import Rating from "@material-ui/lab/Rating";
import Alert from "../../components/Alert/Alert";
import MaterialTable from "material-table";
import { IconButton } from "@material-ui/core";
import icons from "./icons";
import { Link } from "react-router-dom";
import moment from "moment";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import { MdSettingsApplications } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import "./User.css";
import {
  _emptyUri,
  uploadCnicBackImage,
  uploadCnicFrontImage,
} from "../../features/imageUpload/imageUpload.action";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
  },
  label: {
    fontSize: "12px",
  },
  heading2: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
  },
  heading1: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
    color: "black",
  },
  label1: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    letterSpacing: ".04rem",
  },
  btn: {
    backgroundColor: "#1F1D61",
    color: "white",
    border: "1px solid white",
    textTransform: "initial",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1F1D61",
    },
  },
  Pending1:{
    backgroundColor: "#e0e0e0",
    color: "black",
  },
  Pending2: {
    backgroundColor: "#3f50b5",
    color: "white",
    position:"absolute",
    right:"0"
  },
  Pending: {
    backgroundColor: "#3f50b5",
    color: "white",
  },
  Rejected: {
    backgroundColor: "#e55353",
    color: "white",
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
  cleared: {
    border: "1px solid #2eb85c",
    color: "#2eb85c",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  notcleared: {
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  pstatusPending: {
    backgroundColor: "#f9b115",
    color: "white",
  },
  Cleared: {
    backgroundColor: "#2eb85c",
    color: "white",
  },
  NotCleared: {
    backgroundColor: "#e55353",
    color: "white",
  },
  cnicImageModal: {
    textTransform: "initial",
    color: "#1F1D61",
    fontSize: 14,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "white",
    },
    marginTop: -8,
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

const ViewUser = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const location = useLocation();
  let { id } = useParams();
  const { user, loading, history, pendingclearance } = useSelector(
    (state) => state.users
  );
  const { cnicBack, cnicFront } = useSelector((state) => state.image);
  const [title, set_title] = useState("");
  const [message, set_message] = useState("");
  const { sentto_all } = useSelector((state) => state.notifications);
  const [expanded, setExpanded] = useState("panel1");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [Openamountmodal,setOpenamountmodal]=useState(false)
  // const [closeamountmodal,setcloseamountmodal]=useState(false)
  const [openClearModal, setOpenClearModal] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [openCNICModal, setOpenCNICModal] = useState(false);
  const [openPictureModal, setOpenPictureModal] = useState(false);
  const [userdetails, setuserdetails] = useState(user);
  const [openModal, setOpenModal] = useState(false);
  const [amountinput, setamountinput] = useState();
  const [errorMessage, seterrorMessage] = useState("");
  const [errortype, seterrortype] = useState("");
const [validateform,setvalidateform]=useState()
  const [userCleared, setuserCleared] = useState(
    user && user[0]?.clear_account
  );
  const [average, setAvg] = useState(0);
  const [userstatus, setuserstatus] = useState(user && user[0]?.status);
  const [user_id, setuser_id] = useState("");
  const [frontcnic, setfrontcnic] = useState("");
  const [backcnic, setbackcnic] = useState("");
  const active_url = location.pathname.split("/");
  useEffect(() => {
    dispatch(getUser(id));
    dispatch(emptyState());
  }, []);

  const handleOpenPictureModal = () => {
    setOpenPictureModal(true);
  };

  const handleClosePictureModal = () => {
    setOpenPictureModal(false);
  };

  useEffect(() => {
    if (id && user.length > 0) {
      setuserdetails(user);
      setuser_id(id);
      setuserstatus(user && user[0]?.status);
      setuserCleared(user && user[0]?.clear_account);
      var sum = 0;
      for (var i = 0; i < user[0].rating.length; i++) {
        sum += parseInt(user[0].rating[i].rating, 10); //don't forget to add the base
      }
      var avg = sum / user[0].rating.length;
      setAvg(avg);
    }
  }, [user]);
  const blockCall = () => {
    setuserstatus(false);
    const body = { is_active: false, status: "rejected" };
    dispatch(updateUserStatus(body, user_id));
    setOpenUpdateModal(false);
  };

  const activeCall = () => {
    setuserstatus("approved");
    const body = { status: "approved", is_active: true };
    dispatch(updateUserStatus(body, user_id));
    setOpenUpdateModal(false);
  };
  const clearAccountCall = () => {
    const body = { clear_account: true };
    dispatch(clearUserAccount(body, user_id));
    setuserCleared("Account is CLEARED");
    setOpenClearModal(false);
  };

  const handleOpenUpdateModal = () => {
      setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleOpenaddamountModal=()=>{
    setOpenamountmodal(true)
  }
  const handleCloseaddamountModal = () => {
    setOpenamountmodal(false)
  };

  const handleOpenClearModal = () => {
    setOpenClearModal(true);
  };

  const handleCloseClearModal = () => {
    setOpenClearModal(false);
  };

  const handleOpenCNICModal = () => {
    setOpenCNICModal(true);
  };

  const handleCloseCNICModal = () => {
    setOpenCNICModal(false);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const CNICImageArray = [
    {
      img: user && user[0]?.cnic_front_image,
      description: "FRONT IMAGE",
    },
    {
      img: user && user[0]?.cnic_back_image,
      description: "BACK IMAGE",
    },
  ];

  useEffect(() => {
    dispatch(getAllUserHistory(id));
  }, []);

  const renderStatusButton = (params) => {
    return (
      <Chip
        variant="outlined"
        color="warning"
        size="small"
        className={
          params?.status == "Cleared" ? classes?.cleared : classes?.notcleared
        }
        label={params.status}
      ></Chip>
    );
  };
  const renderActionButton = (params) => {
    return (
      <>
        <Tooltip title="View Bookings Details">
          <Link
            to={{
              pathname: `/captain/bookinghistory/${id}`,
              state: { data: params.data },
            }}
          >
            <AiFillEye
              size={25}
              style={{
                padding: 2,
                border: "1px solid #1F1D61",
                borderRadius: 8,
                backgroundColor: "white",
                color: "#1F1D61",
              }}
            />
          </Link>
        </Tooltip>
        {/* {params.showSetting == false && params.status == "Not cleared" && ( */}
        {params.status == "Not cleared" && (
          <Tooltip title="Click here to clear account">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              style={{ marginTop: -19, marginLeft: 0 }}
              onClick={handleOpenClearModal}>
              <MdSettingsApplications
                size={25}
                style={{
                  padding: 2,
                  border: "1px solid #e55353",
                  borderRadius: 8,
                  backgroundColor: "white",
                  color: "#e55353",
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  };

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const getDateRange = (date) => {
    let month = new Date(date).getMonth();
    let day = new Date(date).getDate();
    let year = new Date(date).getFullYear();

    const endOfMonth = moment(date).endOf("month").format("DD/MMM/YYYY");
    let modifiedRange;
    if (day == 1) {
      modifiedRange =
        "01" + " - " + "15" + "/" + monthNames[month] + "/" + year;
    } else if (day == 16) {
      modifiedRange = day + " - " + endOfMonth;
    }
    return modifiedRange;
  };

  const getDay = (date) => {
    let _date = moment(date).format("DD-MMM-YYYY");
    let month = new Date(date).getMonth();
    let day = new Date(date).getDate();
    let year = new Date(date).getFullYear();
    const endOfMonth = moment(date).endOf("month").format("DD-MMM-YYYY");
    let modifiedEndRange;
    if (day == 1) {
      modifiedEndRange = "15" + "-" + monthNames[month] + "-" + year;
    } else if (day == 16) {
      modifiedEndRange = endOfMonth;
    }
    const currentDate = moment(new Date()).format("DD-MMM-YYYY");
    let check = moment(currentDate).isBetween(_date, modifiedEndRange); // true
    let checkStartDate = moment(currentDate).isSame(modifiedEndRange, "day"); // true
    let checkEndDate = moment(currentDate).isSame(_date, "day"); // true
    if (check && checkStartDate && checkEndDate) return true;
    else if (!check && !checkStartDate && !checkEndDate) return false;
  };
  const columns = [
    {
      field: "_id",
      title: "Date",
    },
    {
      field: "numberOfBookings",
      title: "No of bookings",
    },
    {
      field: "totalEarned",
      title: "Total Earned",
    },
    {
      field: "company_profit",
      title: "Company Profit",
    },
    {
      field: "status",
      title: "Status",
      render: renderStatusButton,
    },
    {
      field: "action",
      title: "Action",
      render: renderActionButton,
    },
  ];

  useEffect(() => {
    dispatch(_emptyUri);
  }, []);
  const handleCnicRequest = async (e, type) => {
    const formData = new FormData();
    if (type == "front") {
      formData.append("files", e.target.files[0]);
      dispatch(uploadCnicFrontImage(formData, id));
      setfrontcnic(cnicFront);
    } else if (type == "back") {
      formData.append("files", e.target.files[0]);
      dispatch(uploadCnicBackImage(formData, id));
      setbackcnic(cnicBack);
    }
  };
  const sendMessage = () => {
    let body = {
      title: title,
      message: message,
      user_id: id,
      user_role: active_url[1] == "captains" ? "captain" : "customer",
      resp_message: `Notification sent to ${
        user && userdetails && userdetails[0]?.fullname
      }.`,
    };
    dispatch(sendNotificationToUser(body));
  };
  //close modal when message sent
  if (sentto_all == true) {
    setTimeout(() => {
      setOpenModal(false);
      set_title("");
      set_message("");
    }, 1000);
  }
  const closeModal = () => {
    setOpenModal(false);
    set_title("");
    set_message("");
  };
  const validation=(name,value)=>{
    // console.log(amountinput)
    if (name == "addtowalllet") {
      const re = /^[0-9]+$/;
      if (!re.test(value)) {
        seterrorMessage("Only positive numbers allowed");
        seterrortype("addtowalllet")
      }

    }
  }

  const [age, setAge] =useState('');
  const handleDropdown =(event) => {
    
    setAge(event.target.value);
    console.log(event.target.value)
    console.log(age)
  };
  
  const addamount=()=>{
// if(age==="")
  }

  let rows = [];
  if (history) {
    let s = 1;
    history.forEach((hist) => {
      console.log(hist);
      rows.push({
        s: s++,
        _id: getDateRange(hist._id),
        bookings: hist.bookings,
        company_profit: hist.company_profit.toFixed(2),
        numberOfBookings: hist.numberOfBookings,
        showSetting: getDay(hist._id),
        totalEarned: hist.totalEarned.toFixed(2),
        status:
          hist.numberOfBookings == hist.yesCleared ? "Cleared" : "Not cleared",
        data: hist,
      });
    });
  }

  return loading ? (
    <CircularProgress className="loader" style={{ marginTop: 50 }} />
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div className="viewuser">
          <div className="viewuser__head">
            <Grid item xs={12} sm={4} align="left">
              <div className="viewuser__profileimage">
                {user && userdetails && userdetails[0]?.profile_image ? (
                  <img
                    onClick={handleOpenPictureModal}
                    src={user && userdetails && userdetails[0]?.profile_image}
                  />
                ) : (
                  ""
                )}
                <h2
                  style={{
                    fontWeight: 300,
                    fontSize: 20,
                    marginBottom: 10,
                  }}
                >
                  User Details
                </h2>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} align="right">
              <Button
                className={userstatus ? classes.Pending : classes.Rejected}
                variant="contained"
                size="medium"
                style={{ marginRight: 10, width: 200 }}
              >
                {userstatus == "approved"
                  ? "Approved"
                  : userstatus == "pending"
                  ? "Pending"
                  : "Rejected"}
              </Button>

              {active_url[1] == "captains" && (
                <Button
                  className={userCleared ? classes.Pending : classes.Rejected}
                  variant="contained"
                  size="medium"
                  style={{ marginRight: 10, width: 200 }}
                >
                  {userCleared ? "Account is CLEARED" : "Account Not Cleared"}
                </Button>
              )}
              <Button
                variant="contained"
                size="medium"
                style={{ marginRight: 10, width: 200 }}
                onClick={handleOpenUpdateModal}
              >
                Update Status
              </Button>
            </Grid>
          </div>
          <div className="alert-container">
            <Alert />
          </div>
          {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              size="medium"
              style={{ marginRight: 10, width: 200 }}
              onClick={() => setOpenModal(true)}
            >
              Send Notification
            </Button>
          </div> */}
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
                User Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                {!isEdit && userdetails[0]?.user_role === "captain" && (
                  <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setEdit(true)}
                  />
                )}
              </div>
            </AccordionDetails>

            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                Full Name
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {user && userdetails && userdetails[0]?.fullname}
              </Typography>
              <Button
                className={classes.cnicImageModal}
                onClick={handleOpenPictureModal}
              >
                View Profile Image
              </Button>
            </AccordionDetails>

            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                Mobile Number
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {user && userdetails && userdetails[0]?.mobile_number}
              </Typography>
            </AccordionDetails>

            {user && userdetails && userdetails[0]?.user_role !== "customer" && (
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  CNIC
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {user && userdetails && userdetails[0]?.cnic}
                </Typography>
                <Button
                  className={classes.cnicImageModal}
                  onClick={handleOpenCNICModal}
                >
                  View CNIC Images
                </Button>
              </AccordionDetails>
            )}

            {isEdit && (
              <>
                <AccordionDetails>
                  <Typography className={classes.subheadingAccordian}>
                    Upload Front CNIC Image
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    <input
                      accept="image/png, image/gif, image/jpeg"
                      multiple
                      type="file"
                      onChange={(e) => handleCnicRequest(e, "front")}
                    />
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography className={classes.subheadingAccordian}>
                    Upload Back CNIC Image
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    <input
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      multiple
                      onChange={(e) => handleCnicRequest(e, "back")}
                    />
                  </Typography>
                </AccordionDetails>
              </>
            )}

            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                No Of Rentals
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {user && userdetails && userdetails[0]?.no_of_rentals}
              </Typography>
            </AccordionDetails>

            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                Rating
              </Typography>

             

              <Typography className={classes.secondaryHeading}>

                
                <Rating
                  precision={0.1}
                  readOnly
                  name="rating"
                  value={average}
                />
                {user && userdetails && userdetails[0]?.rating == 0 && (
                  <div> No feedback given.</div>
                )}
              </Typography>
            </AccordionDetails>
            <Typography 
            className={classes.subheadingAccordian}>
              <Button   onClick={handleOpenaddamountModal}
              //  color="#002884"
               className={classes.Pending2}
               variant="contained"
               size="medium"
               style={{ marginRight: 10 }}>Add the amount</Button>
              </Typography>

            {isEdit && (
              <AccordionDetails>
                <Button
                  className={classes.Rejected}
                  variant="contained"
                  size="medium"
                  onClick={() => setEdit(false)}
                  style={{ marginRight: 10, width: 120 }}
                >
                  Cancel
                </Button>
              </AccordionDetails>
            )}
          </Accordion>
        </div>
      </Grid>
      <TransitionModal
        loading={loading}
        open={Openamountmodal}
        handleClose={handleCloseaddamountModal}
        handleOpen={handleOpenaddamountModal}
      >
        <>
          <FormLabel className={classes.heading1} style={{ marginBottom: 10 }}>
            Add the amount
          </FormLabel>
          <br />
          <Grid item xs={12} sm={12} style={{ marginTop: 10 }}>
           <TextField 
           name={"addtowalllet"}
           onChange={(e)=>setamountinput(e.target.value)}
           placeholder="Enter a amount to add"
           value={amountinput}
           onBlur={() => validation("addtowalllet", amountinput)}
           />
{/*   <p>{errorMessage}</p> */}
           <FormHelperText id="my-helper-text" style={{ color: "red" }}>
                {errortype == "addtowalllet" &&
                  errorMessage &&
                  errorMessage}
              </FormHelperText>
              <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleDropdown}

        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
            <Button
              color="#3f50b5"
              className={classes.Pending}
              variant="contained"
              size="medium"
              style={{ marginRight: 10 }}
              disabled={age && amountinput ? false : true}
              onClick={addamount}>
              Add Amount
            </Button>
            <Button
              color="#3f50b5"
              className={classes.Pending1}
              variant="contained"
              size="medium"
              style={{ marginRight: 10 }}
              onClick={handleCloseaddamountModal}>
              Cancel
            </Button>
          </Grid>
        </>
      </TransitionModal>
   
      <TransitionModal
        loading={loading}
        open={openUpdateModal}
        handleClose={handleCloseUpdateModal}
        handleOpen={handleOpenUpdateModal}
      >
        <>
          <FormLabel className={classes.heading1} style={{ marginBottom: 10 }}>
            Update Status
          </FormLabel>
          <br />
          <Grid item xs={12} sm={12} style={{ marginTop: 10 }}>
            <Button
              color="#4CAF50"
              className={classes.Pending}
              variant="contained"
              size="medium"
              style={{ marginRight: 10 }}
              onClick={() => activeCall()}
            >
              Approve
            </Button>
            <Button
              className={classes.rejectBtn}
              color="secondary"
              variant="contained"
              size="medium"
              onClick={() => blockCall()}
            >
              Reject
            </Button>
          </Grid>
        </>
      </TransitionModal>
      <TransitionModal
        loading={loading}
        open={openClearModal}
        handleClose={handleCloseClearModal}
        handleOpen={handleOpenClearModal}
      >
        <>
          <FormLabel className={classes.heading1}>
            Clearance Permission
          </FormLabel>
          <br />
          <Grid
            item
            xs={12}
            sm={12}
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <FormLabel className={classes.label1}>
              Are you sure you want to clear{" "}
              {user && userdetails && userdetails[0]?.fullname}'s account?{" "}
            </FormLabel>
          </Grid>
          <Grid justifyContent="center" xs={12} sm={12}>
            <Button
              color="#4CAF50"
              className={classes.Pending}
              variant="contained"
              size="medium"
              style={{ marginRight: 10 }}
              onClick={() => clearAccountCall()}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={() => handleCloseClearModal()}
            >
              Cancel
            </Button>
          </Grid>
        </>
      </TransitionModal>
      <TransitionModal
        open={openCNICModal}
        handleClose={handleCloseCNICModal}
        handleOpen={handleOpenCNICModal}
      >
        <Grid xs={10} sm={10} container justifyContent="space-between">
          {CNICImageArray.map((item, i) => (
            <Grid item xs={5} sm={5}>
              <div className={"cnicImageuser"}>
                <img
                  src={item.img}
                  alt={`${
                    user && userdetails && userdetails[0]?.fullname
                  } cnic front image`}
                />
              </div>
              <p style={{ textAlign: "center", fontWeight: "bold" }}>
                {item.description}
              </p>
            </Grid>
          ))}
        </Grid>
      </TransitionModal>
      <TransitionModal
        open={openPictureModal}
        handleClose={handleClosePictureModal}
        handleOpen={handleOpenPictureModal}
      >
        <Grid justifyContent="center" xs={12} sm={12}>
          <div className={"cnicImageuser"}>
            {userdetails && userdetails[0]?.profile_image ? (
              <img
                src={userdetails && userdetails[0]?.profile_image}
                alt={`${
                  user && userdetails && userdetails[0]?.fullname
                } profile image`}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Image found
              </div>
            )}
          </div>
        </Grid>
      </TransitionModal>
      <TransitionModal
        open={openModal}
        handleClose={() => closeModal()}
        handleOpen={() => setOpenModal(true)}
        style={{ width: 200 }}
      >
        <Grid item xs={12} sm={12}>
          <TextField
            name={"title"}
            value={title}
            label="Title"
            margin="normal"
            onChange={(e) => set_title(e.target.value)}
            style={{ width: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name={"Message"}
            value={message}
            label="Message"
            margin="normal"
            onChange={(e) => set_message(e.target.value)}
            style={{ width: 300 }}
            multiline
            rows={4}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} align="center" style={{ marginTop: 10 }}>
          <Button
            style={{ marginRight: 10 }}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => sendMessage()}
          >
            {sentto_all ? <CircularProgress /> : "Send"}
          </Button>
          <Button variant="outlined" size="small" onClick={() => closeModal()}>
            Cancel
          </Button>
        </Grid>
      </TransitionModal>
      {active_url[1] == "captains" && (
        <Grid item xs={12}>
          <div className="viewuser">
            <div className="viewuser__head">
              <Grid container>
                <Grid item xs={6}>
                  <h2 className={classes.heading2}>Clearance History</h2>
                </Grid>
              </Grid>
            </div>

            <div style={{ width: "100%" }}>
              {loading ? (
                <CircularProgress className="loader" />
              ) : (
                <MaterialTable
                  title={
                    <div className={classes.label1}>
                      Pending Clearance:
                      {pendingclearance &&
                      pendingclearance.length > 0 &&
                      pendingclearance[0] &&
                      pendingclearance[0].pendingClearance
                        ? pendingclearance[0].pendingClearance.toFixed(2)
                        : 0}
                      <br />
                      Last Clearance Date :
                      {moment(
                        userdetails && userdetails[0]?.last_clearance_date
                      ).format("DD/MMM/YYYY")}
                    </div>
                  }
                  icons={icons}
                  data={rows}
                  columns={columns}
                  sortable={false}
                  options={{
                    pageSize: 100,
                    pageSizeOptions: [5, 20, 50, 100],
                    paginationType: "stepped",
                    search: true,
                    headerStyle: {
                      fontWeight: "bold",
                    },
                    rowStyle: {
                      fontSize: 14,
                      color: "#604339",
                      letterSpacing: "0.5px",
                    },
                  }}
                />
              )}
            </div>
          </div>
          
        </Grid>
        
      )}
    </Grid>
  );
};

export default ViewUser;
