import React from "react";
import styles from './error.module.scss'

interface IError {
    errorMessage: string
}

export default function Error ({errorMessage}: IError) {
    return (
        <section className={styles.errorBody}>
            <h1 className={styles.error}>{errorMessage}</h1>
        </section>
    )
}