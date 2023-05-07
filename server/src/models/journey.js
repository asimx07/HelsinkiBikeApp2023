import mongoose, { get } from "mongoose";

const { Schema } = mongoose;

const JourneySchema = new Schema({
  departure: "Date",
  return: "Date",
  departureStationID: "Number",
  departureStationName: "String",
  returnStationId: "Number",
  returnStationName: "String",
  coveredDistanceInMeters: "Number",
  durationInSeconds: "Number",
});

const getModel = async (connection) =>{
    console.log(`Returning Model Journey`);
    return (await connection).model("Journey", JourneySchema);
}

export default getModel;
