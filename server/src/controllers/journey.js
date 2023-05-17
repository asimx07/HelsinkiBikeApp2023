import connectDatabase from "../config/database.js";
import { getJourneyModel } from "../models/journey.js";

export const getAllJourneys = async (params) => {
  const connection = connectDatabase();

  const Journey = getJourneyModel(connection);

  let allJourneys = await Journey.find({});

  return allJourneys;
};

export const getJourneyByID = async (req, res) => {
  res.send("Okay");
};
