/* eslint-disable no-undef */
import React from 'react';
import App from './App';

describe('<App />', () => {
  beforeEach(() => {
    // Mount the App component before each test
    cy.mount(<App />);
  });

  it('renders the rotating React logo', () => {
    // Check for the presence of the logo and its alt text
    cy.get('.App-logo').should('be.visible').and('have.attr', 'alt', 'logo');
    // Optionally, you can check if the logo has the expected CSS class for rotation (if applicable)
    cy.get('.App-logo').should('have.css', 'animation-name', 'App-logo-spin');
  });

  it('renders the "Learn React" link', () => {
    // Check that the link is visible, has the correct text, and points to the right URL
    cy.get('.App-link')
      .should('be.visible')
      .and('have.text', 'Learn React')
      .and('have.attr', 'href', 'https://reactjs.org')
      .and('have.attr', 'target', '_blank');
  });

  it('displays the "Received Messages" header', () => {
    // Verify that the "Received Messages" text is rendered
    cy.get('[data-cy=message-title]').should('contain', 'Received Messages');
  });

  // Add more tests as needed for other components or features
});