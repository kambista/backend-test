import express from "express";
import * as controller from "../controllers/CarController";

export const carRouter = express.Router();

carRouter.get("/", controller.all);
carRouter.post("/", controller.save);
// Caso de uso: Subir a residente.
carRouter.put("/:licensePlate/up_resident", controller.upResident);
// Caso de uso: Subir a oficial.
carRouter.put("/:licensePlate/up_oficial", controller.upOficial);