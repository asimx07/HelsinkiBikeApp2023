import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Card,
  Grid,
  CssBaseline,
  Paper,
  Typography,
} from "@mui/material";

import Header from "./Header";
import styles from "../styles/formStyles.tsx";
import { createJourney } from "../api/createJourney.tsx";
import { useNavigate } from "react-router-dom";

interface JourneyFormData {
  departure: Date;
  return: Date;
  departureStationID: Number;
  departureStationName: String;
  returnStationId: Number;
  returnStationName: String;
  coveredDistanceInMeters: Number;
  durationInSeconds: String;
}

const JourneyForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JourneyFormData>();

  const handleFormSubmit = (data: JourneyFormData) => {
    createJourney(data)
      .then((response) => {
        if (response.statusCode === 201) {
          console.log(response.message);

          navigate("/journeys");
        } else {
          console.log(response.errors);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Paper sx={styles.paper}>
        <Box sx={styles.box}>
          <Card variant="outlined" sx={styles.card}>
            <Typography variant={"h3"} color="#fff">
              Add Journey
            </Typography>
            <Box p={2}>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      {...register("departure", {
                        required: "Departure Time and Date is required",
                      })}
                      error={!!errors.departure}
                      helperText={errors.departure?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="departure"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      {...register("return", {
                        required: "Return Time and Date is required",
                      })}
                      error={!!errors.return}
                      helperText={errors.return?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="return"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Departure Station ID"
                      fullWidth
                      {...register("departureStationID", {
                        required: "departureStationID is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "This field should be a number",
                        },
                      })}
                      error={!!errors.departureStationID}
                      helperText={errors.departureStationID?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="departureStationID"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Departure Station"
                      fullWidth
                      {...register("departureStationName", {
                        required: "Departure Station Name is required",
                      })}
                      error={!!errors.departureStationName}
                      helperText={errors.departureStationName?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="departureStationName"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Return Station ID"
                      fullWidth
                      {...register("returnStationId", {
                        required: "returnStationId is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "This field should be a number",
                        },
                      })}
                      error={!!errors.returnStationId}
                      helperText={errors.returnStationId?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="returnStationId"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Return Station"
                      fullWidth
                      {...register("returnStationName", {
                        required: "returnStationName is required",
                      })}
                      error={!!errors.departureStationName}
                      helperText={errors.departureStationName?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="returnStationName"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="coveredDistanceInMeters"
                      fullWidth
                      {...register("coveredDistanceInMeters", {
                        required: "coveredDistanceInMeters is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "This field should be a number",
                        },
                      })}
                      error={!!errors.coveredDistanceInMeters}
                      helperText={errors.coveredDistanceInMeters?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="coveredDistanceInMeters"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="durationInSeconds"
                      fullWidth
                      {...register("durationInSeconds", {
                        required: "durationInSeconds is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "This field should be a number",
                        },
                      })}
                      error={!!errors.durationInSeconds}
                      helperText={errors.durationInSeconds?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="durationInSeconds"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      data-testid="submit-btn"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Card>
        </Box>
      </Paper>
    </>
  );
};

export default JourneyForm;
