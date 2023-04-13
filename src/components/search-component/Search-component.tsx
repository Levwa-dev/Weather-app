import React, {useState} from "react";
import { ISearchComponent } from "../../types/search-component-types";

import styles from './search.module.scss'

import Modal from "../ui-components/modal-component/Modal-component";
import ChangeTheme from "../ui-components/change-theme-component/Change-theme";
import ChangeLanguage from "../ui-components/change-language-component/ChangeLanguage";

import Input from "../ui-components/input-component/Input";

export default function SearchComponent({ setParams, prevValue }: ISearchComponent) {
    const [locationError, setLocationError] = useState<string>('')

    return (
        <>
            {
                locationError && <Modal modalText={locationError} setState={setLocationError}/>
            }
            <header className={styles.searchContent}>
                <form className={styles.formBody}>
                <Input setParams={setParams} prevValue={prevValue} setLocationError={setLocationError}/>
                    <div className={styles.options}>
                        <ChangeTheme/>
                        <ChangeLanguage/>
                    </div>
                </form>
            </header>
        </>
    )
}