import logger from "../lib/tools/logger.js";
import { getJourneyValidator } from "../models/journey.js";
import * as JourneyService from "../services/journey.js";

export const getAllJourneys = async (req, res) => {
  try {
    let journeys = await JourneyService.getAllJourneys({
      page: req.query.page,
      size: req.query.pageSize,
    });

    res.send(journeys);
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const getJourneyByID = async (req, res) => {
  try {
    let journeyID = req.params.id;
    let journey = await JourneyService.getJourneyByID({ id: journeyID });
    res.send(journey);
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const createJourney = async (req, res) => {
  try {
    let journeyData = req.body;
    console.log(req.body);
    let journey = await JourneyService.createJourney(journeyData);
    res.send(journey);
  } catch (error) {
    logger.error(err);
    throw err;
  }
};
