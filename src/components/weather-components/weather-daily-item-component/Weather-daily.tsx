import React from "react";
import styles from './weather-daily.module.scss'

import { IPrepearedData } from '../../../types/weather-service-types'
import { weatherService } from "../../../services/weather-service";
import { useTranslation } from "react-i18next";

export default function WeatherDaily ({dailyData}: IPrepearedData) {
    const { t } = useTranslation();

    const prepareDataForDisplay = (time: string, cloudcover: number[], precipitation: number, temperatureMin: number, temperatureMax:  number ) => {
        const {day, date, month} = weatherService.getTime(time)
        const averageClouds = weatherService.getAverageCloud(cloudcover)
        const icon = weatherService.chooseIconForCurrentWeather(averageClouds, precipitation, temperatureMin)
        const holiday = day === 0 || day === 6 ? 'red' : ''
        const maxTemperature = Math.round(temperatureMax) > 0 ? '+'+Math.round(temperatureMax) : Math.round(temperatureMax)
        const minTemperature = Math.round(temperatureMin) > 0 ? '+'+Math.round(temperatureMin) : Math.round(temperatureMin)
        return {day, date, month, icon, holiday, maxTemperature, minTemperature}
    }

    return (
        <ul className={styles.dailyList}>
            {
                dailyData.map(({daily, hourly}, index)=> {
                    const {time, precipitation_probability_mean, temperature_2m_min, temperature_2m_max } = daily
                    const {cloudcover} = hourly
                    const item = prepareDataForDisplay(time, cloudcover, precipitation_probability_mean, temperature_2m_min, temperature_2m_max)
                    return (
                        <li className={styles.listItem} key={index}>
                            <p className={styles.day}>{t('day').split(', ')[item.day]}</p>
                            <p style={{color:item.holiday}} className={styles.date}>{item.date}</p>
                            <p>{t('month').split(', ')[item.month]}</p>
                            <img src={item.icon?.picture} alt=""/>
                            <div className={styles.temperature}>
                                <div>
                                    <p>{t('min')}</p>
                                    <span>{item.minTemperature}</span>
                                </div>
                                <div>
                                    <p>{t('max')}</p>
                                    <span>{item.maxTemperature}</span>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}