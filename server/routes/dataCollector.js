import express from "express";
import { example } from "../controllers/dataCollector.js";

const dataCollectorRouter = express.Router();

dataCollectorRouter.post("/example", example);


export default dataCollectorRouter;
