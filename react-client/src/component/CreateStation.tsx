import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StationFormData>();

  const handleFormSubmit = (data: StationFormData) => {
    createStation(data)
      .then((response) => {
        if (response.statusCode === 201) {
          // Station created successfully
          console.log(response.message);
          // Do something else, e.g., show a success message to the user
        } else {
          // Handle error response, e.g., display validation errors
          console.log(response.errors);
        }
      })
      .catch((error) => {
        // Handle API call error
        console.error(error);
        // Display an error message to the user
      });
  };

  const createStation = async (params: StationFormData) => {
    try {
      const response = await fetch(`http://localhost:3000/station`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return { statusCode: 500, error: "Failed to save Station" };
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <TextField
        label="FID"
        fullWidth
        {...register("FID", { required: "FID is required" })}
        error={!!errors.FID}
        helperText={errors.FID?.message}
      />
      <TextField
        label="ID"
        fullWidth
        {...register("ID", { required: "ID is required" })}
        error={!!errors.ID}
        helperText={errors.ID?.message}
      />
      <TextField
        label="Nimi"
        fullWidth
        {...register("Nimi", { required: "Nimi is required" })}
        error={!!errors.Nimi}
        helperText={errors.Nimi?.message}
      />
      <TextField
        label="Namn"
        fullWidth
        {...register("Namn", { required: "Namn is required" })}
        error={!!errors.Namn}
        helperText={errors.Namn?.message}
      />
      <TextField
        label="Name"
        fullWidth
        {...register("Name", { required: "Name is required" })}
        error={!!errors.Name}
        helperText={errors.Name?.message}
      />
      <TextField
        label="Osoite"
        fullWidth
        {...register("Osoite", { required: "Osoite is required" })}
        error={!!errors.Osoite}
        helperText={errors.Osoite?.message}
      />
      <TextField
        label="Adress"
        fullWidth
        {...register("Adress", { required: "Adress is required" })}
        error={!!errors.Adress}
        helperText={errors.Adress?.message}
      />
      <TextField
        label="Kaupunki"
        fullWidth
        {...register("Kaupunki", { required: "Kaupunki is required" })}
        error={!!errors.Kaupunki}
        helperText={errors.Kaupunki?.message}
      />
      <TextField
        label="Stad"
        fullWidth
        {...register("Stad", { required: "Stad is required" })}
        error={!!errors.Stad}
        helperText={errors.Stad?.message}
      />
      <TextField
        label="Operaattor"
        fullWidth
        {...register("Operaattor", { required: "Operaattor is required" })}
        error={!!errors.Operaattor}
        helperText={errors.Operaattor?.message}
      />
      <TextField
        label="Kapasiteet"
        fullWidth
        {...register("Kapasiteet", { required: "Kapasiteet is required" })}
        error={!!errors.Kapasiteet}
        helperText={errors.Kapasiteet?.message}
      />
      <TextField
        label="x"
        fullWidth
        {...register("x", { required: "x is required" })}
        error={!!errors.x}
        helperText={errors.x?.message}
      />
      <TextField
        label="y"
        fullWidth
        {...register("y", { required: "y is required" })}
        error={!!errors.y}
        helperText={errors.y?.message}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default StationForm;
