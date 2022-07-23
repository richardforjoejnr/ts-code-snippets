
const pageNameVariable = () => {
  const str = 'web|home|homepage'
  return str;
};

const eventVariable = () => {
  const str = /event37,event1=\d+$/m
  return str;
};

export const homePageInfoPageLoadData = {
  pageName: pageNameVariable(),
  v63: pageNameVariable(),
  v66: 'https://www.myglamm.com/',
  c40: 'desktop website',
  c1: 'homepage',
  events: eventVariable()
}

export const surveyPageInfoPageLoadData = {
  pageName: 'web|myglammxo|surveypage',
  v63: 'web|myglammxo|surveypage',
  v66: 'https://m.myglamm.com/myglammxo-survey',
  c40: 'mobile website',
  c1: 'surveypage',
}

export const globalVariablesMainObject = () => {
  return {
    AQB: "1",
    AQE: '1',
    aamlh: '6',
    ndh: '1',
    pf: '1',
    ce: 'UTF-8',
    c11: 'https://www.myglamm.com/',
  };
};