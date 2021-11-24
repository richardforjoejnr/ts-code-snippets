/* eslint-disable no-undef */
/* eslint-disable jest/valid-expect */
/* eslint-disable no-useless-escape */

// TODO
/*
Assert Global Variables
Assert OnClick
- check event6 generated
- check values: LinkTracking	v7, c15 | linkName	pev2 | linkType	pe
Assert on successful pin
- check event65 generated

*/
let analyticsReport = [];

export const resetReports = () => {
  analyticsReport = [];
};

Cypress.Commands.add('startAdobeReporting', (alias) => {
  // eslint-disable-next-line prettier/prettier
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
6: "ts=2021-11-04T01:53"
7: "mid=65936460179715930614201348701639665008"
8: "aamlh=6"
9: "ce=UTF-8"
10: "pageName=soip:pin:reset-pin-choose-your-new-pin"
11: "g=http://localhost:8000/%3Fargs.deeplink=reset-pin#pin/resetpin"
12: "events=event200"
13: "aamb=RKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y"
14: "c7=MySky"
15: "c11=1.0.2"
16: "v14=soip"
17: "v17=MySky"
18: "v19=soip:pin:reset-pin-choose-your-new-pin"
19: "c20=pin"
20: "v20=pin"
21: "c23=soip"
22: "v24=soip:pin:forgot-your-pin:choose-your-new-pin"
23: "c25=pin"
24: "v25=Llama|32F000|QS170.53.0U"
25: "v26=pin"
26: "c27=forgot-your-pin"
27: "v29=forgot-your-pin"
28: "v30=choose-your-new-pin"
29: "c31=choose-your-new-pin"
30: "v34=04|11|2021"
31: "c35=Thursday_01_53"
32: "v35=Thursday_01_53"
33: "v40=pin-mysky"
34: "v43=my-sky"
35: "v57=8d85f355173f2b3854afc0da352dc282"
36: "c69=soip-tvapp-prod"
37: "v100=UK"
38: "s=1680x1050"
39: "c=30"
40: "j=1.6"
41: "v=N"
42: "k=Y"
43: "bw=1920"
44: "bh=1080"
45: "mcorgid=0ABA4673527831C00A490D45%40AdobeOrg"
46: "lrt=291"
47: "AQE=1"

console.log(cleanedAdobeUrlData);
AdobeAnalytics.js:93 Analytics report number 3
reportingSteps.js:35 http://bskybsoiptvappprod.112.2o7.net/b/ss/bskybsoiptvappprod/1/JS-2.22.0/s64724289089409?AQB=1&ndh=1&pf=1&t=24/9/2021 15:27:39 0 -60&ts=2021-10-24T14:27&mid=65936460179715930614201348701639665008&aamlh=6&ce=UTF-8&pageName=soip:sales:pricing&g=http://localhost:8000/#home&events=scOpen,event200&products=sky;SOIP_MOV_COMP;1;;;eVar94=add&aamb=RKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y&c7=MySky&c11=0.2.0&v14=soip&v17=MySky&v19=soip:sales:pricing&c20=pricing&v20=pricing&c23=soip&v24=soip:sales:pricing:add-soip-cinema&c25=sales&v25=Titan|32B206|Q180.000.08.00U (5f5eyw0)&v26=sales&c27=pricing&v29=pricing&v31=add-soip-cinema&c34=add-soip-cinema&v34=24|10|2021&c35=Sunday_15_27&v35=Sunday_15_27&v40=shop_core&v43=shop&v57=8d85f355173f2b3854afc0da352dc282&c69=soip-tvapp-prod&v100=UK&s=1680x1050&c=30&j=1.6&v=N&k=Y&bw=1920&bh=1080&mcorgid=0ABA4673527831C00A490D45%40AdobeOrg&lrt=207&AQE=1

reportingSteps.js:39 dataId:s64724289089409 event:event200 vales1:AQB=1

reportingSteps.js:42 s64724289089409,event200,AQB=1,ndh=1,pf=1,t=24/9/2021,ts=2021-10-24T14:27,mid=65936460179715930614201348701639665008,aamlh=6,ce=UTF-8,pageName=soip:sales:pricing,g=http://localhost:8000/#home,events=scOpen,event200,products=sky;SOIP_MOV_COMP;1;;;eVar94=add,aamb=RKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y,c7=MySky,c11=0.2.0,v14=soip,v17=MySky,v19=soip:sales:pricing,c20=pricing,v20=pricing,c23=soip,v24=soip:sales:pricing:add-soip-cinema,c25=sales,v25=Titan|32B206|Q180.000.08.00U,v26=sales,c27=pricing,v29=pricing,v31=add-soip-cinema,c34=add-soip-cinema,v34=24|10|2021,c35=Sunday_15_27,v35=Sunday_15_27,v40=shop_core,v43=shop,v57=8d85f355173f2b3854afc0da352dc282,c69=soip-tvapp-prod,v100=UK,s=1680x1050,c=30,j=1.6,v=N,k=Y,bw=1920,bh=1080,mcorgid=0ABA4673527831C00A490D45%40AdobeOrg,lrt=207,AQE=1

*/
