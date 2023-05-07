import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import controllerCheck from "./controllers/journey.js";
import getModel from "./models/journey.js";


dotenv.config();
const PORT = process.env.SERVER_PORT;
const app = express();

app.listen(PORT, 
    console.log(`Server listening at Port ${PORT}`)
)

app.use('/', controllerCheck);

const connection = connectDatabase();
const Journey = await getModel(connection);