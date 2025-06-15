import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import mpesaRoutes from "./routes/mpesa.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from Vite/React build
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.use("/api/mpesa", mpesaRoutes); // Example route

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
