import fs from 'fs';

// Files for football
import rawdata from '../how-to-setup-dynamic-api/mockDirectory/initial.json';
import originalData from '../how-to-setup-dynamic-api/mockDirectory/dynamic.json';
const dynamicDataPath = `${process.cwd()}/src/how-to-setup-dynamic-api/mockDirectory/dynamic.json`;



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
        await delay(pollingInterval);
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

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}