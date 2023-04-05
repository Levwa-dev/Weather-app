import { IHourly, IHourlyUnits, IDaily, IDailyUnits } from "./main-component-types"
interface INewDailyData  {
    precipitation_probability_mean?: number,
    temperature_2m_max?: number,
    temperature_2m_min?: number,
    time?: string
    [propName:string]: any
}

export interface INewHourlyData  {
    apparent_temperature?: number[],
    cloudcover?: number[],
    precipitation_probability?: number[],
    relativehumidity_2m?: number[],
    temperature_2m?: number[],
    winddirection_10m?: number[],
    windspeed_10m?: number[],
    time?: string[]
    [propName:string]: any
}

export interface IDailyData {
    daily:  INewDailyData,
    hourly: INewHourlyData,
    daily_units: IDailyUnits,
    hourly_units: IHourlyUnits
}

export interface IPrepearedData {
    city?: string,
    dailyData: IDailyData[]
}
export interface IWeatherIcon {
    picture: string,
    alt: string
}