import csv from "csvtojson";
import fs from "fs";
export const getCsvToJson = async (filepath, collection) => {
  if (collection === "journeys") {
    return csv({
      headers: [
        "departure",
        "return",
        "departureStationID",
        "departureStationName",
        "returnStationId",
        "returnStationName",
        "coveredDistanceInMeters",
        "durationInSeconds",
      ],
      ignoreEmpty: true,
    })
      .fromFile(filepath)
      .then(
        (jsonArray) => {
          return jsonArray;
        },
        () => {
          console.log("error converting csvToJson");
        }
      );
  } else {
    return csv({
      ignoreEmpty: true,
    })
      .fromFile(filepath)
      .then(
        (jsonArray) => {
          return jsonArray;
        },
        () => {
          console.log("error converting csvToJson");
        }
      );
  }
};

export const getFilesFromDirectory = (dirName) => {
  return fs.readdirSync(dirName).map((file) => dirName + "/" + file);
};
