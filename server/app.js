import express from 'express';
import mongoose from 'mongoose';

import 'dotenv/config';

const app = express();
app.use(express.json());

const DB_URI = process.env.MONGODB_URI;
mongoose
	.connect(DB_URI)
	.then(() => console.log('Database connected.'))
	.catch((err) => console.log('Database connection error', err));

import sampleRoute from './routes/sampleRoute.js';
app.use('/', sampleRoute);

import userRoute from './routes/userRoute.js';
import studentRoute from './routes/studentRoute.js';
app.use('/api/users', userRoute);
app.use('/api/students', studentRoute);

const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
