/* eslint-disable jest/valid-expect */
/* eslint-disable jest/no-standalone-expect */

Cypress.Commands.add('setLocalStorageByItem', (name, value) => {
  localStorage.setItem(name, value);
});

// dataObject format: {"key": "data", "key2": {"dataKey": "dataValue"}}
Cypress.Commands.add('setLocalStorageByObject', (dataObject) => {
  Object.entries(dataObject).forEach((localStorageData) => {
    const [key, value] = localStorageData;
    localStorage.setItem(key, JSON.stringify(value));
  });
});

Cypress.Commands.add('removeLocalStorageItem', (name) => {
  localStorage.removeItem(name);
});

Cypress.Commands.add('assertLocalStorageItemExists', (name) => {
  expect(localStorage.getItem(name)).to.exist;
});

Cypress.Commands.add('assertLocalStorageItem', (name, expectedValue) => {
  expect(localStorage.getItem(name)).to.equal(expectedValue);
});
