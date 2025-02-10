import { Router } from "express";

import {
  getTrendingMovie,
  getMovieDetail,
  getMovieTrailer,
  getMoviesCategory,
} from "../controllers/movie.controller.js";

const router = Router();

router.route("/trending").get(getTrendingMovie);
router.route("/:id/trailers").get(getMovieTrailer);
router.route("/:id/detail").get(getMovieDetail);
router.route("/:category").get(getMoviesCategory);

export default router;
