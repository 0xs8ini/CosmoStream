import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CROS_ORIGIN,
    credential: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRouter from "./routes/auth.routes.js";
import movieRoutes from "./routes/movies.routes.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1webseries")

export { app };
