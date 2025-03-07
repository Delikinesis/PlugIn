// Function to send image data to background script
function sendImageToBackground(imageData) {
  chrome.runtime.sendMessage({ type: "image", data: imageData });
}

// Function to process images on the page
function processImages() {
  const images = document.querySelectorAll("img");
  images.forEach(img => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = canvas.toDataURL();
    sendImageToBackground(imageData);
  });
}

// Run the image processing function
processImages();
