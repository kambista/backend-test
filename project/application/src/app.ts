import express from "express";
import * as bodyParser from "body-parser";
import {carRouter} from "./routers/CarRouter";
import {periodRouter} from "./routers/PeriodRouter";
import {stayRouter} from "./routers/StayRouter";
import {typeRouter} from "./routers/TypeRouter";

export const app = express();

app.use(bodyParser.json());

app.use("/cars", carRouter);
app.use("/periods", periodRouter);
app.use("/staies", stayRouter);
app.use("/types", typeRouter);
