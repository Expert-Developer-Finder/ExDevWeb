import express from "express";

import { getRecommendations, getQueries, likeExpert, rateQuery, getWithRepoId, getStats } from "../controllers/query.js";

const queryRouter = express.Router();
queryRouter.post("/get-recommendations", getRecommendations);
queryRouter.post("/get-queries", getQueries);
queryRouter.post("/like-expert", likeExpert);
queryRouter.post("/rate-query", rateQuery);
queryRouter.post("/getWithRepoId", getWithRepoId);
queryRouter.post("/getStats", getStats);





export default queryRouter;
