import { getStationModel } from "../models/stations.js";
import { getJourneyModel } from "../models/journey.js";
import logger from "../lib/tools/logger.js";

export const getAllStations = async (params) => {
  try {
    let page = params.page;
    let size = params.size;
    let Station = await getStationModel();
    let Journey = await getJourneyModel();
    if (page < 1 || isNaN(page)) {
      throw new Error("Invalid page number");
    }

    if (size < 1 || isNaN(size)) {
      throw new Error("Invalid page size");
    }

    const totalCount = await Station.estimatedDocumentCount({});

    const totalPages = Math.ceil(totalCount / size);

    if (page > totalPages) {
      throw new Error("Page not found");
    }

    const count = (page - 1) * size;
    console.log(page, size, count);

    let stations = await Station.find({}).skip(count).limit(size).exec();
    const stationObjects = stations.map((stations) => stations.toObject());
    for (let station of stationObjects) {
      let departureCount = await Journey.countDocuments({
        departureStationID: station.ID,
      });
      console.log(station);
      station.totalDepartureCount = departureCount;
      let returnCount = await Journey.countDocuments({
        returnStationId: station.ID,
      });
      station.totalReturnCount = returnCount;
    }
    return {
      stations: stationObjects,
      totalPages: totalPages,
    };
  } catch (err) {
    logger.error(err);
  }
};

export const getStationByID = async (params) => {
  try {
    let id = params.id;

    let Station = await getStationModel();

    let station = await Station.find({ ID: id }).exec();

    return station;
  } catch (err) {
    logger.error(err);
  }
};
