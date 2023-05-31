import { useSingleStation } from "../hooks/useSingleStation.ts";

import {
  CssBaseline,
  Card,
  CardContent,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LoadingSpinner from "./CircularProgress.tsx";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { styles } from "../styles/singleStationStyles.tsx";
import "leaflet/dist/leaflet.css";
import Header from "./Header";

export const SingleStation = () => {
  const { station, loading, error } = useSingleStation();

  const mapCoordinates = {
    lat: station?.stationLatitude ?? 0,
    lng: station?.stationLongitude ?? 0,
  };

  if (loading) {
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoadingSpinner />
    </div>;
  }

  if (error) {
    return (
      <>
        <CssBaseline />
        <Container sx={styles.root}>
          <Header />
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              backgroundColor: "#0000006e",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Typography
                variant="h4"
                align="center"
                style={{ color: "#fff", padding: "50px" }}
              >
                Oops :( something is broken. Please return to{" "}
                <a href="/">Home</a>
              </Typography>
            </div>
          </Paper>
        </Container>
      </>
    );
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
                    {station?.totalDepartureJourneys}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Total Returns:</strong>{" "}
                    {station?.totalReturnJourneys}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Average Departure Distance(KMs):</strong>{" "}
                    {station?.avgDepartureDistance.toFixed(2)}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Average Return Distance(KMs):</strong>{" "}
                    {station?.avgReturnDistance.toFixed(2)}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Top 5 Popular Departure Station:</strong>{" "}
                    {station?.topFiveDepartureStations.join(",")}
                  </div>
                  <div style={styles.detailItem}>
                    <strong>Top 5 Popular Return Station:</strong>{" "}
                    {station?.topFiveReturnStations.join(",")}
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
