import express from "express";

import { getRecommendations, getQueries, likeExpert, rateQuery } from "../controllers/query.js";

const queryRouter = express.Router();
queryRouter.post("/get-recommendations", getRecommendations);
queryRouter.post("/get-queries", getQueries);
queryRouter.post("/like-expert", likeExpert);
queryRouter.post("/rate-query", rateQuery);


export default queryRouter;
