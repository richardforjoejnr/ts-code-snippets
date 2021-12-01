/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */

let analyticsReport = [];

Cypress.Commands.add('resetReports', () => {
  analyticsReport = [];
});

Cypress.Commands.add('startAdobeReporting', (alias) => {
  const reportingUrl = 'https://myglamm.sc.omtrdc.net/b/ss/myglammprod/**';
  return cy
    .intercept(reportingUrl, (req) => {
      // Checks if the call is a GET or POST , depending on type extracts the data accordingly
      if (req.method === 'GET') {
        analyticsReport.push(req.query) ;
        console.log('CAPTURED-REPORTS', analyticsReport);
      } else if (req.method === 'POST') {
      const rawRequestBody = req.body.toString()
      const decodedReqBody = decodeURIComponent(rawRequestBody)
      const values = decodedReqBody.match(/\w+=[A-Za-z0-9 ?@#%,"{}_/ :-|.-]+/g)
      console.log(values)
      analyticsReport.push(values) ;
      console.log('CAPTURED-REPORTS', analyticsReport);
      }
      
    })
    .as(alias);
});

// Method to check each Item in the array and fails if any item does not match - Currently being used
const checkEachItems = (assert, data) => {
  console.log(assert)
  console.log(data)
  if (assert instanceof Array) {
    console.log("IS ARRAY")
    assert.forEach(function (arrayItem) {
      console.log('checkEachItems', arrayItem);
      const index = data.findIndex((el) => el.includes(arrayItem.match(/\w+=/g)));
      expect(data[index]).to.contain(arrayItem);
    });
  } else {
    console.log("IS OBJECT")
    Object.keys(assert).map((key) => {
      expect(data[key]).to.equal(assert[key]);
      return null;
    });
  }
  
};

// Method which checks all items in the array before passing/failing depending on if no items failed ie Fails if items are in the failedItemsList
const checkAllItems = (assert, data) => {
  const failedItemsList = [];

  if (assert instanceof Array) {
    assert.forEach(function (arrayItem) {
      if (!data.includes(arrayItem)) {
        console.log('failedItems', arrayItem);
        const index = data.findIndex((el) => el.includes(arrayItem.match(/\w+=/g)));
      failedItemsList.push(`${arrayItem} - ${data[index]}`);
      }
    });
    expect(failedItemsList).to.be.empty;
  } else {
    Object.keys(assert).map((key) => {
      if (data[key] !== assert[key]) {
        failedItemsList.push(`${key} - ${data[key]}`);
      }
      return null;
    });
    expect(failedItemsList.toString()).to.be.empty;
  }
  
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