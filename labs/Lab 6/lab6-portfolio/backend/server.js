import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { readFile } from "fs/promises";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Allow frontend (Vite dev server / Netlify) to call this API
app.use(
  cors({
    origin: "*"
  })
);

app.use(express.json());

// Utility: load projects from JSON file
async function loadProjects() {
  const data = await readFile(new URL("./projects.json", import.meta.url));
  return JSON.parse(data.toString());
}

/**
 * GET /api/projects
 * Returns all projects.
 */
app.get("/api/projects", async (req, res, next) => {
  try {
    const projects = await loadProjects();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/weather?city=CityName
 * Calls OpenWeather API and returns city, temperature, humidity, description.
 */
app.get("/api/weather", async (req, res, next) => {
  try {
    const city = req.query.city || process.env.DEFAULT_CITY || "Halifax";

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Missing OpenWeather API key on server." });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric"
        }
      }
    );

    const data = response.data;

    const result = {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather?.[0]?.description ?? "N/A"
    };

    res.json(result);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: "City not found" });
    }
    next(err);
  }
});

// 404 for unknown backend routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res
    .status(500)
    .json({ error: "Internal server error. Please try again later." });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
