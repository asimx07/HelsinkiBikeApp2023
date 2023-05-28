import React from "react";
import { useSingleStation } from "../hooks/useSingleStation.ts";
import { useParams } from "react-router-dom";

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
  const { station, loading, error } = useSingleStation();
  console.log(station);
  const mapCoordinates = {
    lat: station?.stationLatitude ?? 0,
    lng: station?.stationLongitude ?? 0,
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
    cardContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "24px",
      color: "#FFF",
    },
    stationDetails: {
      textAlign: "center" as "center",
      marginTop: "24px",
    },

    detailItem: {
      marginBottom: "12px",
    },
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              <CardContent sx={styles.cardContent}>
                <Typography variant="h4">Station Details</Typography>
                <div style={styles.stationDetails}>
                  <div style={styles.detailItem}>
                    <strong>Station Name:</strong> {station?.stationName}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Station Address:</strong> {station?.stationAddress}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Total Departures:</strong>{" "}
                    {station?.totalDeparturJourneys}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Total Returns:</strong>{" "}
                    {station?.totalReturnJourneys}
                  </div>
                </div>
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
                {station && (
                  <MapContainer
                    center={mapCoordinates}
                    zoom={12}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={mapCoordinates} />
                  </MapContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
};
