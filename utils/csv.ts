import * as fs from 'fs';
import {EOL} from 'os'

export const saveDataToLocalCSVFile = async(daypartList: Daypart[]) => {
    if (daypartList.length == 0) {
        console.warn("No daypart received")
        return;
    }
    const acceptable_fields = [
        "active",
        "day_mask",
        "domain_id",
        "end_date",
        "end_time",
        "id",
        "impressions_per_hour",
        "minute_mask",
        "name",
        "parent_id",
        "start_date",
        "start_time",
        "virtual_end_date",
        "virtual_start_date",
        "weight"
    ]
    const writeStream = fs.createWriteStream(process.env.FILE_OUTPUT ?? "broadsign_control_dayparts.csv")
    writeStream.write(acceptable_fields.join(",").concat(EOL))

    for await(let data of daypartList) {
        const filteredDataString = acceptable_fields.map(fieldName=>{
            return (data as any)[fieldName]??""
        }).join(",").concat(EOL);
        writeStream.write(filteredDataString)
    }
    writeStream.close()
}