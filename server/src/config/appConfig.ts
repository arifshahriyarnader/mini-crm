import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
    PORT: process.env.PORT || 5000,
    DB:{
        MONGODB_URI: process.env.MONGODB_URI
    },
    AUTH:{
        JWT_SECRET:process.env.JWT_SECRET
    }
}