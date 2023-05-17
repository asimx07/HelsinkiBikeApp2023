import express from "express";
import * as journeyController from "./controllers/journey.js";

var router = express.Router();

router.get("/journey", journeyController.getJourneyByID);

export default router;
