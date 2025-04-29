import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
    PORT: process.env.PORT || 5000,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://client:5173',
    DB:{
        MONGODB_URI: process.env.MONGODB_URI || 'mongodb://root:example@mongo:27017/crm-mini?authSource=admin'
    },
    AUTH:{
        JWT_SECRET:process.env.JWT_SECRET || 'my_jwt_secret_key' as string,
    }
}