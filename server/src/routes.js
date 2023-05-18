import express from "express";
import * as journeyController from "./controllers/journey.js";
import * as stationController from "./controllers/station.js";

var router = express.Router();

//journey routes
router.get("/journey/:id", journeyController.getJourneyByID);
router.get("/journey", journeyController.getAllJourneys);

//station routes
router.get("/stations", stationController.getAllStations);
router.get("/station/:id", stationController.getStationByID);

export default router;
