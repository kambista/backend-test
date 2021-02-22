import express from "express";
import * as controller from "../controllers/StayController";

export const stayRouter = express.Router()

stayRouter.get("/", controller.all);
// Caso de uso: Registrar entrada de vehículo.
stayRouter.post("/register_entry", controller.registerStay);
// Caso de uso: Registrar salida de vehículo.
stayRouter.post("/register_exit", controller.registerExit);