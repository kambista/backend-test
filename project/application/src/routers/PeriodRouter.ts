import express from "express";
import * as controller from "../controllers/PeriodController";

export const periodRouter = express.Router();

periodRouter.post("/", controller.save);
periodRouter.get("/", controller.all);
periodRouter.get("/:id", controller.get);
// Caso de uso: Obtener el pago de residentes.
periodRouter.get("/:id/residents_pay", controller.residentsPay);
// Caso de uso: Inicializar un mes nuevo.
periodRouter.post("/init_period", controller.initPeriod);