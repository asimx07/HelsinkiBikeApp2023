import mongoose, { get } from "mongoose";

const { Schema } = mongoose;

const JourneySchema = new Schema({
  departure: {
    type: Date,
    required: true,
  },
  return: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.departure;
      },
      message: "Return date must be after the departure date",
    },
  },
  departureStationID: {
    type: Number,
    required: true,
    min: [0, "Departure station ID must be a positive number"],
    index: true,
  },
  departureStationName: {
    type: String,
    required: true,
  },
  returnStationId: {
    type: Number,
    required: true,
    min: [0, "Return station ID must be a positive number"],
    index: true,
  },
  returnStationName: {
    type: String,
    required: true,
  },
  coveredDistanceInMeters: {
    type: Number,
    required: true,
    min: [0, "Covered distance must be a positive number"],
  },
  durationInSeconds: {
    type: Number,
    required: true,
    min: [0, "Duration must be a positive number"],
  },
});


export const getJourneyValidator = () => {
  return {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "departure",
        "return",
        "departureStationID",
        "departureStationName",
        "returnStationId",
        "returnStationName",
        "coveredDistanceInMeters",
        "durationInSeconds",
      ],
      properties: {
        departure: { bsonType: "date" },
        return: { bsonType: "date" },
        departureStationID: { bsonType: "int" },
        departureStationName: { bsonType: "string" },
        returnStationId: { bsonType: "int" },
        returnStationName: { bsonType: "string" },
        coveredDistanceInMeters: { bsonType: "int", minimum: 10 },
        durationInSeconds: { bsonType: "int", minimum: 10 },
      },
    },
  };
};

export const getJourneyModel = async () => {
  console.log(`Returning Model Journey`);
  return mongoose.model("Journey", JourneySchema);
};
