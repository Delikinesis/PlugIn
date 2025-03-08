
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "result") {
    document.getElementById("result").textContent = request.data;
  }
});
