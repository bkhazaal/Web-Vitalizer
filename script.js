document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const url = document.getElementById("urlInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!url) {
    resultsDiv.innerHTML = "<p>Please enter a valid URL.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>Analyzing...</p>";

try {
  const res = await fetch(apiUrl);
  const data = await res.json();

  if (!data.lighthouseResult) {
    throw new Error("No Lighthouse data. The site may block performance scans or the URL is invalid.");
  }

  const lighthouse = data.lighthouseResult.categories.performance.score * 100;
  const audits = data.lighthouseResult.audits;

  const fcp = audits["first-contentful-paint"].displayValue;
  const lcp = audits["largest-contentful-paint"].displayValue;
  const cls = audits["cumulative-layout-shift"].displayValue;
  const tbt = audits["total-blocking-time"].displayValue;

  resultsDiv.innerHTML = `
    <h2>Results for ${url}</h2>
    <div class="metric">Performance Score: ${lighthouse}</div>
    <div class="metric">FCP: ${fcp}</div>
    <div class="metric">LCP: ${lcp}</div>
    <div class="metric">CLS: ${cls}</div>
    <div class="metric">TBT: ${tbt}</div>
  `;
} catch (error) {
  resultsDiv.innerHTML = `<p>❌ ${error.message}</p>`;
}

});
