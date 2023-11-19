import express from "express";
import chalk from "chalk";
import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./config.js";
import { InjectData, QuerySearch } from "./services.js";
import {
  CheckIfUserAuthenticated,
  CheckUserAccessForQueries,
} from "./middleware.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const log = console.log;

app.use(express.json({ limit: "50mb" }));

app.post("/injest", async (req, res) => {
  try {
    const payload = req.body;
    await InjectData(payload);
    return res.json({ status: "success" });
  } catch (error) {
    log(chalk.red("Error [INJESTING LOGS]:"), error);
    return res.status(500).json({ status: "error" });
  }
});

app.post(
  "/search",
  [CheckIfUserAuthenticated, CheckUserAccessForQueries],
  async (req, res) => {
    try {
      const queries = req.query;
      const data = await QuerySearch(queries, req.rolePermissions);
      return res.json({ status: "success", length: data.length, data });
    } catch (error) {
      log(chalk.red("Error [QUERYING FOR LOGS]:"), error);
      return res.status(500).json({ status: "error" });
    }
  }
);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    log(chalk.blue("Log: [CONNECTED TO MONGODB]"));
    app.listen(PORT, () => {
      log(chalk.blue("Log: [SERVER STARTED]"), PORT);
    });
  } catch (err) {
    log(chalk.red("Error [CONNECTION TO MONGODB]:"), err);
  }
}

startServer();
