/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */

let analyticsReportObject = {};

Cypress.Commands.add("resetReports", () => {
  analyticsReportObject = {};
});

Cypress.Commands.add("startAdobeReporting", (alias) => {
  const reportingUrl = "https://myglamm.sc.omtrdc.net/b/ss/myglammprod/**";
  return cy
    .intercept(reportingUrl, (req) => {
      let data;

      if (req.method === "POST") {
        const rawRequestBody = req.body.toString();
        const obj = Object.fromEntries(new URLSearchParams(rawRequestBody));
        data = obj;
        console.log("POST", data);
      }

      if (req.method === "GET") {
        data = req.query;
        console.log("GET", data);
      }

      if (data.hasOwnProperty("pageName") && data.hasOwnProperty("events")) {
        const nameObject = `${data.pageName}`;
        analyticsReportObject[nameObject] = data;
      } else if (data.hasOwnProperty(otherProperty)) {
        const nameObject = data[otherProperty];
        analyticsReportObject[nameObject] = data;
      } else {
        analyticsReportObject[Object.keys(analyticsReportObject).length + 1] =
          data;
      }
      console.log("CAPTURED-REPORTS", analyticsReportObject);
    })
    .as(alias);
});

Cypress.Commands.add("waitForAdobeCall", (objectName, timeoutValue = 10000) => {
  const startTime = performance.now();
  function waitObject() {
    return new Cypress.Promise((resolve) => {
      function checkObject() {
        if (analyticsReportObject.hasOwnProperty(objectName)) {
          cy.log(
            `Call ${objectName} arrived after: ${(
              performance.now() - startTime
            ).toFixed(2)} ms`
          );
          resolve("Adobe Call arrived");
        } else if (performance.now() - startTime >= timeoutValue) {
          resolve(
            `Adobe Call ${objectName} did not arrive after ${timeoutValue} ms`
          );
        } else {
          setTimeout(checkObject, 10);
        }
      }
      checkObject();
    });
  }
  cy.wrap(null).then({ timeout: timeoutValue + 1000 }, () => {
    return waitObject().then((str) => {
      expect(str).to.eq("Adobe Call arrived");
    });
  });
});

// Method to check each Item in the array and fails if any item does not match - Currently being used
const checkEachItems = (assert, data) => {
  Object.keys(assert).map((key) => {
    if (assert[key] instanceof RegExp) {
      console.log("REGEX", data[key], assert[key]);

      expect(data[key]).to.match(assert[key]);
    } else {
      expect(data[key]).to.equal(assert[key]);
    }

    return null;
  });
};

// Method which checks all items in the array before passing/failing depending on if no items failed ie Fails if items are in the failedItemsList
const checkAllItems = (assert, data) => {
  if (data === undefined)
    throw new Error(
      `Following Object ${
        assert.pageName || JSON.stringify(assert)
      } does not match any adobe call`
    );
  const failedItemsList = [];
  Object.keys(assert).map((key) => {
    if (assert[key] instanceof RegExp) {
      if (new RegExp(assert[key]).test(data[key]) === false) {
        failedItemsList.push(`${key} - ${data[key]}`);
      }
    } else if (data[key] !== assert[key]) {
      failedItemsList.push(`${key} - ${data[key]}`);
    }
    return null;
  });
  expect(failedItemsList.toString()).to.be.empty;
};

// method that converts the url data into an array of strings using regex
// aliasArray needs to be in this format [`@${resetPin}`] || [`@${resetPin}`,`@${resetPin}`]
Cypress.Commands.add(
  "assertAdobeDataFromUrl",
  (alias, assert, reportNumber, toggleCheckEachItem = true) => {
    return cy.wait(`@${alias}`).then(() => {
      toggleCheckEachItem
        ? checkEachItems(assert, analyticsReportObject[reportNumber])
        : checkAllItems(assert, analyticsReportObject[reportNumber]);
      // checkEachItems(assert, values);
    });
  }
);

const mergeAdobeObjects = (MainJsonObject, AddOnObject) => {
  Object.keys(AddOnObject).map((key) => {
    if (MainJsonObject.hasOwnProperty(key).valueOf() === false) {
      MainJsonObject[key] = AddOnObject[key];
    }
    if (AddOnObject[key] !== MainJsonObject[key]) {
      MainJsonObject[key] = AddOnObject[key];
    }
    if (Array.isArray(AddOnObject[key]) && Array.isArray(MainJsonObject[key])) {
      MainJsonObject[key] = mergeAdobeObjects(
        MainJsonObject[key],
        AddOnObject[key]
      );
    }
    if (
      typeof AddOnObject[key] === "object" &&
      typeof MainJsonObject[key] === "object"
    ) {
      MainJsonObject[key] = mergeAdobeObjects(
        MainJsonObject[key],
        AddOnObject[key]
      );
    }
    return null;
  });
  return MainJsonObject;
};

Cypress.Commands.add(
  "assertAdobeDataVariables",
  (
    alias,
    mainAnalyticsObject,
    specificAnalyticsAttributes,
    { reportNumber = null, otherProperty = "aaaaaa", timeOut } = {}
  ) => {
    const mainAnalyticsObjectToValidate = mainAnalyticsObject;
    const mergedValues = mergeAdobeObjects(
      mainAnalyticsObjectToValidate,
      specificAnalyticsAttributes
    );
    let report = reportNumber;
    if (report === null) {
      if (mergedValues.hasOwnProperty("pageName")) {
        report = `${mergedValues.pageName}`;
      } else {
        report = mergedValues[otherProperty];
      }
      cy.waitForAdobeCall(report, timeOut);
    }
    return cy.assertAdobeDataFromUrl(alias, mergedValues, report);
  }
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
