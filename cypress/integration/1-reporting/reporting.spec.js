/// <reference types="cypress" />
import { homePageInfoPageLoadData, surveyPageInfoPageLoadData } from '../../fixtures/reportingMetaData';

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
    cy.assertAdobeDataFromUrl(myglamm, homePageInfoPageLoadData,1)
  })

  it('Assert Pageload data after clicking the survey', () => {
    cy.get('[alt="SK Survey "]').click();
    cy.assertAdobeDataFromUrl(myglamm, homePageInfoPageLoadData,2)
    cy.assertAdobeDataFromUrl(myglamm, surveyPageInfoPageLoadData,3)
  })

  

})
