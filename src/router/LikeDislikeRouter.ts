import express from "express"
import { LikeDislikeController } from "../controller/LikeDislikeController"
import { LikeDislikeBusiness } from "../business/LikeDislikeBusiness"
import { LikeDislikeDataBase } from "../database/LikeDislikeDatabase"

export const likeDislikeRouter = express.Router()

const likeDislikeController = new LikeDislikeController(new LikeDislikeBusiness(new LikeDislikeDataBase()))

likeDislikeRouter.get("/", likeDislikeController.getLikeDislike)
likeDislikeRouter.post("/", likeDislikeController.createLikeDislike)
likeDislikeRouter.put("/:id", likeDislikeController.updateLikeDislike)
likeDislikeRouter.delete("/:id", likeDislikeController.deleteLikeDislike)