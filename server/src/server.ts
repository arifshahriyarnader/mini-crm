import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { appConfig } from "./config";
import connectDB from "./db";
import apiRoutes from './routes/api';

const app: Application= express();
app.use(cors({origin: appConfig.ALLOWED_ORIGIN}));
app.use(bodyParser.json());
app.use(express.json());

//db
connectDB();

app.use('/api', apiRoutes);

//start server
app.listen(appConfig.PORT, () => {
    console.log(`Server is running on port ${appConfig.PORT}`);
});
