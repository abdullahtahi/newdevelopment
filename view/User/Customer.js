import React, { useEffect, useState } from "react";
import Table from "../../components/TableUsers/Table";
import {
  getUsersByStatus,
  getUsersByRole,
  updateUser,
} from "../../features/users/user.action";
import { emptyState } from "../../features/notification/notification.action";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Tooltip,
  Chip,
  Avatar,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import TransitionModal from "../../components/TransitionModal/TransitionModal";
import "./User.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";

const Customer = () => {
  let dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  const styles = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [title, set_title] = useState("");
  const [message, set_message] = useState("");
  // const { sentto_all } = useSelector((state) => state.notifications);
  const { users, loading } = useSelector((state) => state.users);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (location?.hash == "#active") {
      dispatch(getUsersByStatus("customer", true));
      setValue(1);
    } else if (location?.hash == "#inactive") {
      dispatch(getUsersByStatus("customer", false));
      setValue(2);
    } else if (location?.hash == "#all" || location?.hash == "") {
      dispatch(getUsersByRole("customer"));
      setValue(0);
    }
  }, []);
  const closeModal = () => {
    setOpenModal(false);
    set_title("");
    set_message("");
  };

  useEffect(() => {
    // dispatch(getUsersByRole("renter"));
    dispatch(emptyState());
    // console.log(window.location.href);
  }, []);
  const getAll = () => {
    dispatch(getUsersByRole("customer"));
    history.push(`/customers#all`);
  };
  const getAllActiveCustomers = () => {
    dispatch(getUsersByStatus("customer", true));
    history.push(`/customers#active`);
  };
  const getAllInactiveCustomers = () => {
    dispatch(getUsersByStatus("customer", false));
    history.push(`/customers#inactive`);
  };

  // const sendMessage = () => {
  //   let body = {
  //     title: title,
  //     message: message,
  //     notification_topic: "RENTER_NOTIFICATIONS",
  //   };
  //   dispatch(sendNotificationToAll(body));
  // };

  //close modal when message sent
  // if (sentto_all == true) {
  //   setTimeout(() => {
  //     setOpenModal(false);
  //     set_title("");
  //     set_message("");
  //   }, 1000);
  // }
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
            <Link to={`/customers/${params.action}`}>
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
        // cnic: user?.cnic,
        status: user.is_active ? "Active" : "Inactive",
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
        header={"Customers"}
        blockUser={updateUser}
        path="renters"
        loading={loading}
        columns={columns}
        rows={rows}
        value={value}
        setValue={setValue}
        getAllUsers={getAll}
        getAllInactive={getAllInactiveCustomers}
        getAllActive={getAllActiveCustomers}
        setOpenModal={setOpenModal}
      />
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
          {/* <Button
            style={{ marginRight: 10 }}
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => sendMessage()}
          >
            {sentto_all ? <CircularProgress /> : "Send"}
          </Button> */}
          <Button variant="outlined" size="small" onClick={() => closeModal()}>
            Cancel
          </Button>
        </Grid>
      </TransitionModal>
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
export default Customer;
