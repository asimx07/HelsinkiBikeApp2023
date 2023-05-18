import mongoose, { get } from "mongoose";

const { Schema } = mongoose;

const JourneySchema = new Schema({
  departure: Date,
  return: Date,
  departureStationID: Number,
  departureStationName: String,
  returnStationId: Number,
  returnStationName: String,
  coveredDistanceInMeters: Number,
  durationInSeconds: Number,
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
