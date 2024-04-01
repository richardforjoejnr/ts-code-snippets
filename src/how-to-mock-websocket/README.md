
# WebSocket Mock Server Demo using react app and Cypress

Welcome to my demonstration project, showcasing how to set up a mock WebSocket server within a React application. This setup is designed to illustrate the handling and testing of real-time messaging features in a development environment. Additionally, I've integrated Cypress end-to-end and component testing, to ensure the application functions as expected.

## Project Setup

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/richardforjoesky/ws-mock-server-cypress.git
cd ws-mock-server-cypress
npm install
```

## Running the Application

- **Start the Application and WebSocket Server**

    To run the React app along with the mock WebSocket server:

    ```bash
    npm run test:serve
    ```

    This command starts the WebSocket server and the React application concurrently, allowing you to work with real-time data flow in development mode.

- **Build the Application**

    Compile the application for production:

    ```bash
    npm run build
    ```

    This generates a production-ready build in the `build` folder.

## Testing the websocket with postman

```
# Connecting to the WebSocket Using Postman

Postman can be used to connect to and interact with the WebSocket server, allowing you to send and receive messages in real-time. Follow these steps to set up a WebSocket connection in Postman and post a message:

## Step 1: Create a New WebSocket Request

1. Open Postman.
2. Click on the "New" button to create a new request.
3. Select "WebSocket Request" from the list of options.

## Step 2: Configure the WebSocket Request

1. In the URL field, enter the WebSocket server address: `ws://localhost:8013/`.
2. Below the URL field, you'll find the "Message", "Params", "Headers", "Settings" tabs for additional configurations. For a basic connection, no changes are needed here.

## Step 3: Connect to the WebSocket Server

1. Click on the "Connect" button to establish a WebSocket connection to the server. Ensure that your WebSocket server is running at `ws://localhost:8013/`.

## Step 4: Send a Message

Once connected, you can send messages to the WebSocket server:

1. Go to the "Messages" tab below the URL field.
2. In the message input box, enter the JSON message you wish to send. For example:

```json
{
  "type": "data",
  "name": "John Doe 2",
  "age": 50,
  "title": "Senior Test 2",
  "comment": "This is a sample comment for demonstration purposes."
}
```

3. Click on the "Send" button to transmit the message to the WebSocket server.

## Step 5: Receive Messages

- After sending a message, any response from the WebSocket server will be displayed in the "Messages" section.
- You can continue to send and receive messages as long as the connection remains open.


## Testing with Cypress

This project utilizes Cypress for both component testing and end-to-end testing, simulating user interactions and WebSocket communication.

- **Run End-to-End Tests**

    Execute end-to-end tests in headless mode:

    ```bash
    npm run test:e2e
    ```

    For debugging or developing tests interactively:

    ```bash
    npm run test:e2e:debug
    ```

- **Run Component Tests**

    Run component tests in headless mode:

    ```bash
    npm run cy:run:component
    ```

    For an interactive testing experience:

    ```bash
    npm run cy:open:component
    ```

## GitHub Actions Pipeline

# Project Folder Structure

This documentation provides an overview of the folder structure and the purpose of each directory and file in the WebSocket mock server project with Cypress integration.

## Top-Level Structure

- **.github/**: Contains GitHub-specific configurations, including GitHub Actions workflows for CI/CD.
- **cypress/**: Houses all Cypress-related files for end-to-end testing.
- **public/**: Public assets that will be served by the React application.
- **src/**: The source code for the React application.
- **webSocketServer/**: Contains the mock WebSocket server implementation.

## Detailed Breakdown

### webSocketServer/

- **webSocketServer.js**: The main WebSocket server code. This file includes the logic for creating the WebSocket server, handling connections, and broadcasting messages.

### cypress/

#### cypressWebsocket/

- **response/**: Contains scripts that are responses to WebSocket messages within the Cypress environment.
  - **updatePersonDetails.js**: A script to update person details for the tests.
  - **webSocketCommands.js**: Includes Cypress custom commands like `cy.broadcastMsg` for sending messages to the WebSocket server.

#### e2e/

- **websocket_tests.cy.js**: Sample Cypress test file that utilizes `cy.broadcastMsg` to post messages to the WebSocket server for testing.

1. In your Cypress test file, use the command like this:

```javascript
cy.broadcastMsg({
  type: "data",
  name: "John Doe 2",
  age: 50,
  title: "Senior Test 2",
  comment: "This is a sample comment for demonstration purposes."
});
```

This command sends a message to the WebSocket server which can then be observed and tested via the react app UI to ensure the correct behavior of both the server and client.


## GitHub Actions Pipeline

This project is configured with GitHub Actions to automatically run Cypress tests upon each push or pull request, ensuring that all changes are verified before integration. The pipeline includes steps to install dependencies, start the WebSocket server alongside the React application, and execute both component and e2e tests.

- The pipeline is triggered on push or pull requests to the main branch.
- It utilizes a matrix strategy to test across different Node.js versions (if applicable).
- Tests are run in a clean environment to ensure reliability.

## About the Mock WebSocket Server

The mock WebSocket server (`webSocketServer.js`) is set up to simulate real-time data exchange between the client and server. It allows for sending predefined messages to connected clients and supports testing scenarios involving WebSocket communication.

## Contributing

We welcome contributions and suggestions to improve the mock server setup and testing practices. Feel free to fork the repository, make your changes, and submit a pull request.

## Learn More

For more information on React and WebSocket, you may find the following resources helpful:

- [React documentation](https://reactjs.org/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

Thank you for exploring our React WebSocket Mock Server Demo!
```
