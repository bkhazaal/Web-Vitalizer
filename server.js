// server.js
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// load environment variables from .env file
dotenv.config();

// __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_API_KEY;

app.use(express.static(path.join(__dirname, "public")));

app.get("/analyze", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL parameter." });

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}${API_KEY ? `&key=${API_KEY}` : ""}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.lighthouseResult) {
      return res
        .status(400)
        .json({ error: "No Lighthouse data found for that URL." });
    }

    const lighthouse = data.lighthouseResult.categories.performance.score * 100;
    const audits = data.lighthouseResult.audits;

    res.json({
      performance: lighthouse,
      fcp: audits["first-contentful-paint"].displayValue,
      lcp: audits["largest-contentful-paint"].displayValue,
      cls: audits["cumulative-layout-shift"].displayValue,
      tbt: audits["total-blocking-time"].displayValue,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching performance data." });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
