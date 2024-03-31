/* eslint-disable no-undef */
import React from 'react';
import Message from './message';

describe('<Message />', () => {
  beforeEach(() => {
    // Mock the WebSocket connection
    cy.stub(window, 'WebSocket').callsFake(() => {
      const ws = {
        onmessage: null,
        onerror: null,
        send: cy.stub().as('sendWebSocket'),
        close: cy.stub().as('closeWebSocket'),
      };
      // Simulate receiving a message
      setTimeout(() => {
        const message = {
          type: 'data',
          name: 'John Doe',
          age: 30,
          title: 'Senior Developer',
          comment: 'This is a sample comment.',
        };
        ws.onmessage({ data: JSON.stringify(message) });
      }, 100); // Adjust timeout as necessary for your test environment
      return ws;
    });
  });

  it('renders received messages', () => {
    cy.mount(<Message />);

    // Check for the "Received Messages" title
    cy.get('[data-cy="message-title"]').should('contain', 'Received Messages');

    // Wait for the mock message to be "received"
    cy.wait(200); // Adjust wait time as necessary based on your mock setup

    // Verify the message content
    cy.get('[data-cy="message-0-name"]').should('contain', 'Name: John Doe');
    cy.get('[data-cy="message-0-age"]').should('contain', 'Age: 30');
    cy.get('[data-cy="message-0-title"]').should('contain', 'Title: Senior Developer');
    cy.get('[data-cy="message-0-comment"]').should('contain', 'Comment: This is a sample comment.');
  });

  // Add more tests as needed
});