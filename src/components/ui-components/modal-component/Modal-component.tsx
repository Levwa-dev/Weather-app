import React, {useContext} from "react";
import styles from './modal.module.scss'
import { State } from "../../../App";

interface IModal {
    modalText: string,
    setState: (s:string) => void
}

export default function Modal ({modalText, setState}: IModal) {
    const {state} = useContext(State)

    const closeHandler = () => {
        setState('')
    }

    return (
        <section className={styles.modalBody} onClick={closeHandler}>
            <div className={[styles.modal, state.theme].join(' ')}>
                <span onClick={closeHandler}>✘</span>
                <p>{modalText}</p>
            </div>
        </section>
    )

}