import express from "express";

import { getRecommendations, getQueries } from "../controllers/query.js";

const queryRouter = express.Router();
queryRouter.post("/get-recommendations", getRecommendations);
queryRouter.post("/get-queries", getQueries);


export default queryRouter;
