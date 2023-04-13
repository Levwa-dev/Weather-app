import React, {useEffect, useContext} from "react";
import styles from './input.module.scss'
import { State } from "../../../App";

import { usePlacesWidget } from "react-google-autocomplete";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import { ISearchComponent } from "../../../types/search-component-types";

interface IInputField extends ISearchComponent {
    setLocationError: (string:string)=> void
}

export default function Input({setParams, prevValue, setLocationError} : IInputField) {
    const { t } = useTranslation();
    const {state:{theme}} = useContext(State)


    const sendData = async(lat: number, lng: number, address:string) => {
        const resultAddress = address.replace(/, \d+/g, '')
        localStorage.setItem('currentCity', JSON.stringify({city: resultAddress, latitude:lat, longitude:lng}))
        setParams({...prevValue, city: resultAddress, latitude:lat, longitude:lng})
    }   

    const { ref } : any = usePlacesWidget({
        apiKey:process.env.REACT_APP_GOOGLE_MAPS_KEY,
        onPlaceSelected: (place) => {
            try {
                const lat = place.geometry.location.lat()
                const lng = place.geometry.location.lng()
                const address = place.formatted_address
                sendData(lat, lng, address)
            } catch (error) {
                setLocationError(i18n.t('searchError'))
            }
        },
        language: i18n.language
    });

    useEffect(()=>{
        const darkStyle = `.pac-container {
            background-color: #333;
            color: #fff;
        }
        .pac-matched {color: #fff;}
        .pac-item {color: #fff}
        .pac-item-query {color: #fff}`

        const lightStyle = `
        .pac-container {
            background-color: #fff;
            color: #000000;
        }
        .pac-matched {color: #000;}
        .pac-item {color: #000}
        .pac-item-query {color: #000}`

        let style = document.getElementById('mystyle')
        if(style) { theme === 'dark' ? style.innerHTML = darkStyle : style.innerHTML = lightStyle }
        else {
            style = document.createElement('style')
            style.id = 'mystyle'
            theme === 'dark' ? style.innerHTML = darkStyle : style.innerHTML = lightStyle
            document.head.appendChild(style)
        }
    },[theme])


  return <input className={styles.search} ref={ref} placeholder={t('search')!}/>

}