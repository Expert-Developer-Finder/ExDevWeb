import express from "express";

import { getRecommendations, getQueries, likeExpert } from "../controllers/query.js";

const queryRouter = express.Router();
queryRouter.post("/get-recommendations", getRecommendations);
queryRouter.post("/get-queries", getQueries);
queryRouter.post("/like-expert", likeExpert);


export default queryRouter;
