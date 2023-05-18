/**
 * Journey Service
 */

import logger from "../lib/tools/logger.js";
import { getJourneyModel } from "../models/journey.js";

export const getAllJourneys = async (params) => {
  try {
    let page = params.page;
    let size = params.size;
    let Journey = await getJourneyModel();

    if (page < 1 || isNaN(page)) {
      throw new Error("Invalid page number");
    }

    if (size < 1 || isNaN(size)) {
      throw new Error("Invalid page size");
    }

    const totalCount = await Journey.estimatedDocumentCount({});

    const totalPages = Math.ceil(totalCount / size);

    if (page > totalPages) {
      throw new Error("Page not found");
    }

    const count = (page - 1) * size;
    console.log(page, size, count);

    let journeys = await Journey.find({}).skip(count).limit(size).exec();

    return journeys;
  } catch (err) {
    logger.error(err);
  }
};

export const getJourneyByID = async (params) => {
  try {
    let id = params.id;
    let Journey = await getJourneyModel();

    let journey = await Journey.find({ _id: id });

    return journey;
  } catch (err) {
    logger.error(err);
  }
};
