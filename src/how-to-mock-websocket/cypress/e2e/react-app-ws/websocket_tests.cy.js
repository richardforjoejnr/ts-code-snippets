/* eslint-disable no-undef */

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display "Received Messages" with correct text', () => {

    // Check if the "Received Messages" text is visible.
    cy.contains('h2', 'Received Messages').should('be.visible');

    cy.get('[data-cy=message-title]').should('exist').and('contain', 'Received Messages');
  });

  it('verifies the content of the first message received from the websocket', () => {
    const expectedMessage = {
      name: "John Doe",
      age: 30,
      title: "Senior Developer",
      comment: "This is a sample comment for demonstration purposes."
    };

    // Check if the "Received Messages" text is visible.
    cy.checkMessageAtIndex(0, expectedMessage)
  });

  it('verifies that an additional message added to the websocket is shown', () => {
    // Define the expected message
    const expectedMessage = {
      name: "John Doe 2",
      age: 50,
      title: "Senior Test 2",
      comment: "This is a sample comment for demonstration purposes."
    };

    // Action: Add a new message to the websocket
    cy.broadcastMsg({
      "type": "data",
      "name": "John Doe 2",
      "age": 50,
      "title": "Senior Test 2",
      "comment": "This is a sample comment for demonstration purposes."
    })

    // Check the new message on the UI
    cy.checkMessageAtIndex(1, expectedMessage)
  });

})
