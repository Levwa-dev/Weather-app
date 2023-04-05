import { weatherAxios } from "../axios/axios-instance"
import { IResponse, IParams } from "../types/main-component-types"
import { IDailyData, IPrepearedData, IWeatherIcon } from "../types/weather-service-types"
import i18n from "../i18n"

import thundershtorm from '../images/weather/thundershtorm.svg'
import snow from '../images/weather/snow.svg'
import rain from '../images/weather/rain.svg'
import sun from '../images/weather/sun.svg'
import cloudly from '../images/weather/cloud.svg'
import sunCloudSnow from '../images/weather/sun-cloud-snow.svg'
import sunCloudRain from '../images/weather/sun-cloud-rain.svg'
import sunCloud from '../images/weather/sun-cloud.svg'
import aLittleRain from '../images/weather/a-little-rain.svg'
import aLittleSnow from '../images/weather/a-little-snow.svg'
import sunAlittleRain from '../images/weather/sun-a-little-rain-cloud.svg'



export const weatherService = {
    getAverageCloud  (cloud: number[]) : number {
        return Math.round(cloud.reduce((prev, cur)=>prev+cur)/cloud.length)
    },

    chooseIconForCurrentWeather (cloud: number, precipitation: number, temperature: number) : IWeatherIcon {
        if(precipitation > 97 && temperature >= 22) {
            return {picture:thundershtorm, alt:''}
        }
        if(precipitation > 65 && temperature <= 1 && cloud > 65){
            return {picture:snow, alt:''}
        }
        if(precipitation > 65 && temperature <= 1 && cloud > 35){
            return {picture:sunCloudSnow, alt:''}
        }
        if(precipitation > 55  && temperature <= 1 && cloud > 55){
            return {picture:aLittleSnow, alt:''}
        }
        if(precipitation > 75 && temperature >= 2 && cloud > 75){
            return {picture:rain, alt:''}
        }
        if(precipitation > 50 && temperature >= 2 && cloud > 50) {
            return {picture: aLittleRain, alt:''}
        }
        if(precipitation > 50 && temperature >= 2 && cloud > 50) {
            return {picture: sunAlittleRain, alt:''}
        }
        if(precipitation > 50 && temperature >= 2 && cloud > 25){
            return {picture:sunCloudRain, alt:''}
        }
        if(precipitation < 50 && cloud > 65) {
            return {picture: cloudly, alt:''}
        }
        if(precipitation < 40 && cloud < 65 && cloud > 25) {
            return {picture: sunCloud, alt:''}
        }
        return {picture:sun, alt:''}
    },

    getTime(time:string) {
        const currentDate = new Date(time)
        const month = currentDate.getMonth()
        const day = currentDate.getDay()
        const date = currentDate.getDate() < 10 ? `0${currentDate.getDate()}`: currentDate.getDate()
        return {month, day, date}
    },

    createDailyWeatherList (initialData: IResponse, days: any) : IDailyData[] { // returns a list with daily weather
        const resultData = []
        const {daily, daily_units, hourly, hourly_units} = initialData
        const dailyProperty = Object.keys(daily)
        const dailyValues = Object.values(daily)
        const hourlyProperty = Object.keys(hourly)
        const hourlyValues = Object.values(hourly)
        for(let i = 0; i < days; i++) {

            let d : IDailyData = { daily:{}, hourly:{}, daily_units, hourly_units}

            for(let j = 0; j < dailyProperty.length; j++){      // get the weather for every day
                d.daily[dailyProperty[j] as keyof IDailyData] = dailyValues[j][i]
            }

            for(let j = 0; j < hourlyProperty.length; j++){     // get the weather for every third hour of the day
                if(hourlyProperty[j] === 'cloudcover'){
                    d.daily.cloud = this.getAverageCloud(hourlyValues[j])
                }
                d.hourly[hourlyProperty[j] as keyof IDailyData] = hourlyValues[j].splice(0, 24)
                .filter((item: any, index: number) => index === 0 || index % 3 === 0) 
            }
            resultData.push(d)
        }
        return resultData

    },

    async getWeather (params: IParams) {
        const data = (await weatherAxios.get<IResponse>('', {params})).data
        const prepearedData: IPrepearedData = { city: params.city, dailyData:[]}
        prepearedData.dailyData = this.createDailyWeatherList(data, 7)
        return prepearedData
    }
}