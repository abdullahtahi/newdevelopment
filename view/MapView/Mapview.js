import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PolygonMap from "./PolygonMap";
import Select from "./Select";
import api from "../../api/index";

const Mapview = () => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const [map, setMap] = useState();
  const [view, setView] = useState();
  useEffect(() => {
    getMap();
  }, [isEdit]);

  const getMap = async () => {
    try {
      const {
        data: { data },
      } = await api.get("/map");
      let arr = [];

      data[0].map.map((item, index) => {
        arr.push(item.latlngs);
      });
      setMap(data[0].map);
      setView(arr);
    } catch (err) {}
  };
  return (
    <div>
      {view && map ? (
        <Grid container className={classes.root}>
          <Grid item xs={12} lg={12}>
            <br />
            <div className="viewbooking_head">
              <Grid item xs={4} sm={4} align="left">
                <h2
                  style={{
                    fontWeight: 300,
                    fontSize: 20,
                  }}
                >
                  Map Restictions
                </h2>
              </Grid>
              <Grid item xs={8} sm={8} align="right"></Grid>
            </div>
            {isEdit ? (
              <PolygonMap
                coords={view}
                setCoords={setView}
                isEdit={setIsEdit}
                mapData={map}
              />
            ) : (
              <Select isEdit={setIsEdit} coords={view} />
            )}
          </Grid>
          <Grid item xs={12} sm={12}></Grid>
        </Grid>
      ) : (
        <></>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
  },
}));

export default Mapview;
