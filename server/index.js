// imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { databaseConnection } from './databaseString.js'
import router from './routes/useauth.js'

// initilization
dotenv.config();
const app = express();
const PORT = process.env.PORT1 || 5500;

// middelwares
app.use(cors({ origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(cookieParser())

// database connection
databaseConnection(process.env.MONGO_STRING).then(() => {
	console.log("database is connected")
}).catch((error) => {
	console.log(error.message);
})

// routes
app.use('/apiAuth',router);

// server connection
app.listen(PORT, () => {
	console.log(`server is started at ${PORT}`);
})