/**
 * Journey Service
 */

import logger from "../lib/tools/logger.js";
import { getJourneyModel } from "../models/journey.js";
import { getJourneyValidator } from "../models/journey.js";

export const getAllJourneys = async (params) => {
  try {
    const page = params.page;
    const size = params.size;
    const Journey = await getJourneyModel();

    if (page < 1 || isNaN(page)) {
      throw new Error("Invalid page number");
    }

    if (size < 1 || isNaN(size)) {
      throw new Error("Invalid page size");
    }
    const totalCount = await Journey.estimatedDocumentCount({});
    console.log("totalCount", totalCount);

    if (size === -1) {
      size = totalCount;
    }

    const totalPages = Math.ceil(totalCount / size);

    if (page > totalPages) {
      throw new Error("Page not found");
    }

    const count = (page - 1) * size;
    console.log(page, size, count);

    const journeys = await Journey.find({}).skip(count).limit(size).exec();

    return { journeys: journeys, totalPages: totalCount };
  } catch (err) {
    logger.error(err);
  }
};

export const getJourneyByID = async (params) => {
  try {
    const id = params.id;
    const Journey = await getJourneyModel();

    const journey = await Journey.find({ _id: id });

    return journey;
  } catch (err) {
    logger.error(err);
  }
};
export const createJourney = async (params) => {
  try {
    const Journey = await getJourneyModel();

    const journey = new Journey(params);

    const validationError = journey.validateSync();
    if (validationError) {
      const validationErrors = {};
      for (const key in validationError.errors) {
        if (validationError.errors.hasOwnProperty(key)) {
          validationErrors[key] = validationError.errors[key].message;
        }
      }
      return { statusCode: 400, errors: validationErrors };
    }

    const doc = await journey.save();
    return { statusCode: 201, message: "Journey Inserted Sucessfully" };
  } catch (error) {
    logger.error(error);
    return { statusCode: 500, error: "Failed to save Journey" };
  }
};

