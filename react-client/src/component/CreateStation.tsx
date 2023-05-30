import React from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  TextField,
  Button,
  Box,
  Card,
  Grid,
  CssBaseline,
  Paper,
} from "@mui/material";
import Header from "./Header";
import styles from "../styles/formStyles.tsx";
import { createStation } from "../api/createStation.tsx";
import { useNavigate } from "react-router-dom";

interface StationFormData {
  FID: number;
  ID: number;
  Nimi: string;
  Namn: string;
  Name: string;
  Osoite: string;
  Adress: string;
  Kaupunki: string;
  Stad: string;
  Operaattor: string;
  Kapasiteet: string;
  x: number;
  y: number;
}

const StationForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StationFormData>();

  const handleFormSubmit = (data: StationFormData) => {
    createStation(data)
      .then((response) => {
        if (response.statusCode === 201) {
          console.log(response.message);

          navigate("/stations");
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
              Add Station
            </Typography>

            <Box p={2}>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="FID"
                      fullWidth
                      {...register("FID", {
                        required: "FID is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "This field should be a number",
                        },
                      })}
                      error={!!errors.FID}
                      helperText={errors.FID?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="FID" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="ID"
                      fullWidth
                      {...register("ID", {
                        required: "ID is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "This field should be a number",
                        },
                      })}
                      error={!!errors.ID}
                      helperText={errors.ID?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="ID" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Nimi"
                      fullWidth
                      {...register("Nimi", { required: "Nimi is required" })}
                      error={!!errors.Nimi}
                      helperText={errors.Nimi?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="Nimi" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Namn"
                      fullWidth
                      {...register("Namn", { required: "Namn is required" })}
                      error={!!errors.Namn}
                      helperText={errors.Namn?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="Namn" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Name"
                      fullWidth
                      {...register("Name", { required: "Name is required" })}
                      error={!!errors.Name}
                      helperText={errors.Name?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="Name" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Osoite"
                      fullWidth
                      {...register("Osoite", {
                        required: "Osoite is required",
                      })}
                      error={!!errors.Osoite}
                      helperText={errors.Osoite?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="Osoite" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Address"
                      fullWidth
                      {...register("Adress", {
                        required: "Address is required",
                      })}
                      error={!!errors.Adress}
                      helperText={errors.Adress?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="Adress" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Kaupunki"
                      fullWidth
                      {...register("Kaupunki", {
                        required: "Kaupunki is required",
                      })}
                      error={!!errors.Kaupunki}
                      helperText={errors.Kaupunki?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="Kaupunki" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Stad"
                      fullWidth
                      {...register("Stad", { required: "Stad is required" })}
                      error={!!errors.Stad}
                      helperText={errors.Stad?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="Stad" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Operaattor"
                      fullWidth
                      {...register("Operaattor", {
                        required: "Operaattor is required",
                      })}
                      error={!!errors.Operaattor}
                      helperText={errors.Operaattor?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="Operaattor" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Kapasiteet"
                      fullWidth
                      {...register("Kapasiteet", {
                        required: "Kapasiteet is required",
                      })}
                      error={!!errors.Kapasiteet}
                      helperText={errors.Kapasiteet?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="Kapasiteet" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="X"
                      fullWidth
                      {...register("x", {
                        required: "x is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "This field should be a number",
                        },
                      })}
                      error={!!errors.x}
                      helperText={errors.x?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="x" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Y"
                      fullWidth
                      {...register("y", {
                        required: "y is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "This field should be a number",
                        },
                      })}
                      error={!!errors.y}
                      helperText={errors.y?.message}
                      sx={styles.textField}
                      autoComplete="off"
                      data-testid="y" // Add data-testid attribute
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      data-testid="submit-btn" // Add data-testid attribute
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

export default StationForm;
