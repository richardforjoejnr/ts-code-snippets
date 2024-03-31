// Import the updatePersonDetails function from a local module.
import { updatePersonDetails } from './response/updatePersonDetails';

// Define the WebSocket server URL for testing.
const serverURL = 'ws://127.0.0.1:8013';

// Function to send JSON data to a WebSocket server.
const sendToWebSocket = (url, json) => {
  // Return a new promise to handle asynchronous WebSocket communication.
  return new Promise((resolve, reject) => {
    // Create a new WebSocket connection to the specified URL.
    const ws = new WebSocket(url);

    // Set a timer to automatically reject the promise if not connected within 5 seconds.
    const timer = setTimeout(() => {
      reject(new Error('Timed out connecting to websocket server'));
      ws?.close(); // Close the WebSocket connection if it exists.
    }, 5000);

    // Define what happens when the WebSocket connection opens.
    ws.onopen = () => {
      ws.send(JSON.stringify(json)); // Send the JSON data as a string.
      ws.close(); // Close the connection after sending the data.
      clearTimeout(timer); // Clear the timeout timer.
      resolve(); // Resolve the promise to indicate success.
    };

    // Define error handling for WebSocket connection.
    ws.onerror = (error) => {
      console.log('Error connecting to websocket server'); // Log error message.
      clearTimeout(timer); // Clear the timeout timer.
      reject(error); // Reject the promise with the error.
    };
  });
};

// Add a custom command to Cypress for broadcasting a title message.
// eslint-disable-next-line no-undef
Cypress.Commands.add('broadcastMsg', async (details) => {

  // Simulate sending data with a delay using setTimeout.
  setTimeout(async () => {
    // Send the data through WebSocket after updating it with updatePersonDetails.
    await sendToWebSocket(serverURL, updatePersonDetails(details));
  }, 100); // Delay set to 100 milliseconds.
});
