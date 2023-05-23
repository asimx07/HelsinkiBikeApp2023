import React from "react";
import {
  CssBaseline,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Header from "./Header";
const APP_URL = import.meta.env.VITE_PUBLIC_URL;

export const SingleStation = () => {
  const station = {
    name: "Station Name",
    address: "Station Address",
    journeys: 10, // Replace with the actual number of journeys
  };

  const mapCoordinates = {
    lat: 51.505, // Replace with the actual latitude coordinate
    lng: -0.09, // Replace with the actual longitude coordinate
  };
  const styles = {
    root: {
      minHeight: "100vh",
      minWidth: "100vw",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${
        APP_URL + "/src/assets/bg.jpg"
      })`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "top-right",
    },
    content: {
      paddingTop: "100px",
      display: "flex",
      height: "calc(100vh - 60px)", // Adjust the height based on your header component
      backgroundColor: "#0000006e",
    },
  };

  return (
    <>
      <CssBaseline />
      <div style={styles.root}>
        <Header />
        <Container
          sx={{
            maxWidth: "xl",
            height: "500px",
          }}
        >
          <div style={styles.content}>
            <Card
              style={{
                flex: 1,
                marginRight: "10px",
                backgroundColor: "#0000006e",
              }}
            >
              <CardContent>
                <Typography variant="h6">{station.name}</Typography>
                <Typography variant="body1">{station.address}</Typography>
                <Typography variant="body2">
                  Total Journeys: {station.journeys}
                </Typography>
              </CardContent>
            </Card>
            <Card
              style={{
                flex: 1,
                marginLeft: "10px",
                backgroundColor: "#0000006e",
              }}
            >
              <CardContent style={{ height: "100%" }}>
                <MapContainer
                  center={mapCoordinates}
                  zoom={12}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={mapCoordinates} />
                </MapContainer>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
};
