import React, { useState, useEffect } from "react";
import styles from './weather-hourly.module.scss'

import { IDailyData, INewHourlyData } from "../../../types/weather-service-types";
import { IHourlyUnits } from "../../../types/main-component-types";

import WeatherTable from "../weather-table-component/Weather-table";

interface IWeatherDHourlyProps {
    data: IDailyData[],
    active: number
}

export default function WeatherHourly ({data, active}: IWeatherDHourlyProps) {
    const [hourly, setHourly] = useState<INewHourlyData>()
    const [hourlyUnits, setHourlyUnits] = useState<IHourlyUnits>()

    useEffect(()=>{
        setHourly({...data[active]?.hourly})
        setHourlyUnits({...data[active]?.hourly_units})
    },[active])

    return (
        <section>
            <div></div>
            <WeatherTable hourly={hourly!} hourlyUnits={hourlyUnits!} />
        </section>
    )
}