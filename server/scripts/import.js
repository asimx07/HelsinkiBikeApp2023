import { getCsvToJson, getFilesFromDirectory } from "../src/lib/tools/utils.js";
import fs from "fs";
import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config();
export const validateJourneys = async () => {
  let journeyFilePaths = getFilesFromDirectory("./data/journeys");
  let insertedDocs = 0;
  let skippedDocs = 0;

  const writeStream = fs.createWriteStream("./journeyData.json");

  writeStream.write("[\n");

  for (let file of journeyFilePaths) {
    let jsonArray = await getCsvToJson(file, "journeys");
    console.log(`reading file ${file} of length ${jsonArray.length}`);

    for (let doc of jsonArray) {
      if (doc.durationInSeconds >= 10 && doc.coveredDistanceInMeters >= 10) {
        if (insertedDocs > 0) {
          writeStream.write(",\n");
        }
        writeStream.write(JSON.stringify(doc));
        insertedDocs++;
      } else {
        skippedDocs++;
      }
    }
  }

  writeStream.write("\n]");
  writeStream.end();

  console.log(`Inserted documents: ${insertedDocs}`);
  console.log(`Skipped documents: ${skippedDocs}`);
  console.log(`Array saved to file: journeyData.json`);
};

export const validateStations = async () => {
  let stationFilePaths = getFilesFromDirectory("./data/stations");
  let insertedDocs = 0;
  let skippedDocs = 0;

  const writeStream = fs.createWriteStream("./stationData.json");

  writeStream.write("[\n");

  for (let file of stationFilePaths) {
    let jsonArray = await getCsvToJson(file, "stations");
    console.log(`reading file ${file} of length ${jsonArray.length}`);

    for (let doc of jsonArray) {
      if (insertedDocs > 0) {
        writeStream.write(",\n");
      }
      writeStream.write(JSON.stringify(doc));
      insertedDocs++;
    }
  }

  writeStream.write("\n]");
  writeStream.end();

  console.log(`Inserted documents: ${insertedDocs}`);
  console.log(`Skipped documents: ${skippedDocs}`);
  console.log(`Array saved to file: stationData.json`);
};

export const mongoImport = () => {
  const databaseName = process.env.DATABASE_NAME;
  const port = process.env.MONGO_PORT;
  const mongoURL = process.env.MONGO_URL;
  const journeyCollection = "journeys";
  const stationCollection = "stations";
  const journeyFilePath = "./journeyData.json";
  const stationFilePath = "./stationData.json";

  const journeyImportCommand = `mongoimport --uri=${mongoURL} --collection=${journeyCollection} --file=${journeyFilePath} --jsonArray --numInsertionWorkers=10`;
  const stationImportCommand = `mongoimport --uri=${mongoURL} --collection=${stationCollection} --file=${stationFilePath} --jsonArray --numInsertionWorkers=10`;

  const importJourneys = exec(journeyImportCommand);
  const importStations = exec(stationImportCommand);

  importJourneys.stdout.on("data", (data) => {
    console.log(data);
  });

  importJourneys.stderr.on("data", (data) => {
    console.error(data);
  });

  importJourneys.on("close", (code) => {
    console.log(`Journey data import process exited with code ${code}`);
    deleteFile(journeyFilePath);
  });

  importStations.stdout.on("data", (data) => {
    console.log(data);
  });

  importStations.stderr.on("data", (data) => {
    console.error(data);
  });

  importStations.on("close", (code) => {
    console.log(`Station data import process exited with code ${code}`);
    deleteFile(stationFilePath);
  });

  const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${filePath}`, err);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
  };
};

await validateJourneys();
await validateStations();
mongoImport();
