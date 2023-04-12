import { weatherAxios } from "../axios/axios-instance"
import { IResponse, IParams } from "../types/main-component-types"
import { IDailyData, IPrepearedData, IWeatherIcon } from "../types/weather-service-types"

import thundershtorm from '../images/weather/thundershtorm.svg'
import sunThundershtorm from '../images/weather/sun-Thundershtorm.svg'
import snow from '../images/weather/snow.svg'
import rain from '../images/weather/rain.svg'
import aLittleSnow from '../images/weather/a-little-snow.svg'
import aLittleRain from '../images/weather/a-little-rain.svg'
import cloudy from '../images/weather/cloud.svg'
import sunCloudSnow from '../images/weather/sun-cloud-snow.svg'
import sunCloudRain from '../images/weather/sun-cloud-rain.svg'
import sunCloud from '../images/weather/sun-cloud.svg'
import sun from '../images/weather/sun.svg'
import moonCloudSnow from '../images/weather/moon-cloud-snow.svg'
import moonCloudRain from '../images/weather/moon-cloud-rain.svg'
import moonCloud from '../images/weather/moon-cloud.svg'
import moon from '../images/weather/moon.svg'



export const weatherService = {
    async getWeather (params: IParams) {
        const data = (await weatherAxios.get<IResponse>('', {params})).data
        const prepearedData: IPrepearedData = { city: params.city, dailyData:[]}
        prepearedData.dailyData = this.createDailyWeatherList(data, 7)
        return prepearedData
    },

    getCurrentCache () {
        const currentDate = new Date()
        let map = new Map()
        const currentMap = localStorage.getItem('cachedRequests')
        const hour = currentDate.getHours()
        const date = currentDate.getDate()
        const year = currentDate.getFullYear()
        if (currentMap) {
            map = new Map(Object.entries(JSON.parse(currentMap!)))
        }
        return {map, date, hour, year}
    },

    async setCacheWeatherRequest (params: IParams) : Promise<IPrepearedData> {
        const {map, date, hour, year} = this.getCurrentCache()
        const currentDate = `${hour}${date}${year}`
        const key = `${params.city} ${currentDate}`
        if(!map.has(key)){
            map.set(key, await this.getWeather(params))
            map.forEach((value, key: string) => { // if the weather is not relevant, delete old records.
                const date = key.split(' ').pop()
                if(date! < currentDate){
                    map.delete(key)
                }
            })
            localStorage.setItem('cachedRequests', JSON.stringify(Object.fromEntries(map)))
        }
        return map.get(key)
    },

    chooseAverageIconForDailyWeather (dailyIcons: any[] ) : IWeatherIcon {
        let iconsCount = dailyIcons.reduce((prev, {picture, alt}, index)=>{
            const name = `${alt} ${picture}`
            if(index <= 1 || index === dailyIcons.length-1){
                if(alt === 'clear' || alt === 'cloudyWithClearings'){
                    return prev
                }
            }
            prev[name] = 1
            return prev
        },{})

        const iconsKeys = Object.keys(iconsCount)

        function findIconInIconsList (icon: string) {
            const regexp = new RegExp(icon, 'i')
            return iconsKeys.find(item => regexp.test(item))
        }

        if(iconsKeys.length === 1){  
            return {picture: iconsKeys[0].split(' ')[1], alt:iconsKeys[0].split(' ')[0]} 
        }
        if(findIconInIconsList('clear') && !findIconInIconsList('rain') && findIconInIconsList('cloud')) {
            return {picture: sunCloud, alt:'cloudyWithClearings'}
        }
        if(findIconInIconsList('clear') && findIconInIconsList('snow')) {
            return {picture: sunCloudSnow, alt:'snowWithClearings'}
        }
        if(!findIconInIconsList('clear') && findIconInIconsList('snow')) {
            return {picture: snow, alt:'snow'}
        }
        if(!findIconInIconsList('clear') && findIconInIconsList('alittlesnow') && !iconsKeys.find(item => item.split(' ')[0] === 'snow')) {
            return {picture: aLittleSnow, alt:'aLittleSnow'}
        }
        if(findIconInIconsList('clear') && findIconInIconsList('thunder')) {
            return {picture: sunThundershtorm, alt:'sunThundershtorm'}
        }
        if(findIconInIconsList('clear') && findIconInIconsList('rain')) {
            return {picture: sunCloudRain, alt:'rainWithClearings'}
        }
        if(!findIconInIconsList('clear') && findIconInIconsList('alittlerain') && !iconsKeys.find(item => item.split(' ')[0] === 'rain')) {
            return {picture: aLittleRain, alt:'aLittleRain'}
        }
        if(!findIconInIconsList('clear') && findIconInIconsList('rain')) {
            return  {picture: rain, alt:'rain'}
        }

        return {picture: thundershtorm, alt:'thundershtorm'}        
    },

    chooseIconForCurrentWeather (cloud: number, precipitation: number, temperature: number, time: number) : IWeatherIcon {
        if(precipitation > 97 && temperature > 22) {
            return {picture:thundershtorm, alt:'thundershtorm'}
        }
        if(precipitation > 65 && temperature <= 1 && cloud > 65){
            return {picture:snow, alt:'snow'}
        }
        if(precipitation > 65 && temperature <= 1 && cloud > 35){
            const picture = time < 6 || time >= 21 ? moonCloudSnow : sunCloudSnow
            return {picture, alt:'snowWithClearings' }
        }
        if(precipitation > 55  && temperature <= 1 && cloud > 55){
            return {picture:aLittleSnow, alt:'aLittleSnow'}
        }
        if(precipitation > 70 && temperature >= 2 && cloud > 70){
            return {picture:rain, alt:'rain'}
        }
        if(precipitation > 50 && temperature >= 2 && cloud > 50) {
            return {picture: aLittleRain, alt:'aLittleRain'}
        }
        if(precipitation > 50 && temperature >= 2 && cloud > 30){
            const picture = time < 6 || time >= 21 ? moonCloudRain : sunCloudRain
            return {picture, alt:'rainWithClearings'}
        }
        if(precipitation < 50 && cloud > 65) {
            return {picture: cloudy, alt:'cloudy'}
        }
        if(precipitation < 40 && cloud < 65 && cloud > 25) {
            const picture = time < 6 || time >= 21 ? moonCloud : sunCloud
            return {picture, alt:'cloudyWithClearings'}
        }
        return  time < 6 || time >= 21 ? {picture: moon, alt:'clear'} : {picture:sun, alt:'clear'}
    },

    showWindDirection ( windDirection: number) {
        if(windDirection <= 15 || windDirection >= 345) {
            return {direction:180, alt: "north"}
        }
        if(windDirection > 15 && windDirection < 75) {
            return {direction:225, alt: "northEast"}
        }
        if(windDirection <= 105 && windDirection >= 75) {
            return {direction:270, alt: "east"}
        }
        if(windDirection > 105 && windDirection < 165) {
            return {direction:315, alt: "eastSouth"}
        }
        if(windDirection <= 195 && windDirection >= 165) {
            return {direction:0, alt: "south"}
        }
        if(windDirection > 195 && windDirection < 255) {
            return {direction:45, alt: "southWest"}
        }
        if(windDirection <= 285 && windDirection >= 255) {
            return {direction:90, alt: "west"}
        }
        return {direction: 130, alt:'westNorth'}
    },

    getTime(time:string) {
        const currentDate = new Date(time)
        const month: number = currentDate.getMonth()
        const day : number = currentDate.getDay()
        const date : string  = currentDate.getDate() < 10 ? `0${currentDate.getDate()}`: `${currentDate.getDate()}`
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

            let d : IDailyData = { daily:{}, hourly:{ icons:[] }, daily_units, hourly_units}

            for(let j = 0; j < dailyProperty.length; j++){      // get the weather for every day
                d.daily[dailyProperty[j] as keyof IDailyData] = dailyValues[j][i]
            }

            for(let j = 0; j < hourlyProperty.length; j++){     // get the weather for every third hour of the day
                d.hourly[hourlyProperty[j] as keyof IDailyData] = hourlyValues[j].splice(0, 24)
                .filter((item: any, index: number) => index === 0 || index % 3 === 0)
            }
            for(let j = 0; j < d.hourly.temperature_2m!.length; j++) {  // add an icon for every hour
                const cloud = d.hourly.cloudcover![j]
                const precipitation = d.hourly.precipitation_probability![j]
                const time = new Date(d.hourly.time![j])
                const temperature = Math.round(d.hourly.temperature_2m![j])
                d.hourly.icons.push(weatherService.chooseIconForCurrentWeather(cloud, precipitation, temperature, time.getHours()))
            }
            resultData.push(d)
        }
        return resultData
    }
}