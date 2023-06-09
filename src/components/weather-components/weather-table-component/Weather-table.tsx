import React from "react";
import styles from './weather-table.module.scss'
import arrow from '../../../images/wind-direction/arrow.png'

import { useTranslation } from "react-i18next";
import { weatherService } from "../../../services/weather-service";
import { INewHourlyData } from "../../../types/weather-service-types";
import { IHourlyUnits } from "../../../types/main-component-types";

interface IWeatherTable {
    hourly: INewHourlyData,
    hourlyUnits: IHourlyUnits,
    theme: string
}

export default function WeatherTable ({theme, hourly, hourlyUnits}: IWeatherTable) {
    const { t } = useTranslation();
    const backGroundColor = '#d9d9d9'

    const showTemperature = (temperature:number) => {
        return Math.round(temperature) > 0 ? `+${Math.round(temperature)}°`: Math.round(temperature)+'°'
    }
    
    const getDayParts = () => t('hourly.dayPart').split(', ')
    return (
        <>
            { Object.keys(hourly).length &&
                <table className={styles.weatherTable}>
                <thead>
                <tr className={styles.partOfTheDay}>
                    <th></th>
                    {
                        getDayParts().map((item, index)=>{
                            return (
                                <th key={index} colSpan={2}>{item}</th>
                            )
                        })
                    }
                </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    <tr style={theme === 'light' ? {backgroundColor:backGroundColor}:{}} className={styles.time}>
                        <td>{t('hourly.time')}</td>
                        <td>00:00</td>
                        <td>03:00</td>
                        <td>06:00</td>
                        <td>09:00</td>
                        <td>12:00</td>
                        <td>15:00</td>
                        <td>18:00</td>
                        <td>21:00</td>
                    </tr>
                    <tr className={styles.icons}>
                        <td></td>
                        {
                            hourly?.icons!.map((item : any, index : number)=>{
                                return (
                                    <td key={index}>
                                        <img title={`${t(`icon.${item.alt}`)}`} className={styles.icon} src={item.picture} alt={`${t(`icon.${item.alt}`)}`} />
                                    </td>
                                )
                            })
                        }
                    </tr>
                    <tr className={styles.temperature}>
                        <td>{`${t('hourly.temperature')}, ${hourlyUnits?.temperature_2m}`}</td>
                        {
                            hourly?.temperature_2m!.map((item, index)=>{
                                return (
                                    <td key={index}>{showTemperature(item)}</td>
                                )
                            })
                        }
                    </tr>
                    <tr style={theme === 'light' ? {backgroundColor:backGroundColor}:{}} className={styles.apparentTemperature}>
                        <td>{`${t('hourly.feels')}, ${hourlyUnits?.apparent_temperature}`}</td>
                        {
                            hourly?.apparent_temperature!.map((item, index)=>{
                                return (
                                    <td key={index}>{showTemperature(item)}</td>
                                )
                            })
                        }
                    </tr>
                    <tr className={styles.humidity}>
                        <td>{`${t('hourly.humidity')}, ${hourlyUnits?.relativehumidity_2m}`}</td>
                        {
                            hourly?.relativehumidity_2m!.map((item, index)=>{
                                return (
                                    <td key={index}>{item}</td>
                                )
                            })
                        }
                    </tr>
                    <tr style={theme === 'light' ? {backgroundColor:backGroundColor}:{}} className={styles.wind}>
                        <td>{t('hourly.wind')}, {t('hourly.units.wind')}</td>
                            {
                            hourly?.windspeed_10m!.map((item, index)=>{
                                const {direction, alt} = weatherService.showWindDirection(hourly?.winddirection_10m![index])
                                return (
                                    <td className={styles.windContent} key={index}>
                                        <div>
                                            <img title={`${t('direction.'+alt)}`}  style={{transform:`rotate(${direction}deg)`}}  src={arrow} alt={`${t('direction.'+alt)}`} />
                                            <span>{item.toFixed(1)}</span>
                                        </div>
                                    </td>
                                )
                            })
                        }
                    </tr>
                    <tr className={styles.precipitation}>
                        <td>{`${t('hourly.precipitation')}, ${hourlyUnits?.precipitation_probability}`}</td>
                        {
                            hourly?.precipitation_probability!.map((item, index)=>{
                                return (
                                    <td key={index}>{item}</td>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
            }
        </>
    )
}