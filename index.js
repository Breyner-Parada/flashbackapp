import express from "express";
import cors from "cors";
import { main } from "./lib/mongo.js";
import { routerWeb } from "./routes/index.js";
import { config } from "./config/index.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = config.port;

main();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
routerWeb(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/public/index.html"));
});

app.listen(port, () => {
  console.log("server en el puerto ", port);
});
