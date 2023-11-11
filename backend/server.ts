import express from 'express';
import * as Colors from 'colors.ts';
import cors from 'cors';

import { connectDB } from './database/db';
import { errorHandler } from './middleware/errorMiddleware';
import { FRONTEND_URL, PORT } from './utils/config';
import userRoutes from './routes/userRoutes';
import websiteRoutes from './routes/websiteRoutes';

// Apply Colors to consoleLogs
Colors.colors('', '');

// Connection to DB
export const db = async (): Promise<void> => {
    await connectDB();
};

void db();

const app = express();

const allowedOrigins = [FRONTEND_URL];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/website', websiteRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}`.green.underline.bold)
);
