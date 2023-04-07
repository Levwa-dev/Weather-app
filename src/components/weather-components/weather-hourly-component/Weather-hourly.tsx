import React, { useState, useEffect } from "react";
import styles from './weather-hourly.module.scss'

import { IDailyData, INewHourlyData } from "../../../types/weather-service-types";
import { IHourlyUnits } from "../../../types/main-component-types";
import { weatherService } from "../../../services/weather-service";
import { useTranslation } from "react-i18next";

import WeatherTable from "../weather-table-component/Weather-table";

interface IWeatherDHourlyProps {
    data: IDailyData[],
    active: number,
    theme: string
}

export default function WeatherHourly ({theme, data, active}: IWeatherDHourlyProps) {
    const [hourly, setHourly] = useState<INewHourlyData>()
    const [hourlyUnits, setHourlyUnits] = useState<IHourlyUnits>()
    const [date, setDate] = useState({date:'', day:0, month:0})
    const { t } = useTranslation();

    const lightStyle = {
        backgroundColor: 'rgb(248, 252, 255)',
        boxShadow: '0 0 10px rgb(98, 161, 255)'
    }

    useEffect(()=>{
        setHourly({...data[active]?.hourly})
        setHourlyUnits({...data[active]?.hourly_units})
        setDate(weatherService.getTime(data[active]?.hourly.time![0]))
    },[data, active])


    return (
        <section className={styles.hourly}>
            {
                hourly && hourlyUnits &&
                    <div style={theme === 'light' ? lightStyle : {}} className={styles.cont}> 
                        <div className={styles.currentDay}>
                            <p>{t('day').split(', ')[date.day]}</p>
                            <p>{date.date}</p>
                            <p>{t('month').split(', ')[date.month]}</p>
                        </div>
                        <WeatherTable theme={theme} hourly={hourly} hourlyUnits={hourlyUnits} />
                    </div>
            }
        </section>
    )
}