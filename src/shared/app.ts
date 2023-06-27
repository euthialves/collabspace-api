import espress from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = espress();

app.use(cors());
app.use(helmet());
app.use(espress.json());
app.use(espress.json({ limit: process.env.MAX_REQUEST_SIZE }));

export { app };
