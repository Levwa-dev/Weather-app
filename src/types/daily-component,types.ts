import { IWeatherIcon } from "./weather-service-types"
export interface IDailyItem {
    day: number,
    date: string,
    month: number,
    icon: IWeatherIcon,
    holiday: string,
    maxTemperature: string,
    minTemperature: string
}