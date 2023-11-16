import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import "./utils/db.js";
import routes from "./routes/developer.routes.js";

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

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
