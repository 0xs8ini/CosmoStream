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
import moviesRoutes from "./routes/movies.routes.js";
import webseriesRoutes from "./routes/webseries.routes.js";
import searchRoutes from "./routes/search.routes.js";
import loginCheck from "./middlewares/loginCheck.middleware.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", loginCheck, moviesRoutes);
app.use("/api/v1/webseries", loginCheck, webseriesRoutes);
app.use("/api/v1/search", loginCheck, searchRoutes);

export { app };
