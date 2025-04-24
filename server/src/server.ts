import express, { Application } from "express";
import cors from "cors";
import { appConfig } from "./config";
import connectDB from "./db";
import apiRoutes from './routes/api';
import bodyParser from "body-parser";

const app: Application= express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//db
connectDB();

app.use('/api', apiRoutes);

//start server
app.listen(appConfig.PORT, () => {
    console.log(`Server is running on port ${appConfig.PORT}`);
});
