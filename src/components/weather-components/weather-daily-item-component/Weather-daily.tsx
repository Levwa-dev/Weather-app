import React, {Dispatch} from "react";
import styles from './weather-daily.module.scss'

import { IDailyData } from '../../../types/weather-service-types'
import { weatherService } from "../../../services/weather-service";
import { useTranslation } from "react-i18next";

interface IWeatherDailyProps {
    dailyData: IDailyData[],
    setCard: Dispatch<number>
}

function WeatherDaily ({dailyData, setCard}: IWeatherDailyProps) {
    const { t } = useTranslation();

    const prepareDataForDisplay = (time: string, cloudcover: number, precipitation: number, temperatureMin: number, temperatureMax:  number ) => {
        const {day, date, month} = weatherService.getTime(time)
        const icon = weatherService.chooseIconForCurrentWeather(cloudcover, precipitation, Math.round(temperatureMin))
        const holiday = day === 0 || day === 6 ? 'red' : ''
        const maxTemperature = Math.round(temperatureMax) > 0 ? '+'+Math.round(temperatureMax)+'°' : Math.round(temperatureMax)+'°'
        const minTemperature = Math.round(temperatureMin) > 0 ? '+'+Math.round(temperatureMin)+'°' : Math.round(temperatureMin)+'°'
        return {day, date, month, icon, holiday, maxTemperature, minTemperature}
    }

    const changeActiveCard = (index:number) => (e: React.MouseEvent) : void => {
        const currentCard = e.currentTarget
        const activeCard = document.querySelector(`.${styles.active}`)
        activeCard!.classList.remove(`${styles.active}`)
        currentCard.classList.add(`${styles.active}`)
        setCard(index)
    }

    return (
        <ul className={styles.dailyList}>
            {
                dailyData.map(({ daily }, index)=> {
                    const {time, precipitation_probability_mean, temperature_2m_min, temperature_2m_max, cloud } = daily
                    const item = prepareDataForDisplay(time!, cloud, precipitation_probability_mean!, temperature_2m_min!, temperature_2m_max!)
                    return (
                        <li 
                            onClick={changeActiveCard(index)} 
                            className={index === 0 ? `${styles.listItem} ${styles.active}` : styles.listItem} 
                            key={index}>

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
export default React.memo(WeatherDaily)