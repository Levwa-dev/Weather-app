import React, {useContext, useState} from "react";
import { useTranslation } from "react-i18next";
import { State } from "../../../App";
import styles from './weather.module.scss'

import WeatherDaily from "../weather-daily-item-component/Weather-daily";
import WeatherHourly from "../weather-hourly-component/Weather-hourly";

export default function Weather () {
    const {state: { data, theme } } = useContext(State)
    const [activeCard, setActiveCard] = useState<number>(0)

    const { t } = useTranslation();

    const {city, dailyData} = data
    
    return (
        <section>
            <h1>{`${t('wheather.city')} ${city}`}</h1>
            <div className={styles.container}>
                <WeatherDaily theme={theme} dailyData = {dailyData} activeCard={activeCard} setCard={setActiveCard}/>
                <WeatherHourly theme={theme} data = {dailyData} active={activeCard}/>
            </div>
        </section>
    )
}