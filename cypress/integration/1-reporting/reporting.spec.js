/// <reference types="cypress" />
import { homePageInfoPageLoadData } from '../../fixtures/reportingMetaData';
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
const myglamm = `myglamm`; //
describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://m.myglamm.com/')
    cy.startAdobeReporting('myglamm')
  })

  it('assertData', () => {
    cy.assertAdobeDataFromUrl(myglamm, homePageInfoPageLoadData,1)
  })

})
