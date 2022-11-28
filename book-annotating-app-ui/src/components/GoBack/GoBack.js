import React from "react";
import styles from "./GoBack.module.scss";
import backArrow from "assets/back_arrow.svg";

const GoBack = ({href, onClickFn, children}) => (
    <a href={href} className={styles.back} onClick = {onClickFn}>
        <img src={backArrow} alt="Arrow" />
        {children}
    </a>
)

export default GoBack;