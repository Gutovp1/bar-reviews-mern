import express from "express";
import cors from "cors";
import bars from "./api/bars.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/bars", bars);
app.use("*", (req, res) =>
  res.status(404).json({ error: "Page not found. Try another one" })
);

export default app;
