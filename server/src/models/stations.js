import mongoose, { get } from "mongoose";

const { Schema } = mongoose;

const StationSchema = new Schema({
  FID: Number,
  ID: Number,
  Nimi: String,
  Namn: String,
  Name: String,
  Osoite: String,
  Adress: String,
  Kaupunki: String,
  Stad: String,
  Operaattor: String,
  Kapasiteet: String,
  x: Number,
  y: Number,
});

export const getStationValidator = () => {
  return {
    required: [
      "FID",
      "ID",
      "Nimi",
      "Namn",
      "Name",
      "Osoite",
      "Adress",
      "Kaupunki",
      "Stad",
      "Operaattor",
      "Kapasiteet",
      "x",
      "y",
    ],
    properties: {
      FID: {
        type: "number",
      },
      ID: {
        type: "number",
      },
      Nimi: {
        type: "string",
      },
      Namn: {
        type: "string",
      },
      Name: {
        type: "string",
      },
      Osoite: {
        type: "string",
      },
      Adress: {
        type: "string",
      },
      Kaupunki: {
        type: "string",
      },
      Stad: {
        type: "string",
      },
      Operaattor: {
        type: "string",
      },
      Kapasiteet: {
        type: "string",
      },
      x: {
        type: "number",
      },
      y: {
        type: "number",
      },
    },
  };
};
export const getStationModel = async () => {
  console.log(`Returning Model Stations`);
  return mongoose.model("Stations", StationSchema);
};
