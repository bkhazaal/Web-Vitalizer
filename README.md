# Web-Vitalizer – Performance Analyzer

A simple web app that analyzes any website’s performance using **Google PageSpeed Insights** and displays key Lighthouse metrics.

**Live App:** https://web-vitalizer.vercel.app

---

## Features

- Enter any website URL and get instant performance metrics.
- Fetches real data from Google PageSpeed Insights.
- Displays:
  - Performance Score  
  - First Contentful Paint (FCP)  
  - Largest Contentful Paint (LCP)  
  - Cumulative Layout Shift (CLS)  
  - Total Blocking Time (TBT)
- Lightweight frontend (HTML/CSS/JS) with a Node/Express backend.

---

## How It Works

### Frontend (`index.html` + `script.js`)
- User enters a URL.
- `script.js` sends a request to `/analyze?url=...`.
- Results or errors are displayed in the UI.

### Backend (`server.js`)
- Uses Express to serve static files.
- `/analyze` endpoint calls Google PageSpeed Insights API.
- Extracts and returns:
  - performance score  
  - FCP  
  - LCP  
  - CLS  
  - TBT

---



