import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  addBrand,
  getBrand,
  updateBrand,
} from "../../features/brand/brand.action";
import {
  uploadImage,
  _emptyUri,
} from "../../features/imageUpload/imageUpload.action";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import {
  FormHelperText,
  CircularProgress,
  Typography,
  Grid,
  TextField,
  makeStyles,
  Button,
  FormLabel,
} from "@material-ui/core";
import "./Brand.css";
import { setAlertMessage } from "../../features/alert/alert.action";
import TransitionModal from "../../components/TransitionModal/TransitionModal";

const BrandForm = () => {
  let dispatch = useDispatch();
  const { saved, brand, loading } = useSelector((state) => state.brand);
  const { imageUrl } = useSelector((state) => state.image);
  let { id } = useParams();
  const location = useLocation();
  const classes = useStyles();
  const active_url = location.pathname.split("/");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [errorNameMessage, seteerrorNameMessage] = useState("");
  const [error, seterror] = useState(false);
  const [makeStatus, setMakeStatus] = useState(false);

  const uploadImageCall = (e) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    dispatch(uploadImage(formData));
  };

  function fetchMyAPI() {
    dispatch(getBrand(id));
  }

  useEffect(() => {
    if (id) {
      fetchMyAPI(id);
    }
  }, []);

  useEffect(() => {
    if (id && brand.length > 0) {
      setName(brand[0].name);
      setImage(brand[0].image);
      setMakeStatus(brand[0].is_active);
    }
  }, [brand]);

  useEffect(() => {
    dispatch(_emptyUri());
  }, []);

  const validation = (att, value) => {
    if (att == "name") {
      if (!value.match(/^[a-zA-Z_ ]*$/)) {
        seteerrorNameMessage("Only letters allowed.");
        setName("");
        seterror(true);
      } else {
        seteerrorNameMessage("");
        seterror(false);
      }
    }
  };
  const blockCall = () => {
    const body = { is_active: false };
    setMakeStatus(false);
    dispatch(updateBrand(body, id));
    setOpenUpdateModal(false);
  };

  const activeCall = () => {
    const body = { is_active: true };
    setMakeStatus(true);

    dispatch(updateBrand(body, id));
    setOpenUpdateModal(false);
  };

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name: name, image: imageUrl };
    if (!name || !imageUrl) {
      dispatch(setAlertMessage("Please fill properly.", "error"));
      return;
    }
    if (id) {
      dispatch(updateBrand(body, id));
    } else {
      dispatch(addBrand(body));
    }
  };

  if (saved == true) {
    return <Redirect to="/company" />;
  }
  return (
    <>
      <div className="brandForm">
        {loading && !brand.length > 0 ? (
          <CircularProgress className="loader" />
        ) : (
          <div className={classes.root}>
            <br />
            <br />
            <div className="alert-container">
              <Alert />
            </div>
            <Typography className={classes.heading2}>
              {active_url[2] == "add" ? "Add" : "Edit"} Make
            </Typography>
            {active_url[2] == "edit" && (
              <div className="viewuser__head">
                <Grid item xs={12} sm={4} align="left">
                  <h2
                    style={{
                      fontWeight: 300,
                      fontSize: 20,
                      marginBottom: 10,
                    }}
                  >
                    Edit Vehicle Make
                  </h2>
                </Grid>
                <Grid item xs={12} sm={8} align="right">
                  <Button
                    className={makeStatus ? classes.Pending : classes.Rejected}
                    variant="contained"
                    size="medium"
                    style={{ marginRight: 10, width: 200 }}
                  >
                    {makeStatus ? "Active" : "In active"}
                  </Button>

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
            )}

            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: 350 }}
                    id="outlined-uncontrolled"
                    label="Make Name"
                    variant="outlined"
                    type={"text"}
                    value={name}
                    name={"name"}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => validation("name", name)}
                  />
                  <FormHelperText id="my-helper-text" style={{ color: "red" }}>
                    {errorNameMessage && errorNameMessage}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-uncontrolled"
                    variant="outlined"
                    style={{ marginTop: 20, marginBottom: 20, width: 350 }}
                    type={"file"}
                    value={active_url[2] == "add" ? image : ""}
                    name={"image"}
                    onChange={(e) => {
                      uploadImageCall(e);
                    }}
                    onBlur={() => validation("image", image)}
                  />
                </Grid>
              </Grid>

              {imageUrl && <img src={imageUrl} width="180px" height="180px" />}
              {!imageUrl && active_url[2] == "edit" && (
                <img src={image} width="180px" height="180px" />
              )}
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
            </form>
          </div>
        )}
        <TransitionModal
          open={openUpdateModal}
          handleClose={handleCloseUpdateModal}
          handleOpen={handleOpenUpdateModal}
        >
          <>
            <FormLabel
              className={classes.heading1}
              style={{ marginBottom: 10 }}
            >
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
      </div>
    </>
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
  Pending: {
    backgroundColor: "#2eb85c",
    color: "white",
  },
  Rejected: {
    backgroundColor: "#e55353",
    color: "white",
  },
}));
export default BrandForm;
