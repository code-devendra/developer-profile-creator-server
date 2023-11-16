import express from "express";
import {
  getAllDevelopers,
  getDeveloperInfo,
  createDeveloper,
} from "../controllers/developer.controllers.js";

const router = express.Router();

router.route("/developers/:id").get(getDeveloperInfo);
router.route("/developers").get(getAllDevelopers).post(createDeveloper);

export default router;
