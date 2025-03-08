
import * as tf from '@tensorflow/tfjs';

let model; 

async function loadModel() {
  model = await tf.loadLayersModel('PlugIn/ai_image_classifier.h5'); 
  console.log('Model loaded successfully');
}

function preprocessImage(imageData) {
  const image = new Image();
  image.src = imageData;
  const tensor = tf.browser.fromPixels(image)
    .resizeNearestNeighbor([224, 224]) 
    .toFloat()
    .div(tf.scalar(255)) 
    .expandDims(); 
  return tensor;
}


async function runInference(imageData) {
  const preprocessedData = preprocessImage(imageData);
  const prediction = model.predict(preprocessedData);
  const result = prediction.dataSync()[0]; 
  return result;
}


chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "image") {
    if (!model) {
      await loadModel(); 
    }
    const prediction = await runInference(request.data);
    const result = prediction > 0.5 ? "AI-generated" : "Non-AI"; 
    sendResponse({ result });
  }
});
