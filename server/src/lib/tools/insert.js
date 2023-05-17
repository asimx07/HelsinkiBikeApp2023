import { config } from "dotenv";

config();

import { getCsvToJson, getFilesFromDirectory } from "./utils.js";
import objectSize from "object-sizeof";
import { parallel, sleep } from "radash";
import pkg from "lodash";
import { getJourneyValidator } from "../../models/journey.js";
import { getStationValidator } from "../../models/stations.js";

export const insertJourneys = async (collection) => {
  let { chunk: _chunk } = pkg;
  let CHUNK = 300000;
  let PARALLEL_EXECUTIONS = 6;
  let PARALLEL_EXECUTION_CHUNK = 50000;
  let journeyFilePaths = getFilesFromDirectory("./data/journeys");
  let BYTE_IN_MB = 0.00000095367432;
  let journeyValidator = getJourneyValidator();
  let arrayToInsert = [];
  let insertedDocs = 0;
  let skippedDocs = 0;

  const col = collection;
  console.time("Insert took: ");

  for (let file of journeyFilePaths) {
    let jsonArray = await getCsvToJson(file, "journeys");
    console.log(`reading file ${file} of length ${jsonArray.length}`);

    for (let doc of jsonArray) {
      if (doc.durationInSeconds >= 10 && doc.coveredDistanceInMeters >= 10) {
        arrayToInsert.push(doc);
        insertedDocs++;
      } else {
        skippedDocs++;
      }
      if (arrayToInsert.length % CHUNK === 0) {
        console.log(
          "arrayToInsert size -",
          objectSize(arrayToInsert) * BYTE_IN_MB,
          "mb\n"
        );
        const chunks = _chunk(arrayToInsert, PARALLEL_EXECUTION_CHUNK);
        await parallel(PARALLEL_EXECUTIONS, chunks, async (chunk) => {
          const now = Date.now();
          const stats = `size ${(objectSize(chunk) * BYTE_IN_MB).toFixed(
            3
          )} mb, records: ${chunk.length}`;
          console.time(`id: ${now} - stats: ${stats} - took: `);
          await col
            .insertMany(chunk, journeyValidator, { ordered: false })
            .catch((err) => {
              console.log(err);
              process.exit(1);
            });
          console.timeEnd(`id: ${now} - stats: ${stats} - took: `);
        });
        console.log("--------------\n");
        arrayToInsert = [];
        await sleep(100);
      }
    }
    if (arrayToInsert.length > 0) {
      console.log(
        "arrayToInsert size -",
        objectSize(arrayToInsert) * BYTE_IN_MB,
        "mb\n"
      );
      const chunks = _chunk(arrayToInsert, PARALLEL_EXECUTION_CHUNK);
      await parallel(PARALLEL_EXECUTIONS, chunks, async (chunk) => {
        const now = Date.now();
        const stats = `size ${(objectSize(chunk) * BYTE_IN_MB).toFixed(
          3
        )} mb, records: ${chunk.length}`;
        console.time(`id: ${now} - stats: ${stats} - took: `);
        await col
          .insertMany(chunk, journeyValidator, { ordered: false })
          .catch((err) => {
            console.log(err);
            process.exit(1);
          });
        console.timeEnd(`id: ${now} - stats: ${stats} - took: `);
      });
      console.log("--------------\n");
      arrayToInsert = [];
    }
  }

  console.timeEnd("Insert took: ");
  console.log("skippedDocs: ", skippedDocs);
  console.log("insertedDocs: ", insertedDocs);
};

export const insertStations = async (collection) => {
  let stationValidator = getStationValidator();
  let col = collection;
  let stationFilePaths = getFilesFromDirectory("./data/stations");
  let BYTE_IN_MB = 0.00000095367432;
  let insertedDocs = 0;
  let skippedDocs = 0;

  for (let file of stationFilePaths) {
    let jsonArray = await getCsvToJson(file, "stations");
    console.log(`reading file ${file} of length ${jsonArray.length}`);
    const now = Date.now();
    const stats = `size ${(objectSize(jsonArray) * BYTE_IN_MB).toFixed(
      3
    )} mb, records: ${jsonArray.length}`;
    console.time(`id: ${now} - stats: ${stats} - took: `);
    await col.insertMany(jsonArray, stationValidator).catch((err) => {
      console.log(err);
      process.exit(1);
    });
    console.timeEnd(`id: ${now} - stats: ${stats} - took: `);
  }
  console.timeEnd("Insert took: ");
};
