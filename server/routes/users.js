import express  from "express";
import { signin, signup, changePassword} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/signin", signin);
userRouter.post("/signup", signup);
userRouter.post("/:userId/change-password", changePassword);




export default userRouter;