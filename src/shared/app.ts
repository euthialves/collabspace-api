import espress from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { router } from "@/routes";

dotenv.config();

const app = espress();

app.use(cors());
app.use(helmet());
app.use(espress.json());
app.use(espress.json({ limit: process.env.MAX_REQUEST_SIZE }));

app.use(router);

export { app };

// REQ -> ROUTES  -> CONTROLLER <-> USECADE <-> RESPODITORY <-> PRISMA <-> DATABASE
