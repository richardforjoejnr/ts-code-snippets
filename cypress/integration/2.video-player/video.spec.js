/* eslint-disable no-undef */
/// <reference types="cypress" />
describe("example video player tests", () => {

  it("Assert Pageload data when the page is loaded", () => {
    cy.intercept("https://samplelib.com/lib/preview/mp4/sample-5s.mp4", (req) => {
      req.reply({
        fixture: "media/sample-5s.mp4",
        headers: {
          "content-type": "video/mp4",
          "Transfer-Encoding": "chunked",
          "Connection": "keep-alive"
        },
      })
    });

    cy.visit(
      "https://samplelib.com/sample-mp4.html"
    );
  });
});
