/* eslint-disable */
/**
 * HOW TO MAKE THIS WORKS
 *
 * Setup:
 * This node app uses pandoc as a man in the middle for the unix utilies
 * to convert a latex file into html or pdf.
 * 
 * Add the following to your package.json
 * "node-pandoc": "^0.3.0", "pdflatex": "^0.0.1", "picklesdoc": "^1.2.1",
 * npm install node-pandoc --save-dev
 * npm install pdflatex
 * npm install --global picklesdoc
 * 
 * Copy this file into relevant folder
 * 
 * add the folloing to your package json
 * 
 * "generateTex": "picklesdoc tex ./folder with your feature file/ ./my-document.tex --title='Features Report'",
 * "generatePDF": "yarn generateTex; echo pdf| node .path to file/featurefile-to-pdf.js",
 * 
 * Depending on your OS you have different ways to install:
 * MacOS:
 * On a terminal:
 * $ brew install basictex
 * $ brew install pandoc | or download it here https://pandoc.org/installing.html
 * Run "Yarn" in the root folder to install dependencies
 * Restart the terminal where you are going to use this script (for path proposes)

 *
 * Linux/Unix:
 * On a terminal use your favourite package manager
 * $ sudo apt-get install texlive-latex-base texlive-fonts-recommended live-fonts-extra texlive-latex-extra
 * Restart the terminal
 * Run Yarn in the root to install dependencies
 *
 * Windows:
 * Check https://www.latex-project.org/get/ and install the utility you like for Windows
 * It uses pdflatex (https://www.tug.org/applications/pdftex/) and MUST BE installed in your system.
 *
 * Usage
 * To convert to html:
 * Run Yarn generateHTML
 * NB: static html file will be generated in the folder the command was run
 *
 * To convert to pdf:
 * Run Yarn generatePDF
 * NB: static pdf file will be generated in the folder the command was run
 */

const path = require('path');
const fs = require('fs');
// input/output from console
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
// conversion
const nodePandoc = require('node-pandoc');

const fileToConvert = path.join(process.cwd(), './my-document.tex');

const convertTo = (file, format) => {

  nodePandoc(file, `-f latex -t ${format} -o my-document.${format}`, function (err, result) {
    if (err) {
      // if error show on the screen
      console.error('\x1b[31m*** There was an error converting file ***\x1b[0m');
      console.log(err);
      process.exit(1);
    }

    if (result) {
      // if everything is ok, show a message on the screen
      console.log(`File converted successfully: ${fileToConvert}.html`);
      process.exit(0);
    }
  });
};

console.log('This small app will change the my-document.tex file on the folder on...');
readline.question('... on what do you want to change it? [pdf/html] ', function (format) {
  const formats = ['pdf', 'html'];

  if (formats.includes(format)) {
    // binary read
    const fileToSend = fs.readFileSync(fileToConvert);
    // send to function
    convertTo(fileToSend, format.toLocaleLowerCase());
  } else {
    // if unknow (to what to convert) exit with a message
    console.log('Format file not know!');
    process.exit(1);
  }
});
