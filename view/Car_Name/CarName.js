import React, { useEffect } from "react";
import {
  deleteCarName,
  getAllCarName,
} from "../../features/carname/carname.action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles, Grid, Tooltip } from "@material-ui/core";
import SearchTable from "../../components/SearchTable/SearchTable";
import EditIcon from "@material-ui/icons/Edit";
import "./CarName.css";

const CarName = () => {
  let dispatch = useDispatch();
  const { carnames, loading } = useSelector((state) => state.carname);
  useEffect(() => {
    dispatch(getAllCarName());
  }, []);
  const renderActionButton = (params) => {
    return (
      <>
        <Grid item>
          <Tooltip title="Edit">
            <Link to={`/carname/edit/${params.action}`}>
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
        </Grid>{" "}
      </>
    );
  };
  const columns = [
    { field: "id", title: "S#" },
    {
      field: "car_name",
      title: "Vehicle Name",
    },
    {
      field: "brand_name",
      title: "Make",
    },
    {
      field: "action",
      title: "Action",
      render: renderActionButton,
    },
  ];

  let rows = [];
  if (carnames) {
    let s = 1;
    carnames.forEach((carname) => {
      rows.push({
        id: s++,
        car_name: carname.name,
        brand_name: carname?.company.name,
        action: carname._id,
      });
    });
  }

  return (
    <>
      <div className="feature">
        <SearchTable
          rows={rows}
          columns={columns}
          header={"Vehicle Name"}
          path={"carname"}
          loading={loading}
        />
      </div>
    </>
  );
};
const useStyles = makeStyles({
  edit: {
    color: "#2eb85c",
    fontSize: 25,
  },
  delete: {
    color: "#e55353",
    fontSize: 25,
    marginBottom: 12,
  },
});

export default CarName;
