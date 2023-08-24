import * as fs from 'fs';
import { saveDataToLocalCSVFile } from './csv';

jest.mock("fs");
const mockFsWriteStream = jest.spyOn(fs, "createWriteStream")
describe("Test suit for CSV utils",()=> {
    test("given a daypart list, saveDataToLocalCSVFile saves data to local file", async()=>{ 
        let totalWritesToStream = 0; 
        mockFsWriteStream.mockImplementation((path:any):any=>{
            return {
            write:(dataString:string)=>{
                totalWritesToStream++;
            },
            close:()=>{
                console.log('closing mock stream')
            }
            }
        })
        const mockDaypartListData = mockPullDayPartDataFromBSC();
        await saveDataToLocalCSVFile(mockDaypartListData)
        expect(mockFsWriteStream).toBeCalledTimes(mockDaypartListData.length===0?0:1);
        expect(totalWritesToStream).toEqual(mockDaypartListData.length===0?0:mockDaypartListData.length+1);
    }) 
})

function mockPullDayPartDataFromBSC():Daypart[] {
    return [
        {
            "active": true,
            "day_mask": 0,
            "domain_id": 0,
            "end_date": "string",
            "end_time": "string",
            "id": 0,
            "impressions_per_hour": 0,
            "minute_mask": "string",
            "name": "string",
            "parent_id": 0,
            "start_date": "string",
            "start_time": "string",
            "virtual_end_date": "string",
            "virtual_start_date": "string",
            "weight": 0
          }
    ]
}