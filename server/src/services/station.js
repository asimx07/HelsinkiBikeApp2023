import { getStationModel } from "../models/stations.js";
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

    const totalPages = Math.ceil(totalCount / size);

    if (page > totalPages) {
      throw new Error("Page not found");
    }

    const count = (page - 1) * size;
    console.log(page, size, count);

    let stations = await Station.find({}).skip(count).limit(size).exec();

    return stations;
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
