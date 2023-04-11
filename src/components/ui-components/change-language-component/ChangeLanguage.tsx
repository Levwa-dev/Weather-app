import React from "react";
import { useTranslation} from "react-i18next";

import styles from './change-language.module.scss'

export default function ChangeLanguage () {

    const {i18n} = useTranslation();

    const changeLanguage = (lng: string) => {
        localStorage.setItem('language', lng)
        i18n.changeLanguage(lng);
    };

    return (
        <div className={styles.selectBody}>
            <button onClick={()=>changeLanguage('ua')}></button>
            <button onClick={()=>changeLanguage('en')}></button>
        </div>
    )
}