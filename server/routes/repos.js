import express  from "express";
import { createRepo } from "../controllers/repos.js";


const repoRouter = express.Router();

repoRouter.post("/create", createRepo);


export default repoRouter;