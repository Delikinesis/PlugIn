// Listener for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "image") {
    // Load your AI model (e.g., using TensorFlow.js)
    // Preprocess the image data
    // Run inference using the model
    // Send the result back to content script
    const result = "AI-generated"; // Replace with actual model output
    sendResponse({ result });
  }
});
