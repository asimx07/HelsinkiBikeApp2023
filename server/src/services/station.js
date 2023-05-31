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
    const id = params.id.toString();
    

    const Station = await getStationModel();
    const Journey = await getJourneyModel();
    let totalDistance = 0;

    const station = await Station.findOne({ ID: id }).exec();

    //Departure Calculations

    const totalDepartureJourneys = await Journey.find({
      departureStationID: station.ID,
    }).exec();

    totalDepartureJourneys.forEach((journey) => {
      totalDistance += journey.coveredDistanceInMeters;
    });

    const avgDepartureDistance =
      totalDistance / totalDepartureJourneys.length / 1000;

    const departurePipeline = [
      {
        $match: {
          returnStationId: "501",
        },
      },
      {
        $group: {
          _id: "$departureStationName",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          departureStationName: "$_id",
        },
      },
    ];

    const departureStationsResult = await Journey.aggregate(
      departurePipeline
    ).exec();

    const topFiveDeparture = departureStationsResult.map(
      (result) => result.departureStationName
    );

    //Return Calculations

    const totalReturnJourneys = await Journey.find({
      returnStationId: station.ID,
    }).exec();

    totalReturnJourneys.forEach((journey) => {
      totalDistance += journey.coveredDistanceInMeters;
    });
    const avgReturnDistance = totalDistance / totalReturnJourneys.length / 1000;

    const returnPipeline = [
      {
        $match: {
          departureStationID: station.ID,
        },
      },
      {
        $group: {
          _id: "$returnStationName",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          returnStationName: "$_id",
        },
      },
    ];
    const returnStationsResult = await Journey.aggregate(returnPipeline).exec();

    const topFiveReturn = returnStationsResult.map(
      (result) => result.returnStationName
    );

    return {
      stationName: station.Name,
      stationAddress: station.Osoite,
      stationLatitude: station.y,
      stationLongitude: station.x,
      totalDepartureJourneys: totalDepartureJourneys.length,
      totalReturnJourneys: totalReturnJourneys.length,
      avgDepartureDistance: avgDepartureDistance,
      avgReturnDistance: avgReturnDistance,
      topFiveDepartureStations: topFiveDeparture,
      topFiveReturnStations: topFiveReturn,
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