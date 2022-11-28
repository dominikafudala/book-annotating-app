import React from "react";
import styles from "./LeftContentWrapper.module.scss";


const LeftContentWrapper = ({children}) => (
    <div className={styles.wrapper}>
        {children}
    </div>
)

export default LeftContentWrapper;