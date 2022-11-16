import React from "react";
import styles from "./OptionInfo.module.scss";

const OptionInfo = ({question, action, link, left}) => (
    <p className={`${styles.info} ${left ? styles.infoLeft : ""}`}>
        {question}
        <a href={link} className={styles.action}>{action}</a>
    </p>
)

export default OptionInfo;