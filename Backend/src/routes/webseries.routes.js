import { Router } from "express";

import {
  getTrendingWebseries,
  getWebseriesTrailer,
  getWebseriesDetail,
  getWebseriesCategory,
} from "../controllers/webseries.controller.js";

const router = Router();

router.route("/trending").get(getTrendingWebseries);
router.route("/:id/trailers").get(getWebseriesTrailer);
router.route("/:id/detail").get(getWebseriesDetail);
router.route("/:category").get(getWebseriesCategory);

export default router;
