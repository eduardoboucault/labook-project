import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";

const userRouter = express.Router();

const userController = new UserController(new UserBusiness(new UserDatabase()))

userRouter.post("/", userController.createUsers);
userRouter.get("/", userController.getUsers);
userRouter.put("/", userController.updateUsers);
userRouter.delete("/", userController.deleteUsers);

export default userRouter;
