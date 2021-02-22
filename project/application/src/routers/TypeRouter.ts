import express from "express";
import * as controller from "../controllers/TypeController";

export const typeRouter = express.Router();

typeRouter.get("/", controller.all);
typeRouter.post("/", controller.save);