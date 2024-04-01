// Disabling ESLint for the file
/* eslint-disable */

// Importing necessary modules for WebSocket server, HTTP server, and file operations
const WSServer = require('ws').WebSocketServer;
const express = require('express');
const http = require('http');
const fs = require('fs');
const fspath = require('path');

// Define the port number for the server
const port = 8013;

// Initialize an Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Define a keep-alive message object
const ka = { type: 'ka' };

// Define a start message object to send upon new connection
const start_message = {
  type: "data",
  name: "John Doe",
  age: 30,
  title: "Senior Developer",
  comment: "This is a sample comment for demonstration purposes."
};

// Initialize a WebSocket Server on the HTTP server
let wss = new WSServer({ server });

// Function to broadcast a message to all connected WebSocket clients
const broadcastMessage = (data, ws) => {
  console.log(data)
  const dataString = JSON.stringify(data);

  // Iterate over all clients and send the message if the connection is open
  wss.clients.forEach(client => {
    if (client.readyState === ws.OPEN) {
      client.send(dataString);
      console.log('Broadcasted message to a client');
    }
  });
};

// Event listener for new WebSocket connections
wss.on('connection', (ws) => {
  console.log('[Mock web socket server] Client connected');

  // Immediately send the start_message to the newly connected client
  ws.send(JSON.stringify(start_message));
  console.log('Sent start message to newly connected client');

  // Set an interval to send keep-alive messages every 10 seconds
  const keepAliveInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(ka));
      console.log('Sending keep-alive message');
    } else {
      clearInterval(keepAliveInterval);
    }
  }, 10000);

  // Event listener for messages received from clients
  ws.on('message', (data) => {
    console.log('Received data - ws.on:');
    let messageReceived;
    try {
      // Attempt to parse the received message
      messageReceived = JSON.parse(data);
    } catch (error) {
      // Log parsing errors
      console.error('Error parsing received data:', error);
      return;
    }

    // Broadcast the received message to all clients
    broadcastMessage(messageReceived, ws);
  });

  // Event listener for when a WebSocket connection is closed
  ws.on('close', () => {
    clearInterval(keepAliveInterval);
    console.log('[Mock web socket server] Client disconnected');
  });

  // Event listener for WebSocket errors
  ws.on('error', console.error);
});

// Middleware to parse JSON bodies and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handler to check the status of the WebSocket server
app.get('/status', (req, res) => {
  console.log('Querying status of the websocket');
  res.status(200);
  return res.json({ status: 'ok' });
});

// Route handlers for controlling the WebSocket server and connections
app.post('/startSocket', (req, res) => {
  errorFlags = [];
  suppressSubAck = false;
  if (!ws) {
    ws = ws.open();
  }

  logger.http('post', 'start');
  return res.json({ action: 'start', detail: { type: 'socket', success: true } });
});

app.post('/stopSocket', (req, res) => {
  console.log(LOG_ME, 'stopSocket');
  ws && ws.close();

  logger.http('post', 'stop');
  return res.json({ action: 'stop', detail: { type: 'socket', success: true } });
});

app.post('/stopServer', (req, res) => {
  console.log(LOG_ME, 'stopServer');
  ws && ws.close();
  server.close();

  logger.http('post', 'stop');
  return res.json({ action: 'stop', detail: { type: 'server', success: true } });
});

// Fallback route handler to respond with a default message
app.post('/*', (req, res) => {

  const message = {
    "name": "John Doe",
    "age": 30,
    "title": "Senior Developer",
    "comment": "This is a sample comment for demonstration purposes."
  }
  
  // Return the message, whether it's from the file or the fallback
  return res.json(message);
});

// Event listener for HTTP requests
server.on('request', app);

// Start listening on the defined port
server.listen(port, () => console.log('[Mock http server] Listening on port:', port));

// Simple logging utility for WebSocket and HTTP messages
const logger = {
  ws: (method, msg) =>
    console.log('\n', LOG_ME, `${method} ws message ${JSON.stringify(msg)}`, '\n'),
  http: (method, path, req, data) => {
    const reqMsg = `received ${method} req to ${path} with params: ${JSON.stringify(req)}`;
    const respMsg = `responding with data: ${JSON.stringify(data)}`;
    console.log('\n', LOG_ME, '\n', reqMsg, '\n', respMsg, `\n`);
  },
};
