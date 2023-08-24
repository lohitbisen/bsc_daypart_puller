import { config } from "dotenv"
config({path:`.env.${process.env.NODE_ENV}`})
import { pullDayPartDataFromBSC } from "./utils/broadsign_control";
import { saveDataToLocalCSVFile } from "./utils/csv";
export const runPuller = async ()=>{
    pullDayPartDataFromBSC() 
    .then(async(daypartList:Daypart[])=>{
        await saveDataToLocalCSVFile(daypartList)
    }).catch(err=>{
        console.log(err);
    });
};

