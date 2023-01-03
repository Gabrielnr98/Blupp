import express from 'express';
import * as Colors from 'colors.ts';

import { connectDB } from './database/db';
import { errorHandler } from './middleware/errorMiddleware';
import { PORT } from './utils/config';
import gigRoutes from './routes/gigRoutes';
import userRoutes from './routes/userRoutes';

// Apply Colors to consoleLogs
Colors.colors('', '');

// Connection to DB
export const db = async (): Promise<void> => {
    await connectDB();
};

void db();

const app = express();
app.use(express.json());

app.use('/api/gig', gigRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}`.green.underline.bold)
);
