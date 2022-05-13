import React, { useState } from "react";
import { FeatureGroup, TileLayer, MapContainer, Polygon } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from "./osm-providers";
import { Button, FormControl, TextField, FormLabel } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import api from "../../api/index";
import TransitionModal from "../../components/TransitionModal/TransitionModal";

const center = [33.6844, 73.0479];

const useStyles = makeStyles((theme) => ({
  heading1: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
    color: "black",
  },
  formControl: {
    padding: "10px",
  },
}));

const PolygonMap = (props) => {
  const classes = useStyles();

  const { isEdit } = props;
  const [mapLayers, setMaplayers] = useState(props.mapData);
  const [region, setRegion] = useState("");
  const [regionModal, setRegionModal] = useState({
    open: false,
    leaflet_id: "",
  });

  const ZOOM_LEVEL = 12;

  const onCreate = (e) => {
    const { layerType, layer } = e;

    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      setMaplayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0], region: region },
      ]);
      setRegionModal({
        leaflet_id: _leaflet_id,
        open: true,
        latlngs: layer.getLatLngs()[0],
      });
    }
  };

  const onEdit = (e) => {
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMaplayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const onDelete = (e) => {
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map((_leaflet_id) => {
      setMaplayers((layers) =>
        layers.filter((l) => l.id !== _layers._leaflet_id)
      );
    });
  };
  const saveMap = async () => {
    try {
      await api.post("/map/add", { map: mapLayers });
    } catch (err) {
    } finally {
      isEdit(false);
    }
  };
  const createMap = async (e) => {
    e.preventDefault();
    try {
      await api.post("/map/add", { map: mapLayers });
    } catch (err) {
    } finally {
      setRegionModal({ open: false, id: "", leaflet_id: "" });
    }
  };

  const handleRegionName = (val) => {
    setRegion(val);
    let index = mapLayers.findIndex((x) => x.id === regionModal.leaflet_id);
    if (index !== -1) {
      let temporaryarray = mapLayers.slice();
      temporaryarray[index] = {
        id: regionModal.leaflet_id,
        latlngs: regionModal.latlngs,
        region: val,
      };
      setMaplayers(temporaryarray);
    } else {
      console.log("no match");
    }
  };
  return (
    <>
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        style={{ width: "100%", height: "70vh" }}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={onCreate}
            onEdited={onEdit}
            onDeleted={onDelete}
            draw={{
              rectangle: false,
              polyline: false,
              circle: false,
              circlemaker: false,
              marker: false,
            }}
          />
          {/* <Polygon
            positions={props.coords}
            // editable={false}
            options={{
              strokeColor: "#000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FFF",
              fillOpacity: 0.35,
            }}
          ></Polygon> */}
        </FeatureGroup>
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
      </MapContainer>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: 180 }}
          onClick={() => isEdit(false)}
        >
          Cancel changes
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: 180 }}
          onClick={() => saveMap()}
        >
          Save Map
        </Button>
      </div>
      <TransitionModal
        open={regionModal.open}
        handleClose={() => setRegionModal({ open: false, id: "" })}
      >
        <>
          <form onSubmit={createMap}>
            <FormLabel
              className={classes.heading1}
              style={{ marginBottom: 10 }}
            >
              Create Region
            </FormLabel>
            <br />
            <div className={classes.formControl}>
              <FormControl>
                <TextField
                  name={"regionName"}
                  placeholder={"Region Name"}
                  value={region}
                  required
                  multiline
                  onChange={(e) => handleRegionName(e.target.value)}
                  id="standard-basic"
                  label="Region Name"
                />
              </FormControl>
            </div>
            <div
              className={classes.formControl}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                color="secondary"
                size="small"
                variant="contained"
                type="button"
                onClick={() => {
                  setMaplayers((layer) =>
                    layer.filter((l) => l.id !== regionModal.leaflet_id)
                  );
                  setRegionModal({ open: false, id: "", leaflet_id: "" });
                  isEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                size="small"
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </>
      </TransitionModal>
    </>
  );
};

export default PolygonMap;
