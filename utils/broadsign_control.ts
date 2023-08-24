import fetch from "node-fetch"

const BSC_LIST_DAYPART_ENDPOINT = "/day_part/v5"

export const pullDayPartDataFromBSC = async(): Promise<Daypart[]>=>{
    const headers = {"Authorization":`Bearer ${process.env.BSC_TOKEN}`}
    const bscUrl = process.env.BSC_BASE_URL??"";
    const resp = await fetch(`${bscUrl}${BSC_LIST_DAYPART_ENDPOINT}`, {method:"get", headers})
    const data = await resp.json()
    return parseListDaypartResponse(data);
}

function parseListDaypartResponse(data:{day_part:any[]|undefined}): Daypart[] {
    const dayPartList = data['day_part'] || []
    return dayPartList.map(daypartFromResp=>{
      return daypartFromResp;
    })
}
