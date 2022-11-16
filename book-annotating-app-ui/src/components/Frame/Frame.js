import React from "react";
import styles from "./Frame.module.scss";

const Frame = ({children}) => (
    <div className={styles.frame}>
        {children}
    </div>
)

export default Frame;