import express from "express";
import cors from "cors";
import { appConfig } from "./config";
import connectDB from "./db";

const app= express();
app.use(cors());
app.use(express.json());

//db
connectDB();

//start server
app.listen(appConfig.PORT, () => {
    console.log(`Server is running on port ${appConfig.PORT}`);
});
