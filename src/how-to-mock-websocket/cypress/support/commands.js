/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// eslint-disable-next-line no-undef
Cypress.Commands.add("checkMessageAtIndex", (index, message) => {
  cy.get(`[data-cy=message-${index}-name]`).should(
    "have.text",
    `Name: ${message.name}`
  );
  cy.get(`[data-cy=message-${index}-age]`).should(
    "have.text",
    `Age: ${message.age}`
  );
  cy.get(`[data-cy=message-${index}-title]`).should(
    "have.text",
    `Title: ${message.title}`
  );
  cy.get(`[data-cy=message-${index}-comment]`).should(
    "have.text",
    `Comment: ${message.comment}`
  );
});
