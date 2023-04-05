import React, {useContext, useState, useMemo} from "react";
import { useTranslation } from "react-i18next";
import { State } from "../../../App";

import WeatherDaily from "../weather-daily-item-component/Weather-daily";
import WeatherHourly from "../weather-hourly-component/Weather-hourly";

export default function Weather () {
    const {state: { data } } = useContext(State)
    const [activeCard, setActiveCard] = useState<number>(0)

    const { t } = useTranslation();

    let {city, dailyData} = data

    dailyData = useMemo(()=>{
        return dailyData
    },[dailyData])

    return (
        <section>
            <h1>{`${t('wheather.city')} ${city}`}</h1>
            <WeatherDaily dailyData = {dailyData} setCard={setActiveCard}/>
            <WeatherHourly data = {dailyData} active={activeCard}/>
        </section>
    )
}