import React, { useEffect, useState } from "react";
import Table from "../../components/TableUsers/Table";
import {
  getUsersByStatus,
  getUsersByRole,
  updateUser,
  getOwnersCarCount,
} from "../../features/users/user.action";
import { Grid, Tooltip, Chip, Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import TransitionModal from "../../components/TransitionModal/TransitionModal";
import { emptyState } from "../../features/notification/notification.action";
import "./User.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

const Owners = () => {
  const styles = useStyles();
  let dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [title, set_title] = useState("");
  const [message, set_message] = useState("");
  const { users, loading } = useSelector((state) => state.users);
  const { sentto_all } = useSelector((state) => state.notifications);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (location?.hash == "#active") {
      dispatch(getUsersByStatus("captain", true));
      setValue(1);
    } else if (location?.hash == "#inactive") {
      dispatch(getUsersByStatus("captain", false));
      setValue(2);
    } else if (location?.hash == "#nocars") {
      dispatch(getOwnersCarCount());
      setValue(3);
    } else if (location?.hash == "#all" || location?.hash == "") {
      dispatch(getUsersByRole("captain"));
      setValue(0);
    }
  }, []);

  useEffect(() => {
    // dispatch(getUsersByRole("captain"));
    dispatch(emptyState());
  }, []);

  const getAll = () => {
    dispatch(getUsersByRole("captain"));
    history.push(`/captains#all`);
  };

  const OwnersCarCount = () => {
    dispatch(getOwnersCarCount());
    history.push(`/captains#nocars`);
  };

  const getAllActiveOwners = () => {
    dispatch(getUsersByStatus("captain", true));
    history.push(`/captains#active`);
  };
  const getAllInactiveOwners = () => {
    dispatch(getUsersByStatus("captain", false));
    history.push(`/captains#inactive`);
  };
  // const sendMessage = () => {
  //   let body = {
  //     title: title,
  //     message: message,
  //     notification_topic: "OWNER_NOTIFICATIONS",
  //   };
  //   dispatch(sendNotificationToAll(body));
  // };

  const closeModal = () => {
    setOpenModal(false);
    set_title("");
    set_message("");
  };

  //close modal when message sent
  if (sentto_all == true) {
    setTimeout(() => {
      setOpenModal(false);
      set_title("");
      set_message("");
    }, 1000);
  }

  const capitalize = (string) => {
    return string?.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderStatusButton = (params) => {
    return (
      <Chip
        variant="contained"
        className={
          params.status == "Active"
            ? styles.statusActive
            : styles.statusInActive
        }
        size="small"
        label={params.status}
      />
    );
  };
  const renderImageCell = (params) => {
    return (
      <Avatar
        alt={params.fullName}
        src={params.image}
        className={styles.large}
      />
    );
  };
  const renderActionButton = (params) => {
    return (
      <Grid item xs={12}>
        <Tooltip title="View Details">
          <IconButton style={{ padding: 2 }}>
            <Link to={`/captains/${params.action}`}>
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
          </IconButton>
        </Tooltip>
      </Grid>
    );
  };

  const columns = [
    { field: "id", title: "S#" },
    {
      field: "image",
      title: "Avatar",
      render: renderImageCell,
    },
    {
      field: "fullName",
      title: "Full name",
    },
    {
      field: "mobileNumber",
      title: "Mobile",
    },

    {
      field: "cnic",
      title: "CNIC",
    },
    // { field: "countcars", title: "No of cars" },
    {
      field: "status",
      title: "Status",
      render: renderStatusButton,
    },
    {
      field: "createdAt",
      title: "Date Created",
    },
    {
      field: "updatedAt",
      title: "Date Updated",
    },

    {
      field: "action",
      title: "Action",
      render: renderActionButton,
    },
  
  ];
  let rows = [];
  if (users) {
    let s = 1;
    users.forEach((user) => {
      rows.push({
        id: s++,
        image: user?.profile_image,
        fullName: capitalize(user?.fullname),
        mobileNumber: user?.mobile_number,
        // countcars: user?.count == 0 ? 0 : "-",
        cnic: user?.cnic,
        status: user.status === "approved" ? "Active" : "Inactive",
        action: user._id,
        createdAt: user.createdAt
          ? moment(user.createdAt)
              .utcOffset("+0500")
              .format("DD-MMM-YYYY HH:mm:ss")
          : "-",
        updatedAt: user.updatedAt
          ? moment(user.updatedAt)
              .utcOffset("+0500")
              .format("DD-MMM-YYYY HH:mm:ss")
          : "-",
      });
    });
  }

  return (
    <div className="users">
      <Table
        value={value}
        setValue={setValue}
        header={"Captains"}
        blockUser={updateUser}
        path="captains"
        loading={loading}
        columns={columns}
        rows={rows}
        getAllUsers={getAll}
        getAllInactive={getAllInactiveOwners}
        getAllActive={getAllActiveOwners}
        setOpenModal={setOpenModal}
        OwnersCarCount={OwnersCarCount}
      />
      {/* <TransitionModal
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
            color="primary"
            size="small"
            onClick={() => sendMessage()}
          >
            {sentto_all ? <CircularProgress /> : "Send"}
          </Button>
          <Button variant="outlined" size="small" onClick={() => closeModal()}>
            Cancel
          </Button>
        </Grid>
      </TransitionModal> */}
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  statusActive: {
    backgroundColor: "white",
    border: "1px solid #2eb85c",
    color: "#2eb85c",
    fontWeight: "bold",
  },
  statusInActive: {
    backgroundColor: "white",
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
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
  tabs: {
    marginBottom: "2px",
  },
  tab: {
    fontSize: "12px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
export default Owners;
