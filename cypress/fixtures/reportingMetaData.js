
const pageNameVariable = () => {
  const str = /web\|\w+\|homepage/g
  return str;
};

export const homePageInfoPageLoadData = {
  pageName: pageNameVariable(),
  v63: pageNameVariable(),
  v66: 'https://m.myglamm.com/',
  c40: 'mobile website',
  c1: 'homepage',
}

export const surveyPageInfoPageLoadData = {
  pageName: 'web|myglammxo|surveypage',
  v63: 'web|myglammxo|surveypage',
  v66: 'https://m.myglamm.com/myglammxo-survey',
  c40: 'mobile website',
  c1: 'surveypage',
}