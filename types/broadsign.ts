type BscAPICredentials = {
    session:string|null
}

interface Daypart {
    active: boolean,
    day_mask: number,
    domain_id: number,
    end_date: string,
    end_time: string,
    id: number,
    impressions_per_hour: number,
    minute_mask: string,
    name: string,
    parent_id:number,
    start_date: string,
    start_time: string,
    virtual_end_date: string,
    virtual_start_date: string,
    weight: number
}