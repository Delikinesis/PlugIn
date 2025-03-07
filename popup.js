// Receive result from background script and update popup UI
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "result") {
    document.getElementById("result").textContent = request.data;
  }
});
