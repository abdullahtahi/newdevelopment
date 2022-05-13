import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormLabel,
  CircularProgress,
  Typography,
  makeStyles,
  FormControl,
} from "@material-ui/core";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import Alert from "../../components/Alert/Alert";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getDispute,
  sendDisputeReply,
  updateDisputeStatus,
} from "../../features/dispute/dispute.action";
import TransitionModal from "../../components/TransitionModal/TransitionModal";
import AudioComponent from "material-ui-audio-player";
import { useHistory } from "react-router-dom";

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
  Pending: {
    backgroundColor: "#2eb85c",
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

const DisputeForm = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const { dispute, loading } = useSelector((state) => state.dispute);
  const [disputestatus, setDisputeStatus] = useState(dispute?.status);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [replyDispute, setDisputeReply] = useState(false);
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState("panel1");
  useEffect(() => {
    dispatch(getDispute(id));
  }, []);

  const updateStatus = () => {
    setDisputeStatus("close");
    dispatch(updateDisputeStatus(id));
    setOpenUpdateModal(false);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const sendReply = (e) => {
    e.preventDefault();
    const body = {
      message: message,
      sender: "support",
    };
    dispatch(sendDisputeReply(id, body));
    setDisputeReply(false);
  };
  return loading ? (
    <CircularProgress className="loader" style={{ marginTop: 50 }} />
  ) : (
    dispute && (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className="viewuser">
            <div className="viewuser__head">
              <Grid item xs={12} sm={4} align="left">
                <div className="viewuser__profileimage">
                  <h2
                    style={{
                      fontWeight: 300,
                      fontSize: 20,
                      marginBottom: 10,
                    }}
                  >
                    Dispute Details
                  </h2>
                </div>
              </Grid>
              <Grid item xs={12} sm={8} align="right">
                <Button
                  className={
                    disputestatus == "open" ? classes.Pending : classes.Rejected
                  }
                  variant="contained"
                  size="medium"
                  style={{ marginRight: 10, width: 200 }}
                >
                  {disputestatus == "open" ? "Open" : "Closed"}
                </Button>

                {disputestatus == "open" && (
                  <Button
                    variant="contained"
                    size="medium"
                    style={{ marginRight: 10, width: 200 }}
                    onClick={() => setOpenUpdateModal(true)}
                  >
                    Update Status
                  </Button>
                )}
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
                  Dispute Details
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
                  {!replyDispute && (
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => setDisputeReply(true)}
                    />
                  )}
                </div>
              </AccordionDetails>

              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Created By
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {Boolean(dispute?.comments?.length) &&
                    dispute?.comments[0]?.sender}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography className={classes.subheadingAccordian}>
                  Trip Details
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  {dispute?.trip?.t_id}
                </Typography>
                <Button
                  className={classes.cnicImageModal}
                  onClick={() => {
                    history.push(`/bookings/${dispute?.trip._id}`);
                  }}
                >
                  View trip
                </Button>
              </AccordionDetails>

              <br />
              {Boolean(dispute?.comments?.length) &&
                dispute?.comments[0]?.audio && (
                  <AccordionDetails>
                    <Typography className={classes.subheadingAccordian}>
                      Audio
                    </Typography>
                    <AudioComponent src={dispute?.comments[0].audio} />
                  </AccordionDetails>
                )}
              <AccordionDetails></AccordionDetails>
              <br />

              {Boolean(dispute?.comments?.length) &&
                dispute?.comments?.map((c, ind) => (
                  <>
                    <AccordionDetails>
                      <Typography className={classes.subheadingAccordian}>
                        {ind + 1}. Message by {c.sender}:
                      </Typography>
                      <Typography className={classes.secondaryHeading}>
                        {c.message}
                      </Typography>
                    </AccordionDetails>
                  </>
                ))}
            </Accordion>
          </div>
        </Grid>
        <TransitionModal
          loading={loading}
          open={openUpdateModal}
          handleClose={() => setOpenUpdateModal(false)}
          handleOpen={() => setOpenUpdateModal(true)}
        >
          <>
            <FormLabel
              className={classes.heading1}
              style={{ marginBottom: 10 }}
            >
              Update Dispute Status
            </FormLabel>
            <br />
            <br />
            <Button
              className={classes.rejectBtn}
              color="secondary"
              variant="contained"
              size="medium"
              onClick={() => updateStatus("close")}
            >
              Close Dispute
            </Button>
          </>
        </TransitionModal>
        <TransitionModal
          loading={loading}
          open={replyDispute}
          handleClose={() => setDisputeReply(false)}
          handleOpen={() => setDisputeReply(true)}
        >
          <>
            <form onSubmit={sendReply}>
              <FormLabel
                className={classes.heading1}
                style={{ marginBottom: 10 }}
              >
                Create Reply
              </FormLabel>
              <br />
              <FormControl className={classes.formControl}>
                <TextField
                  name={"disputeReply"}
                  placeholder={"Dispute Reply"}
                  value={message}
                  required
                  multiline
                  rows={5}
                  onChange={(e) => setMessage(e.target.value)}
                  id="standard-basic"
                  label="Dispute Reply"
                />
              </FormControl>
              <Button
                className={classes.rejectBtn}
                color="primary"
                variant="contained"
                size="medium"
                type="submit"
              >
                Send Reply
              </Button>
            </form>
          </>
        </TransitionModal>
      </Grid>
    )
  );
};

export default DisputeForm;
