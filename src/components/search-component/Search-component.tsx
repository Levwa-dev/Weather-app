import React, { useState , useContext} from "react";
import { State } from "../../App";
import { geocodeService } from "../../services/geocode-service";
import PlacesAutocomplete from 'react-places-autocomplete';
import { ISearchComponent } from "../../types/search-component-types";
import { useTranslation } from "react-i18next";
import styles from './search.module.scss'

import Modal from "../ui-components/modal-component/Modal-component";
import ChangeTheme from "../ui-components/change-theme-component/Change-theme";
import ChangeLanguage from "../ui-components/change-language-component/ChangeLanguage";


export default function SearchComponent({ setParams, prevValue }: ISearchComponent) {
    const [location, setLocation] = useState<string>('')
    const [locationError, setLocationError] = useState<string>('')
    const { t } = useTranslation();
    const {state} = useContext(State)

    const sendData = async(address:string) => {
        const response = await geocodeService.getCoords(address)
        const city = location
        if(!response.error){
            sessionStorage.setItem('currentCity', JSON.stringify({city, latitude:response.lat!, longitude:response.lng!}))
            setParams({...prevValue, city, latitude:response.lat!, longitude:response.lng!})
        }
        else{
            setLocationError(response.error)
        }
    }

    const inputHandler = (value:string) => {
        setLocation(value)
    }

    const submit = (address: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        sendData(address)
    }

    const submitFromBlur = (address: string) => ({relatedTarget}: React.FocusEvent) => {
        if(relatedTarget !== null && relatedTarget!.innerHTML === '&#128269;' && address){
            sendData(address)
        }
    }
    const onError = (status: string, clearSuggestions:()=>void) => {
        clearSuggestions()
    }
    return (
        <>
            {
                locationError && <Modal modalText={locationError} setState={setLocationError}/>
            }
            <section className={styles.searchContent}>
                <form className={styles.formBody}>
                    <PlacesAutocomplete
                        value={location}
                        onChange={inputHandler}
                        onError={onError}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <div className={styles.searchInput}>
                                        <input placeholder={t('search')!}
                                            {...getInputProps({
                                                onBlur:submitFromBlur(suggestions[0]?.description)
                                            })}
                                        />
                                        <button onClick={submit(location)}>&#128269;</button>
                                    </div>
                                    { suggestions.length ?
                                    <ul className={[styles.autocompleteContainer, state.theme].join(' ')}>
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            return (
                                            <li
                                                {...getSuggestionItemProps(suggestion, {
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </li>
                                            );
                                        })}
                                    </ul>
                                    :
                                    null
                                    }
                                </div>
                            )}
                    </PlacesAutocomplete>
                    <div className={styles.options}>
                        <ChangeTheme/>
                        <ChangeLanguage/>
                    </div>
                </form>
            </section>
        </>
    )
}