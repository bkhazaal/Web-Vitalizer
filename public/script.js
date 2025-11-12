document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const url = document.getElementById("urlInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!url) {
    resultsDiv.innerHTML = "<p>Please enter a valid URL.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>Analyzing...</p>";

  try {
    const res = await fetch(`/analyze?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    if (data.error) throw new Error(data.error);

    resultsDiv.innerHTML = `
      <h2>Results for ${url}</h2>
      <div class="metric">Performance Score: ${data.performance}</div>
      <div class="metric">FCP: ${data.fcp}</div>
      <div class="metric">LCP: ${data.lcp}</div>
      <div class="metric">CLS: ${data.cls}</div>
      <div class="metric">TBT: ${data.tbt}</div>
    `;
  } catch (error) {
    resultsDiv.innerHTML = `<p>❌ ${error.message}</p>`;
  }
});
