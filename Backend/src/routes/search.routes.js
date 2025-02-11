import { Router } from "express";

import {
  searchMovie,
  searchWebseries,
  getSearchHistory,
  removeHistoryItem,
} from "../controllers/search.controller.js";

const router = Router();

router.route("/movie/:query").get(searchMovie);
router.route("/Webseries/:query").get(searchWebseries);
router.route("/history").get(getSearchHistory);
router.route("/history/:id").get(removeHistoryItem);

export default router;
