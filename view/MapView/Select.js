/* global google */
import React, { Component } from "react";
import { Polygon, Marker, TileLayer } from "react-leaflet";
import osm from "./osm-providers";
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer } from "react-leaflet";
import { Button } from "@mui/material";

function Select(props) {
  const { isEdit, coords } = props;
  const center = [33.6844, 73.0479];
  return (
    <>
      <MapContainer
        center={center}
        zoom={12}
        style={{ width: "100%", height: "70vh" }}
      >
        <Polygon
          positions={coords}
          // editable={true}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
          }}
        />
        <TileLayer
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
      </MapContainer>
      <div
        style={{
          width: "100%",
          padding: "20px",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: 180 }}
          onClick={() => isEdit(true)}
        >
          Edit
        </Button>
      </div>
    </>
  );
}

export default Select;
