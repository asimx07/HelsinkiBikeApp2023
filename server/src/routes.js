import express from "express";
import * as journeyController from "./controllers/journey.js";

var router = express.Router();

router.get("/journey/:id", journeyController.getJourneyByID);
router.get("/journey", journeyController.getAllJourneys);
export default router;
