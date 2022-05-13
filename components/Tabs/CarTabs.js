import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const TableCarsTabs = ({
  setValue,
  value,
  getCarByStatus,
  getAllCars,
  getAvailableCars,
  getNonAvailableCars,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();
  return (
    <Tabs
      className={styles.tabs}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
      value={value}
    >
      <Tab
        className={styles.tab}
        value={0}
        label="All Vehicles"
        onClick={() => {
          dispatch(getAllCars());
          setValue(0);
          history.push(`/cars#all`);
        }}
      />
      <Tab
        className={styles.tab}
        value={1}
        label="Active"
        onClick={() => {
          getCarByStatus("active");
          setValue(1);
          history.push(`/cars#active`);
        }}
      />
      <Tab
        className={styles.tab}
        value={2}
        label="In active"
        onClick={() => {
          getCarByStatus("In active");
          setValue(2);
          history.push(`/cars#inactive`);
        }}
      />
      {/* <Tab
        className={styles.tab}
        value={3}
        label="rejected"
        onClick={() => {
          getCarByStatus("rejected");
          setValue(3);
          history.push(`/cars#rejected`);
        }}
      /> */}
      {/* <Tab
        className={styles.tab}
        value={4}
        label="booked"
        onClick={() => {
          getCarByStatus("booked");
          setValue(4);
          history.push(`/cars#booked`);
        }}
      /> */}
      {/* <Tab
        className={styles.tab}
        value={5}
        label="available"
        onClick={() => {
          getAvailableCars();
          setValue(5);
          history.push(`/cars#available`);
        }}
      /> */}
      {/* <Tab
        className={styles.tab}
        value={6}
        label="not available"
        onClick={() => {
          getNonAvailableCars();
          setValue(6);
          history.push(`/cars#notavailable`);
        }}
      /> */}
    </Tabs>
  );
};
const useStyles = makeStyles({
  tabs: {
    marginBottom: "2px",
    margin: "0px",
    padding: "0px",
  },
  tab: {
    fontSize: "12px",
    margin: "0px",
    padding: "0px",
  },
});
export default TableCarsTabs;
