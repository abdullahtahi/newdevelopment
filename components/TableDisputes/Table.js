import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Grid, Chip } from "@material-ui/core";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useDispatch } from "react-redux";
import Alert from "../Alert/Alert";
import { Tooltip } from "@material-ui/core";
import "./Table.css";
import icons from "../SearchTable/icons";
import EditIcon from "@material-ui/icons/Edit";
import MaterialTable from "material-table";
import moment from "moment";
import { useHistory } from "react-router-dom";

const TableDispute = ({
  header,
  loading,
  disputes,
  getDisputeByStatus,
  getAllDisputes,
  value,
  setValue,
  handleChangeTabs
}) => {
  let dispatch = useDispatch();
  const styles = useStyles();
  let history = useHistory();

  const renderActionButton = (params) => {
    return (
      <Tooltip title="Edit">
        <Link to={`/dispute/edit/${params.action}`}>
          <EditIcon
            fontSize="medium"
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
    );
  };

  const columns = [
    { field: "id", title: "S#", width: 200, sortable: false },
    {
      field: "status",
      title: "Status",
      sortable: false,
      width: 630,
    },
    {
      field: "sender",
      title: "Created By",
      sortable: false,
      width: 630,
    },
    {
      field: "date",
      title: "Date Created",
      sortable: false,
      width: 630,
    },
    {
      field: "message",
      title: "Message",
      sortable: false,
      width: 630,
    },
    {
      field: "action",
      title: "Action",
      sortable: false,
      render: renderActionButton,
      width: 200,
    },
  ];

  let rows = [];
  if (disputes) {
    let s = 1;
    disputes.forEach((dispute) => {
      rows.push({
        id: s++,
        status: dispute.status,
        message: dispute.comments[0].message,
        date: dispute.comments[0].date
          ? moment(dispute.comments[0].date)
              .utcOffset("+0500")
              .format("DD-MMM-YYYY HH:mm:ss")
          : "-",
        action: dispute._id,
        sender: dispute.comments[0].sender,
      });
    });
  }
  return (
    <Grid item xs={12}>
      <div className="viewuser">
        <div className="viewuser__head">
          <h2 className={styles.heading2}>{header}</h2>
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
                  onChange={handleChangeTabs}
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
                    label="All Disputes"
                    onClick={() => {
                      dispatch(getAllDisputes());
                      history.push("/disputes#all");
                      setValue(0);
                    }}
                  />

                  <Tab
                    className={styles.tab}
                    value={1}
                    label="open"
                    onClick={() => {
                      getDisputeByStatus("open");
                      history.push("/disputes#open");
                      setValue(1);
                    }}
                  />
                  <Tab
                    className={styles.tab}
                    value={2}
                    label="closed"
                    onClick={() => {
                      getDisputeByStatus("close");
                      history.push("/disputes#close");
                      setValue(2);
                    }}
                  />
                </Tabs>
              }
              icons={icons}
              data={rows}
              columns={columns}
              options={{
                pageSize: 100,
                pageSizeOptions: [5, 20, 50, 100],
                paginationType: "stepped",
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
  );
};
const useStyles = makeStyles({
  heading2: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
  },
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

export default TableDispute;
