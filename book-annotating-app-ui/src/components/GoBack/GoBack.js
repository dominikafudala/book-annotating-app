import React from "react";
import styles from "./GoBack.module.scss";
import backArrow from "assets/back_arrow.svg";

const GoBack = () => (
    <a href="#" className={styles.back}>
        <img src={backArrow} alt="Arrow" />
        Go back
    </a>
)

export default GoBack;