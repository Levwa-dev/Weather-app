import React, { useEffect, useState, useContext } from 'react';
import { State } from '../../App';
import { weatherService} from "../../services/weather-service";
import { IParams } from '../../types/main-component-types';
import { defaultParams } from '../../request-config';
import { ActionTypes } from '../../types/app-component-types';
import { useTranslation } from "react-i18next";

import SearchComponent from '../search-component/Search-component';
import Weather from '../weather-components/weather-component/weather-component';
import Loading from '../loading-component/Loading-component';
import Error from '../error-component/Error-component';


export default function MainComponent () {
    const {state, dispatch} = useContext(State)
    let currentCity = JSON.parse(localStorage.getItem('currentCity')!)
    currentCity = {...defaultParams, ...currentCity}
    const [params, setParams] = useState<IParams>(currentCity || defaultParams)
    const { t } = useTranslation();
  
    useEffect(()=>{
        dispatch({type: ActionTypes.LOADING, data:true})
        weatherService.setCacheWeatherRequest(params)
        .then(data=>dispatch({type:ActionTypes.DATA, data}))
        .catch(err=>dispatch({type:ActionTypes.ERROR, data:t('error')}))
    },[params, t, dispatch])

    if(state.error) {
      return (
        <Error errorMessage={state.error}/>
      )
    }
    if(state.isLoading){
      return (
        <Loading/>
      )
    }
    return (
        <div className='wrapper'>
          <SearchComponent setParams={setParams} prevValue={params}/>
          <main>
            <Weather/>
          </main>
        </div>
    )
}