import React from "react";
import styles from "./StepDesc.module.scss";

const StepDesc = ({children}) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.square}></div>
            <p className={styles.description}>{children}</p>
        </div>
    )
}

export default StepDesc;