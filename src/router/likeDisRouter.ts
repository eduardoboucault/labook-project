import express from "express";
import { LikeDisController } from "../controller/LikeDisController";
import { LikeDisBusiness } from "../business/LikeDisBusiness";
import { LikeDisDatabase } from "../database/LikeDisDatabase";

const likeDisRouter = express.Router();

const likeDisController = new LikeDisController(
  new LikeDisBusiness(new LikeDisDatabase())
);

likeDisRouter.post("/", likeDisController.createLikes);
likeDisRouter.get("/", likeDisController.getLikes);
likeDisRouter.put("/", likeDisController.updateLikes);
likeDisRouter.delete("/", likeDisController.deleteLikes);

export default likeDisRouter;
