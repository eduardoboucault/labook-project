import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"

export const usersRouter = express.Router()

const usersController = new UserController(new UserBusiness(new UserDatabase()))

usersRouter.get("/:q", usersController.getUser)
usersRouter.post("/", usersController.createUser)
usersRouter.put("/:id", usersController.updateUser)
usersRouter.delete("/:id", usersController.deleteUser)