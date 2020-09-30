import fs from 'fs';
import {noInteractionWait} from '../utils/noInteractionWait'
import * as apiMocker from 'apimocker';

// Data needed for dynamic updating of json file
import rawdata from './mockDirectory/initial.json';
import originalData from './mockDirectory/dynamic.json';
const dynamicDataPath = `${process.cwd()}/src/how-to-setup-dynamic-api/mockDirectory/dynamic.json`;
const apiMockerConfigJsonPath = `${process.cwd()}/src/how-to-setup-dynamic-api/apimocker/apimocker.json`;

const mocker = apiMocker.createServer({ quiet: true }).setConfigFile(apiMockerConfigJsonPath);

export async function startMocker(): Promise<void> {

    await mocker.start(7878);
    await startPolling();
}

export async function stopMocker(): Promise<void> {

    await mocker.stop();
}

export async function startPolling(): Promise<void>{

       // get initial polling data

        const initialData = originalData;
        const PollingPath = dynamicDataPath;

       
       // set update Interval value
        const pollingInterval = 1000;
   
       // reset pollingfile data to Original
       const initialDataJson = JSON.stringify(initialData);
       

       fs.writeFile(PollingPath, initialDataJson, (err) => {
           if (err) throw err;
           console.log('Initial polling data written to file');
       });
       
       console.log('This is after the write call - Initial polling data');

    // add 12 new events based on the polling interval
       for (let i = 0; i < 12; i++) {
            await addNewEvent(i);
        await noInteractionWait(pollingInterval);
      }

       // reset pollingfile data to Original
       fs.writeFile(PollingPath, initialDataJson, (err) => {
           if (err) throw err;
           console.log('Reset the Polling Data written to file');
       });      

}

async function addNewEvent(i:number){

    // read pollingTimeLine data file

    // generate dynamic data
    const count = i;
    const eventTitle = ["Shot", "Missed Shot", "Goal"];
    const teamID = ["4460929109807135168","5014162150526798168"];
    const teamLogo = ["6559085583478933119","7942295673224225119"];
    const playerName = ["Onel Hernández", "Pierre-Emile Højbjerg"];

    const randomeventTitle = eventTitle[Math.floor(Math.random() * eventTitle.length)];
    const randomTeam = Math.floor(Math.random() * teamID.length);
    const updatedtimetext = `${10 + i}'`;

    // create new timeline object to append
    const newEvent = {
        display: {
            title: randomeventTitle,
            shortTitle: randomeventTitle,
            description: `${playerName[randomTeam]} ${updatedtimetext}`,
            teamId: `${teamID[randomTeam]}`,
            logo: `http://localhost:7878/assets/${teamLogo[randomTeam]}.png`
        }
    }

    // push new timeline object 

    rawdata.event.push(newEvent);
    const json = JSON.stringify(rawdata); //convert it back to json

    fs.writeFile(dynamicDataPath, json, (err) => {
        if (err) throw err;
        console.log('Polling Data written to file');
    });
    console.log('This is after the write call - polling data ');

}


// export async function replaceJsonNewEvent() {

//     // update json
//     const url = 'http://localhost:7878/admin/setMock?verb=get&serviceUrl=premierleague&mockFile=footballPollingNewEvent1.json';
//     // await http.fetchJson(url, 'JSON');


// }

