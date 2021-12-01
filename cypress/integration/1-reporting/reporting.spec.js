/// <reference types="cypress" />
import { homePageInfoPageLoadData, surveyPageInfoPageLoadData, samplePostData } from '../../fixtures/reportingMetaData';

const myglamm = `myglamm`; //
describe('example reporting tests', () => {
  before(() => {
    
  })
  
  beforeEach(() => {
    cy.resetReports();
    cy.startAdobeReporting(myglamm)
    cy.visit('https://m.myglamm.com/')
    
  })

  it('Assert Pageload data when the page is loaded', () => {
    cy.assertAdobeDataFromUrl(myglamm, homePageInfoPageLoadData,1)
  })

  it('Assert Pageload data after clicking the survey', () => {
    cy.get('[alt="SK Survey "]').click();
    cy.assertAdobeDataFromUrl(myglamm, homePageInfoPageLoadData,1)
    cy.assertAdobeDataFromUrl(myglamm, surveyPageInfoPageLoadData,2)
  })

  it('Assert Pageload data after POST', () => {
    cy.get('[href="/buy/makeup/kits?icid=home_homepage_multimedia-carousel-10_top%20navigation%20widget_1_top%20navigation%20widget_1"] > .w-16').click().wait(10000);
    cy.assertAdobeDataFromUrl(myglamm, samplePostData,2)
  })

  
  

})
