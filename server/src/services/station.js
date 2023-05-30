import { getStationModel } from "../models/stations.js";
import { getJourneyModel } from "../models/journey.js";
import logger from "../lib/tools/logger.js";

export const getAllStations = async (params) => {
  try {
    let page = params.page;
    let size = params.size;
    let Station = await getStationModel();

    if (page < 1 || isNaN(page)) {
      throw new Error("Invalid page number");
    }

    if (size < 1 || isNaN(size)) {
      throw new Error("Invalid page size");
    }
    const totalCount = await Station.estimatedDocumentCount({});
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

    let stations = await Station.find({}).skip(count).limit(size).exec();

    return { stations: stations, totalPages: totalCount };
  } catch (err) {
    logger.error(err);
  }
};

export const getStationByID = async (params) => {
  try {
    const id = params.id;
    logger.info(id);

    const Station = await getStationModel();
    const Journey = await getJourneyModel();

    const station = await Station.findOne({ ID: id }).exec();
    logger.info(station._id);
    const totalDepartureJourneys = await Journey.countDocuments({
      departureStationID: station.ID,
    }).exec();
    const totalReturnJourneys = await Journey.countDocuments({
      returnStationId: station.ID,
    }).exec();

    return {
      stationName: station.Name,
      stationAddress: station.Osoite,
      stationLatitude: station.y,
      stationLongitude: station.x,
      totalDeparturJourneys: totalDepartureJourneys,
      totalReturnJourneys: totalReturnJourneys,
    };
  } catch (err) {
    logger.error(err);
  }
};

export const createStation = async (params) => {
  try {
    const Station = await getStationModel();

    const station = new Station(params);

    const validationError = station.validateSync();
    if (validationError) {
      const validationErrors = {};
      for (const key in validationError.errors) {
        if (validationError.errors.hasOwnProperty(key)) {
          validationErrors[key] = validationError.errors[key].message;
        }
      }
      return { statusCode: 400, errors: validationErrors };
    }

    const doc = await station.save();
    return { statusCode: 201, message: "Station Inserted Sucessfully" };
  } catch (error) {
    logger.error(error);
    return { statusCode: 500, error: "Failed to save Station" };
  }
};