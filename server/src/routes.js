import express from "express";
import * as journeyController from "./controllers/journey.js";
import * as stationController from "./controllers/station.js";

var router = express.Router();

//journey routes
router.get("/journey/:id", journeyController.getJourneyByID);
router.get("/journeys", journeyController.getAllJourneys);
router.post("/journey", journeyController.createJourney);
//station routes
router.get("/stations", stationController.getAllStations);
router.get("/station/:id", stationController.getStationByID);
router.post("/station", stationController.createStation);


export default router;
