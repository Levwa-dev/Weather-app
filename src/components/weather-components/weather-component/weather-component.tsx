import React, {useContext} from "react";
import { useTranslation } from "react-i18next";
import { State } from "../../../App";

import WeatherDaily from "../weather-daily-item-component/Weather-daily";

export default function Weather () {
    const {state: { data } } = useContext(State)
    const { t } = useTranslation();
    const {city, dailyData} = data

    return (
        <section>
            <h1>{`${t('wheather.city')} ${city}`}</h1>
            <WeatherDaily dailyData = {dailyData}/>
        </section>
    )
}