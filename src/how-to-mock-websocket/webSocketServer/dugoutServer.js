/* eslint-disable */
const WSServer = require('ws').WebSocketServer;
const express = require('express');
const http = require('http');
const fs = require('fs');
const fspath = require('path');



const port = 8013;
const app = express();
const server = http.createServer(app);

const ka = { type: 'ka' };

const start_message = {
  type: "data",
  name: "John Doe",
  age: 30,
  title: "Senior Developer",
  comment: "This is a sample comment for demonstration purposes."
};

let wss = new WSServer({ server });

const broadcastMessage = (data, ws)=> {

  console.log(data)  
  const dataString = JSON.stringify(data);

    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(dataString); // Broadcast the updated message
        console.log('Broadcasted message to a client');
      }
    });
};
wss.on('connection', (ws) => {
  console.log('[Mock web socket server] Client connected');

    // Send the start_message only once right after a client connects
    ws.send(JSON.stringify(start_message));
    console.log('Sent start message to newly connected client');

  const keepAliveInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(ka));
      console.log('Sending keep-alive message');
    } else {
      clearInterval(keepAliveInterval);
    }
  }, 10000);

  ws.on('message', (data) => {
    console.log('Received data - ws.on:');
    let messageReceived;
    try {
      messageReceived = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing received data:', error);
      return;
    }

    broadcastMessage(messageReceived, ws);

  });

  ws.on('close', () => {
    clearInterval(keepAliveInterval);
    console.log('[Mock web socket server] Client disconnected');
  });

  ws.on('error', console.error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/status', (req, res) => {
  console.log('Querying status of the websocket');
  res.status(200);
  return res.json({ status: 'ok' });
});

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

server.on('request', app);
server.listen(port, () => console.log('[Mock http server] Listening on port:', port));
// loggers

const logger = {
  ws: (method, msg) =>
    console.log('\n', LOG_ME, `${method} ws message ${JSON.stringify(msg)}`, '\n'),
  http: (method, path, req, data) => {
    const reqMsg = `received ${method} req to ${path} with params: ${JSON.stringify(req)}`;
    const respMsg = `responding with data: ${JSON.stringify(data)}`;
    console.log('\n', LOG_ME, '\n', reqMsg, '\n', respMsg, `\n`);
  },
};
