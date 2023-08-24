import * as bscUtil from "./utils/broadsign_control"
import * as csvUtil from "./utils/csv"
import { runPuller } from "./index"

jest.mock("./utils/broadsign_control")
jest.mock("./utils/csv")
const TEST_ENV = {BSC_BASE_URL:"http://baseurl.com", BSC_TOKEN:"bsctoken"}
const originalEnv = process.env;
process.env = {...process.env, ...TEST_ENV}
const mockPullDayPartDataFromBSC = jest.spyOn(bscUtil, "pullDayPartDataFromBSC")
jest.spyOn(csvUtil, "saveDataToLocalCSVFile")
mockPullDayPartDataFromBSC.mockReturnValue(Promise.resolve(getMockDaypartList()))

describe('Testing entire data pulling flow', () => {
  afterAll(done=>{
    process.env = originalEnv;
    jest.resetAllMocks()
    done();
  })
  test('call once to pullDayPartDataFromBSC, saveDataToLocalCSVFile', async() => {
  	await runPuller();
	  expect(bscUtil.pullDayPartDataFromBSC).toHaveBeenCalledTimes(1);
	  expect(csvUtil.saveDataToLocalCSVFile).toHaveBeenCalledTimes(1);
  });

  test('saveDataToLocalCSVFile has been called with daypart List written by pullDayPartDataFromBSC', async() => {
  	await runPuller();
	  expect(csvUtil.saveDataToLocalCSVFile).toHaveBeenCalledWith(getMockDaypartList())
  });
});

function getMockDaypartList():Daypart[] {
  return [
    {  
      "active": true,
      "day_mask": 0,
      "domain_id": 0,
      "end_date": "string",
      "end_time": "string",
      "id": 0,
      "parent_id": 0,
      "impressions_per_hour": 0,
      "minute_mask": "string",
      "name": "string",
      "start_date": "string",
      "start_time": "string",
      "virtual_end_date": "string",
      "virtual_start_date": "string",
      "weight": 0
    }
  ]
}