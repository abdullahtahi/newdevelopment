import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, makeStyles } from "@material-ui/core";
import { getEarnings } from "../../features/companyearnings/earnings.action";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../components/Alert/Alert";
import MaterialTable from "material-table";
import { Tabs, Tab } from "@material-ui/core";
import icons from "./icons";
import "./CompanyEarnings.css";

const useStyles = makeStyles(() => ({
  label: {
    fontSize: "12px",
  },
  heading2: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
  },
}));

const ViewUser = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  const styles = useStyles();

  const { monthly, yearly, loading } = useSelector(
    (state) => state.companyearnings
  );
  const [data, setData] = useState();
  const [value, setValue] = useState("1");
  const [tab1, settab1] = useState("Month");

  useEffect(() => {
    dispatch(getEarnings());
    setData(monthly);
  }, []);
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

  const getDatebyyearly = () => {
    settab1("Year");
    setData(yearly);
  };
  const getDatebymonthly = () => {
    settab1("Month");
    setData(monthly);
  };

  const columns = [
    {
      field: "_id",
      title: tab1,
    },
    {
      field: "numberOfBookings",
      title: "Trips",
    },

    {
      field: "company_profit",
      title: "Company Profit",
    },
  ];

  let rows = [];
  if (data) {
    let s = 1;
    data.forEach((hist) => {
      rows.push({
        _id:
          tab1 == "Month"
            ? monthNames[hist._id.month] + " - " + hist._id.year
            : hist._id,
        numberOfBookings: hist.numberOfBookings,
        company_profit: hist.company_profit.toFixed(2),
      });
    });
  }
  return loading ? (
    <CircularProgress className="loader" style={{ marginTop: 50 }} />
  ) : (
    <>
      <div className="users">
        <div className="table">
          <div className="table__head">
            <Grid container>
              <Grid item xs={6}>
                <h2 className={classes.heading2}>Company Earnings</h2>
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
                title={
                  <Tabs
                    className={styles.tabs}
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon label tabs example"
                    value={value}
                  >
                    <Tab
                      className={styles.tab}
                      value={"1"}
                      label="Monthly"
                      onClick={() => {
                        getDatebymonthly();
                        setValue("1");
                      }}
                    />
                    <Tab
                      className={styles.tab}
                      value={"2"}
                      label="Yearly"
                      onClick={() => {
                        getDatebyyearly();
                        setValue("2");
                      }}
                    />
                  </Tabs>
                }
                icons={icons}
                data={rows}
                columns={columns}
                sortable={false}
                options={{
                  search: true,
                  pageSize: 100,
                  pageSizeOptions: [5, 20, 50, 100],
                  paginationType: "stepped",
                  headerStyle: {
                    fontWeight: "bold",
                  },
                  rowStyle: {
                    fontSize: 14,
                    // fontWeight: "bold",
                    color: "#604339",
                    letterSpacing: "0.5px",
                    cursor: "default",
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;
