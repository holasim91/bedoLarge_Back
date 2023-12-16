import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const dotEnvConfig = dotenv.config();