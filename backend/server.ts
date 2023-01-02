import express from "express";
import { connectDB } from "./database/db";
import { errorHandler } from "./middleware/errorMiddleware";
import { PORT } from "./utils/config";
import * as Colors from "colors.ts";

//Apply Colors to consoleLogs
Colors.colors("", "");

//Connection to DB
connectDB();

const app = express();
app.use(express.json());

app.use("/api/gig", require("./routes/gigRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
