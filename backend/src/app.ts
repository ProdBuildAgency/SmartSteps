import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import { PrismaClient } from '@prisma/client';
import router from './Routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(json());
app.use('/api/v1', router);

app.get('/', (_, res) => res.send('SmartStep API Running 🚀'));

export default app;