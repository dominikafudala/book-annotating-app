import React from "react";
import styles from "./Loading.module.scss";

const Loading = () => (
    <div className={styles.loading}>
        <div className={styles.wrapper}>
            <div className={styles.dots}></div>
        </div>
    </div>
)

export default Loading;