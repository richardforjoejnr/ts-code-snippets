import fs from 'fs';
import faker from 'faker'; // https://github.com/marak/Faker.js/


// Mock files
import originalPollingData from '../how-to-setup-dynamic-api-using-express/mocks/OriginalData.json';
import rawdata from '../how-to-setup-dynamic-api-using-express/mocks/polledResponse.json';
const pollingPath = `${process.cwd()}/src/how-to-setup-dynamic-api-using-express/mocks/polledResponse.json`;



export async function startPolling(noOfItems:number, pollingInterval: number):Promise<void> {

    // get initial polling data

    const initialPollingData = originalPollingData;
    const pollingDataPath = pollingPath ;

    // reset pollingfile data to Original
    const initialPollingDataJson = JSON.stringify(initialPollingData);
    fs.writeFile(pollingDataPath, initialPollingDataJson, (err) => {
           if (err) throw err;
           console.log('Initial polling data written to file');
       });
    console.log('This is after the write call - Initial polling data');

    // Generate items
    await generateItems(noOfItems,pollingInterval)


    console.log("DONEEEEEE");
    // reset generated pollingfile data to Original
        fs.writeFile(pollingDataPath, initialPollingDataJson, (err) => {
            if (err) throw err;
            console.log('Reset the Polling Data written to file');
        });

}

async function generateItems(noOfItems: number, pollingInterval: number) {
    // add 12 new events to the timeline based on the polling interval
    for (let i = 0; i < noOfItems; i++) {

        await addNewItem(i);
        await Wait(pollingInterval);
      }
}

async function addNewItem(i:number){

    // create new item object to append
    const newItem = {
        game_id: i,
        date_start: JSON.stringify(faker.date.recent()),
        game_number: faker.random.number(),
        month: i,
        season: 2015+i,
        attendance: faker.random.number(),
        venue: {
            name: faker.name.lastName()
        },
        team_id: i,
        location: faker.address.country(),
        nickname: faker.internet.userName(),
        score: 10,
        is_at_home: faker.random.boolean(),
        is_winner: faker.random.boolean()
        
    }

    // push new timeline object 

    rawdata.data.push(newItem);
    const json = JSON.stringify(rawdata); //convert it back to json

    fs.writeFile(pollingPath, json, (err) => {
        if (err) throw err;
        console.log('Polling Data written to file');
    });
    console.log('This is after the write call - polling data ');

}



async function Wait(time: number) {
    return new Promise( resolve => setTimeout(resolve, time) );
}
