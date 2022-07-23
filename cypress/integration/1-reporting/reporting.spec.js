/* eslint-disable no-undef */
/// <reference types="cypress" />
import { homePageInfoPageLoadData, globalVariablesMainObject } from '../../fixtures/reportingMetaData';

const myglamm = `myglamm`; //
describe('example reporting tests', () => {
  before(() => {
    cy.resetReports();
  })
  
  beforeEach(() => {
    cy.startAdobeReporting(myglamm)
    cy.visit('https://m.myglamm.com/')
    
  })

  it('Assert Pageload data when the page is loaded', () => {
    cy.assertAdobeDataVariables(
      myglamm,
      globalVariablesMainObject(),
      homePageInfoPageLoadData,
    )
  })

  it('Assert Pageload data when the page is loaded', () => {
    cy.assertAdobeDataVariables(
      myglamm,
      globalVariablesMainObject(),
      homePageInfoPageLoadData,
    )
  })


  

})
