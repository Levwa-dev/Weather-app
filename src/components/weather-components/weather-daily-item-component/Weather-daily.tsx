import React, {Dispatch, useEffect, useState} from "react";
import styles from './weather-daily.module.scss'

import { IDailyData, INewHourlyData } from '../../../types/weather-service-types'
import { IDailyItem } from "../../../types/daily-component,types";
import { weatherService } from "../../../services/weather-service";
import { useTranslation } from "react-i18next";

interface IWeatherDailyProps {
    theme: string,
    activeCard: number,
    dailyData: IDailyData[],
    setCard: Dispatch<number>
}

export default function WeatherDaily ({activeCard, theme, dailyData, setCard}: IWeatherDailyProps) {
    const { t } = useTranslation();
    const currentActiveClass: string = theme === 'dark'? styles.activeDark : styles.active
    const [dailyList, setDailyList] = useState<IDailyItem[]>([])

    const prepareDataForDisplay = (hourly: INewHourlyData, time: string, temperatureMin: number, temperatureMax:  number ) : IDailyItem => {
        const {day, date, month} = weatherService.getTime(time)
        const icon = weatherService.chooseAverageIconForDailyWeather(hourly.icons)
        const holiday: string = day === 0 || day === 6 ? 'red' : ''
        const maxTemperature: string = Math.round(temperatureMax) > 0 ? '+'+Math.round(temperatureMax)+'°' : Math.round(temperatureMax)+'°'
        const minTemperature: string = Math.round(temperatureMin) > 0 ? '+'+Math.round(temperatureMin)+'°' : Math.round(temperatureMin)+'°'
        return {day, date, month, icon, holiday, maxTemperature, minTemperature}
    }

    const changeActiveCard = (index:number) => (e: React.MouseEvent) : void => {
        const currentCard = e.currentTarget
        const activeCard = document.querySelector(`.${currentActiveClass}`)
        activeCard!.classList.remove(`${currentActiveClass}`)
        currentCard.classList.add(`${currentActiveClass}`)
        setCard(index)
    }

    useEffect(()=>{
    const list = dailyData.map(({daily, hourly})=>{
        const {time, temperature_2m_min, temperature_2m_max} = daily
        return prepareDataForDisplay(hourly, time!, temperature_2m_min!, temperature_2m_max!)
    })
    setDailyList(list)

    },[dailyData])

    return (
        <div className={styles.container}>
            <ul className={styles.dailyList}>
                {
                    dailyList && dailyList.map((item, index)=> {
                        return (
                            <li 
                                onClick={changeActiveCard(index)} 
                                className={index === activeCard ? `${styles.listItem} ${currentActiveClass}` : styles.listItem} 
                                key={index}>

                                <p className={styles.day}>{t('day').split(', ')[item.day]}</p>
                                <p style={{color:item.holiday}} className={styles.date}>{item.date}</p>
                                <p>{t('month').split(', ')[item.month]}</p>

                                <img title={`${t('icon.'+item.icon.alt)}`} src={item.icon.picture} alt={`${t('icon.'+item.icon.alt)}`}/>

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
        </div>
    )
}