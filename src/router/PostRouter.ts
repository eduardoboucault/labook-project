import express from "express"
import { PostController } from "../controller/PostController"
import { PostBusiness } from "../business/PostBusiness"
import { PostDatabase } from "../database/PostDatabase"

export const postsRouter = express.Router()

const postsController = new PostController(new PostBusiness(new PostDatabase()))

postsRouter.get("/", postsController.getPost)
postsRouter.post("/", postsController.createPost)
postsRouter.put("/:id", postsController.updatePost)
postsRouter.delete("/:id", postsController.deletePost)