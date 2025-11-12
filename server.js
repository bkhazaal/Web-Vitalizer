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

// initialize express app
const app = express();
// set the port
const PORT = process.env.PORT || 3000;
// get the Google API key from environment variables
const API_KEY = process.env.GOOGLE_API_KEY;

// serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// endpoint to analyze a URL
app.get("/analyze", async (req, res) => {
  // get the URL from query parameters
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL parameter." });

  // construct the Pagespeed Insights API URL
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}${API_KEY ? `&key=${API_KEY}` : ""}`;

  // fetch performance data from the API
  try {
    // make the API request
    const response = await fetch(apiUrl);
    // parse the JSON response
    const data = await response.json();

    // check if Lighthouse data is available
    if (!data.lighthouseResult) {
      // handle missing Lighthouse data
      return res
        .status(400)
        .json({ error: "No Lighthouse data found for that URL." });
    }

    // extract relevant performance metrics
    const lighthouse = data.lighthouseResult.categories.performance.score * 100;
    // audits contain the detailed metrics
    const audits = data.lighthouseResult.audits;

    // send the extracted metrics as JSON response
    res.json({
      performance: lighthouse,
      fcp: audits["first-contentful-paint"].displayValue,
      lcp: audits["largest-contentful-paint"].displayValue,
      cls: audits["cumulative-layout-shift"].displayValue,
      tbt: audits["total-blocking-time"].displayValue,
    });
  } catch (err) {
    // handle errors during fetch or processing
    console.error(err);
    res.status(500).json({ error: "Error fetching performance data." });
  }
});

// start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
