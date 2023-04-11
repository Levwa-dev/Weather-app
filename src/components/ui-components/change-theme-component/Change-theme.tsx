import React, {useContext}from "react";
import { State } from "../../../App";
import styles from './change-theme.module.scss'
import { ActionTypes } from "../../../types/app-component-types"; 

export default function ChangeTheme () {
    const {state, dispatch} = useContext(State)

    const changeTheme = (e : React.ChangeEvent<HTMLInputElement>) : void => {
        dispatch({type: ActionTypes.LOADING, data:true})
        if(e.target.checked){
            localStorage.setItem('theme','dark')
            dispatch({type: ActionTypes.THEME, data:'dark'})
            return
        }
        localStorage.setItem('theme','light')
        dispatch({type: ActionTypes.THEME, data:'light'})
    }

    return (
        <div className={styles.checkbox}>
            <label>
                <input onChange={changeTheme} defaultChecked={state.theme === 'dark'? true : false} value='dark' type='checkbox'/>
                <span className={[styles.slider, styles.round].join(' ')}></span>
            </label>
        </div>
    )
}