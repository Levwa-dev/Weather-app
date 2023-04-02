interface INewData  {
    [propName:string]: any
}
export interface IDailyData {
    daily: INewData,
    hourly: INewData,
    daily_units: object,
    hourly_units: object
}

export interface IPrepearedData {
    city?: string,
    dailyData: IDailyData[]
}
export interface IWeatherIcon {
    picture: string,
    alt: string
}