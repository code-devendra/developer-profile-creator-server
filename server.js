import express from "express";
import http from "http";
import cors from "cors";
import * as cron from "node-cron";
import "dotenv/config";
import "./utils/db.js";
import routes from "./routes/developer.routes.js";
import Developer from "./models/developer.models.js";
import { updateDeveloperProfile } from "./utils/update.utils.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// APIs
app.use("/api", routes);

// INVALID API REQUEST
app.use("*", (req, res) => {
  res
    .status(404)
    .json({ status: http.STATUS_CODES[404], message: "INVALID API" });
});

// Scheduled job to update developer profiles daily
cron.schedule("0 0 * * *", async () => {
  console.log("Running scheduled job to update developer profiles...");
  const developers = await Developer.find().select("id");

  for (const developer of developers) {
    await updateDeveloperProfile(developer.id);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
