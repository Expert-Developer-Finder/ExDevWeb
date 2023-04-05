import express from "express";

import { getRecommendations } from "../controllers/query.js";

const queryRouter = express.Router();
queryRouter.post("/get-recommendations", getRecommendations);


export default queryRouter;
