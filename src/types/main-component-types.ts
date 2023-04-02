interface IDaily {
    precipitation_probability_mean: number[],
    temperature_2m_max: number [],
    temperature_2m_min: number[],
    time: string[]
}
export interface IDailyUnits {
    precipitation_probability_mean: string,
    temperature_2m_max: string,
    temperature_2m_min: string,
    time: string
}

interface IHourly {
    apparent_temperature: number[],
    cloudcover: number[],
    precipitation_probability_mean: number[],
    relativehumidity_2m: number[],
    temperature_2m: number[],
    winddirection_10m: number[],
    windspeed_10m: number[],
    time: string[]
}
interface IHourlyUnits {
    apparent_temperature: string,
    cloudcover: string,
    precipitation_probability: string,
    relativehumidity_2m: string,
    temperature_2m: string,
    winddirection_10m: string,
    windspeed_10m: string,
    time: string
}
export interface IParams {
    city: string,
    latitude: number,
    longitude: number,
    hourly: string[],
    daily: string[],
    windspeed_unit : string,
    timezone: string
}

export interface IResponse {
    latitude: number,
    longitude: number,
    daily: IDaily,
    daily_units: IDailyUnits,
    hourly: IHourly,
    hourly_units: IHourlyUnits,
    elevation: number,
    generationtime_ms: number,
    timezone: string,
    timezone_abbreviation: string,
    utc_offset_seconds: number
}