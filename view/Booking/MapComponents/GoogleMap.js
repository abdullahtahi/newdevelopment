// MyGoogleMaps.js
import React, { Component } from "react";
import { Button } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import styled from "styled-components";
import { green } from "@material-ui/core/colors";
import AutoComplete from "./Autocomplete";
import Marker from "./Marker";

const theme = createTheme({
  palette: {
    primary: green,
  },
});
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

class MyGoogleMap extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    places: [],
    center: [],
    zoom: 9,
    address: "",
    draggable: true,
    lat: null,
    lng: null,
  };

  componentWillMount() {
    this.setCurrentLocation();
  }
  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });
  };
  onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });
    this._generateAddress();
  };

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  };

  _onClick = (value) => {
    this.setState({
      lat: value.lat,
      lng: value.lng,
    });
    this._generateAddress();
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });
    this._generateAddress();
  };

  addPlace = (place) => {
    this.setState({
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    this._generateAddress();
  };

  _generateAddress() {
    const { mapApi } = this.state;

    const geocoder = new mapApi.Geocoder();

    geocoder.geocode(
      { location: { lat: this.state.lat, lng: this.state.lng } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.setState({ address: results[0].formatted_address });
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
   let self = this;
    navigator.permissions
      .query({
        name: "geolocation",
      })
      .then(function (result) {
        if (result.state == "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            self.setState({
              center: [position.coords.latitude, position.coords.longitude],
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        } else if (result.state == "prompt") {
          navigator.geolocation.getCurrentPosition((position) => {
            self.setState({
              center: [position.coords.latitude, position.coords.longitude],
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        } else if (result.state == "denied") {
          window.alert("Please turn on location!");
        }
      });
  }
  setPickup() {
    this.props.set_pickuppoint({
      longitude: this.state.lng,
      latitude: this.state.lat,
      address: this.state.address,
      name: this.state.address,
    });
    this.props.handleCloseMapModal();
  }
  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;
    return (
      <div className="main-wrapper">
        <Wrapper>
          {mapApiLoaded && (
            <div style={{ position: "relative", zIndex: "5000" }}>
              <AutoComplete
                map={mapInstance}
                mapApi={mapApi}
                addplace={this.addPlace}
              />
            </div>
          )}
          <GoogleMapReact
            center={this.state.center}
            zoom={this.state.zoom}
            draggable={this.state.draggable}
            onChange={this._onChange}
            onChildMouseDown={this.onMarkerInteraction}
            onChildMouseUp={this.onMarkerInteractionMouseUp}
            onChildMouseMove={this.onMarkerInteraction}
            onChildClick={() => console.log("child click")}
            onClick={this._onClick}
            bootstrapURLKeys={{
              key:process.env.REACT_APP_MAP_KEY,
              libraries: ["places", "geometry"],
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
          >
            <Marker
              text={this.state.address}
              lat={this.state.lat}
              lng={this.state.lng}
            />
          </GoogleMapReact>

          <div className="info-wrapper">
            <div className="map-details">
              <span>Address: {this.state.address}</span>
              <br />
              <ThemeProvider theme={theme} className="confirm-button">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.setPickup()}
                >
                  Confirm Pickup
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default MyGoogleMap;
