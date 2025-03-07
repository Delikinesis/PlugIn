// background.js

// Import TensorFlow.js
import * as tf from '@tensorflow/tfjs';

let model; // Variable to store the loaded model

// Function to load the AI model
async function loadModel() {
  // Load your model using TensorFlow.js
  model = await tf.loadLayersModel('PlugIn/model'); // Update with the correct path to your saved model
  console.log('Model loaded successfully');
}

// Function to preprocess image data
function preprocessImage(imageData) {
  const image = new Image();
  image.src = imageData;
  const tensor = tf.browser.fromPixels(image)
    .resizeNearestNeighbor([224, 224]) // Resize to match model input shape
    .toFloat()
    .div(tf.scalar(255)) // Normalize pixel values
    .expandDims(); // Add batch dimension
  return tensor;
}

// Function to run inference on the image
async function runInference(imageData) {
  const preprocessedData = preprocessImage(imageData);
  const prediction = model.predict(preprocessedData);
  const result = prediction.dataSync()[0]; // Get the prediction value
  return result;
}

// Listener for messages from content script
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "image") {
    if (!model) {
      await loadModel(); // Load the model if not already loaded
    }
    const prediction = await runInference(request.data);
    const result = prediction > 0.5 ? "AI-generated" : "Non-AI"; // Example threshold
    sendResponse({ result });
  }
});
