import React from "react";
import styles from './loading.module.scss'

export default function Loading () {
    return (
        <section className={styles.loading}>
            <div className={styles.ldsElipsis}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    )
}