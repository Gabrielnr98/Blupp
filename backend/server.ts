import * as express from 'express';
import { errorHandler } from '../middleware/errorMiddleware';
import { PORT } from './utils/config';

const app = express();
app.use(express.json());

app.use(errorHandler);

app.listen(PORT, ()=> console.log(`App listening on port ${PORT}`));