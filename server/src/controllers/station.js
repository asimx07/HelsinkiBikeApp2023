import logger from "../lib/tools/logger.js";
import * as StationService from "../services/station.js";

export const getAllStations = async (req, res) => {
  try {
    let stations = await StationService.getAllStations({
      page: req.query.page,
      size: req.query.pageSize,
    });

    res.send(stations);
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const getStationByID = async (req, res) => {
  try {
    let station = await StationService.getStationByID({
      id: req.params.id,
    });
    res.send(station);
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
