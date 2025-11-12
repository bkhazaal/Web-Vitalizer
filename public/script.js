// the entire script is wrapped in a event listrener to ensure the DOM is fully loaded
document.getElementById("analyzeBtn").addEventListener("click", async () => {
  // get the URL from the input field
  const url = document.getElementById("urlInput").value.trim();
  // get the results div to display output
  const resultsDiv = document.getElementById("results");

  // basic validation for empty URL
  if (!url) {
    resultsDiv.innerHTML = "<p>Please enter a valid URL.</p>";
    return;
  }

  // show loading message
  resultsDiv.innerHTML = "<p>Analyzing...</p>";

  // make a request to the server to analyze the URL
  try {
    // fetch analysis results from the server
    const res = await fetch(`/analyze?url=${encodeURIComponent(url)}`);
    // check if the response is ok
    const data = await res.json();

    // handle errors from the server
    if (data.error) throw new Error(data.error);

    // display the results
    resultsDiv.innerHTML = `
      <h2>Results for ${url}</h2>
      <div class="metric">Performance Score: ${data.performance}</div>
      <div class="metric">FCP: ${data.fcp}</div>
      <div class="metric">LCP: ${data.lcp}</div>
      <div class="metric">CLS: ${data.cls}</div>
      <div class="metric">TBT: ${data.tbt}</div>
    `;
  } catch (error) {
    // display error message
    resultsDiv.innerHTML = `<p>❌ ${error.message}</p>`;
  }
});
