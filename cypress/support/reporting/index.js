/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */

let analyticsReport = [];

export const resetReports = () => {
  analyticsReport = [];
};

Cypress.Commands.add('startAdobeReporting', (alias) => {
  const reportingUrl = 'https://myglamm.sc.omtrdc.net/b/ss/myglammprod/**';
  return cy
    .intercept('GET', reportingUrl, (req) => {
      analyticsReport.push(req.query);
      console.log('CAPTURED-REPORTS', analyticsReport);
    })
    .as(alias);
});

// Method to check each Item in the array and fails if any item does not match - Currently being used
const checkEachItems = (assert, data) => {
  Object.keys(assert).map((key) => {
    expect(data[key]).to.equal(assert[key]);
    return null;
  });
};

// Method which checks all items in the array before passing/failing depending on if no items failed ie Fails if items are in the failedItemsList
const checkAllItems = (assert, data) => {
  const failedItemsList = [];
  Object.keys(assert).map((key) => {
    if (data[key] !== assert[key]) {
      failedItemsList.push(`${key} - ${data[key]}`);
    }
    return null;
  });
  expect(failedItemsList.toString()).to.be.empty;
};

// method that converts the url data into an array of strings using regex
// aliasArray needs to be in this format [`@${resetPin}`] || [`@${resetPin}`,`@${resetPin}`]
Cypress.Commands.add(
  'assertAdobeDataFromUrl',
  (alias, assert, reportNumber, toggleCheckEachItem = true) => {
    return cy.wait(`@${alias}`).then(() => {
      toggleCheckEachItem
        ? checkEachItems(assert, analyticsReport[reportNumber - 1])
        : checkAllItems(assert, analyticsReport[reportNumber - 1]);
      // checkEachItems(assert, values);
    });
  },
);

/* OUTPUT
console.log(values);
0: "s0513064209068"
1: "event200"
2: "AQB=1"
3: "ndh=1"
4: "pf=1"
5: "t=4/10/2021"
6: "ts=2021-11-04T01:53" */