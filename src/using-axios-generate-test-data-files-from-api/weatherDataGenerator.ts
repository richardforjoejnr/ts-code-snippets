import axios from "axios";
import fs = require("fs");
import schedule = require("node-schedule");

const weatherLocations: number[] = [15];
const callTime = new Date();
const datestring = `${callTime.getDate()}-${(callTime.getMonth() + 1)}-${callTime.getFullYear()}`
const weatherDataPath = `${process.cwd()}/WeatherData/${datestring}/`;

export async function getWeatherDataToFile(): Promise<void> {
  for (let i = 0; i < weatherLocations.length; i++) {
    // get data from endpoint per id
    axios.get("http://weatherwebapiv1-1.trafficmanager.net/api/WeatherLocations/GetLocationDetails", {params: {id: weatherLocations[i]},})
      .then(function (response) {
        console.log(response.data);
        const responseData = JSON.stringify(response.data);
        

        // Create Directory
        fs.mkdir(`${weatherDataPath}${response.data.name}`,{ recursive: true },(err) => {if (err) throw err;});

        // store response as json file
        fs.writeFile(`${weatherDataPath}${response.data.name}/${callTime.getHours()}-${response.data.name}.json`,responseData,
          (err) => {(err) ? console.log(`Error when writing to file: ${err}`) : console.log(`file written successfully ${weatherDataPath}/${response.data.name
                }/${callTime.getHours()}-${callTime.getMinutes()}-${
                  response.data.name
                }`
              );})})}}
// Shceulde Job to run every hour

// per hour * 1 * * *
// every 1 hour, 0th minute, 0th second( ex: execute at 1PM, 2PM, 3PM etc) 0 0 */1 * * *
// per minute */5 * * * *

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const job = schedule.scheduleJob("*/1 * * * *", function () {
  getWeatherDataToFile();
  console.log(`Logged ${new Date()}`);
});

// npx ts-node /Users/rfo05/DEV/code-snippets/src/using-axios-generate-test-data-files-from-api/weatherDataGenerator.ts
