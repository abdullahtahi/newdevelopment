import React, { useEffect, useState } from "react";
import { getAllEarnings } from "../../features/earnings/earnings.action";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import icons from "./icons";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import { Tooltip } from "@material-ui/core";
import MaterialTable from "material-table";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "@material-ui/core/Button";
import { BsDot } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import "./UserWallet.css";
import EditIcon from "@material-ui/icons/Edit";
import { AiFillEye } from "react-icons/ai";

const Users = () => {
  const styles = useStyles();
  let dispatch = useDispatch();
  const { earnings, loading } = useSelector((state) => state.earnings);
  var now = new Date();
  let date = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    setStartDate(year + "-0" + month + "-" + "01");
    setEndDate(year + "-0" + month + "-" + 30);
    let body = {
      startDate: year + "-0" + month + "-" + "01",
      endDate: year + "-0" + month + "-" + 30,
    };
    dispatch(getAllEarnings(body));
  }, []);
  const customSearch = (e) => {
    e.preventDefault();
    let body = { startDate: startDate, endDate: endDate };
    dispatch(getAllEarnings(body));
  };
const renderActionButton = (params) => {
    return (
      <>
        <Tooltip title="View User">
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
        </Tooltip>
      </>
    );
  };

  const renderusername = (params) => {
    return (
      <>
        {params.count_notcleared > 0 ? (
          <>
            <Tooltip title="Account not cleared">
              <Grid>
                {params.user}
                <BsDot color="red" size={45} style={{ marginBottom: -17 }} />
              </Grid>
            </Tooltip>
          </>
        ) : (
          params.user
        )}
      </>
    );
  };

  const columns = [
    { field: "id", title: "S#" },
    {
      field: "user",
      title: "Full Name",
      render: renderusername,
    },
    {
      field: "totalBill",
      title: "Bill",
    },
    {
      field: "totalShare",
      title: "Profit",
    },
    {
      field: "action",
      title: "Action",
      render: renderActionButton,
    },
  ];

  let rows = [];
  if (earnings) {
    let s = 1;
    earnings.forEach((earning) => {
      rows.push({
        id: s++,
        user: earning?.captain[0]?.fullname,
        is_cleared: earning?.owner?.clear_account,
        totalBill: earning?.totalBill,
        totalShare: earning?.company_profit.toFixed(2),
        action: earning?._id,
        count_cleared: earning?.count_cleared,
        count_notcleared: earning?.count_notcleared,
      });
    });
  }
  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <Grid item xs={12}>
        <div className="viewuser">
          <div className="viewuser__head">
            <Grid container>
              <Grid item xs={12} sm={12}>
                <h2 className={styles.heading2}>
                  Monthly summary - {monthNames[month]}
                </h2>
              </Grid>
              <Grid item xs={4} sm={4}>
                <label style={{ marginTop: 15, marginRight: 10 }}>
                  Start date
                </label>
                <input
                  type="date"
                  placeholder="Start Date"
                  style={{ marginRight: 8, width: 200 }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <label
                  style={{ marginTop: 15, marginRight: 10, marginLeft: 10 }}
                >
                  End date
                </label>
                <input
                  type="date"
                  placeholder="End Date"
                  style={{ marginRight: 8, width: 200 }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <Button
                  onClick={(e) => customSearch(e)}
                  className={styles.btn}
                  variant="contained"
                  startIcon={<AiOutlineSearch />}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </div>

          <div className="alert-container">
            <Alert />
          </div>
          <div style={{ width: "100%" }}>
            {loading ? (
              <CircularProgress className="loader" />
            ) : (
              <MaterialTable
                title={false}
                icons={icons}
                data={rows}
                columns={columns}
                sortable={false}
                options={{
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
                  pageSize: 100,
                  pageSizeOptions: [5, 20, 50, 100],
                  paginationType: "stepped",
                }}
              />
            )}
          </div>
        </div>
      </Grid>
    </>
  );
};

const useStyles = makeStyles({
  heading2: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
  },
  btn: {
    height: 40,
    backgroundColor: "#1F1D61",
    color: "white",
    marginTop: 10,
    border: "1px solid white",
    textTransform: "initial",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1F1D61",
    },
  },
});

export default Users;
