import mongoose, { get } from "mongoose";

const { Schema } = mongoose;

const StationSchema = new Schema({
  FID: {
    type: Number,
    required: true,
    min: [0, "FID must be a positive number"],
  },
  ID: {
    type: Number,
    required: true,
    min: [0, "ID must be a positive number"],
  },
  Nimi: {
    type: String,
    required: true,
  },
  Namn: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Osoite: {
    type: String,
    required: true,
  },
  Adress: {
    type: String,
    required: true,
  },
  Kaupunki: {
    type: String,
  },
  Stad: {
    type: String,
  },
  Operaattor: {
    type: String,
  },
  Kapasiteet: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
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
