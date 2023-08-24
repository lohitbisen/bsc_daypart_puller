import {pullDayPartDataFromBSC } from "./broadsign_control";
import fetch from "node-fetch";
jest.mock('node-fetch')
const {Response } = jest.requireActual('node-fetch');

const originalEnv = process.env;
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
const BROADSIGN_LIST_DAYPART_API_ENDPOING = "/day_part/v5"
const TEST_ENV = {BSC_BASE_URL:"http://baseurl.com", BSC_TOKEN:"bscTOken"}

describe('Testing Broadsign Control Functions', () => {
  afterAll(done=>{
    process.env = originalEnv;
    done();
    jest.resetAllMocks()
  })
  afterEach(()=>{
    jest.resetAllMocks()
  })

  test('pullDayPartDataFromBSC calls fetch once with right credentials', async() => {
    const {BSC_BASE_URL} = TEST_ENV;
    process.env = {...originalEnv, ...TEST_ENV}
    mockFetch.mockResolvedValue(mockBscDaypartIdListResponse() as any)
    const recivedResp = await pullDayPartDataFromBSC()
    expect(mockFetch).toBeCalledTimes(1);
    expect(mockFetch).toBeCalledWith(`${BSC_BASE_URL}${BROADSIGN_LIST_DAYPART_API_ENDPOING}`,
      mockRequestForDaypartList()
    ); 
    expect(recivedResp).toEqual((await mockBscDaypartIdListResponse().json()).day_part);
  });

});


function mockBscDaypartIdListResponse() {
  return new Response(JSON.stringify({
    "day_part": [
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
    ],
    "not_modified_since": "string"
  }))
}

function mockRequestForDaypartList() {
  const headers = {"Authorization":`Bearer ${TEST_ENV.BSC_TOKEN}`}
  return {
      method:"get",
      headers
  }
}