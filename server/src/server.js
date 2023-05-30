import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import { getJourneyModel } from "./models/journey.js";
import logger from "./lib/tools/logger.js";
import { getStationModel } from "./models/stations.js";
import { insertJourneys} from "./lib/tools/import.js";
import cors from "cors";
import router from "./routes.js";
dotenv.config();
const PORT = process.env.SERVER_PORT;
const app = express();
app.use(cors("*"));
app.use(express.json());
app.listen(PORT, logger.info(`Server listening at Port ${PORT}`));

app.use("", router);

const connection = connectDatabase();

const Journey = await getJourneyModel();
const Station = await getStationModel();

const t0 = performance.now();
await insertJourneys(Journey);
//await insertStations(Station);

const t1 = performance.now();
logger.info(`insertData took ${t1 - t0} milliseconds.`);

