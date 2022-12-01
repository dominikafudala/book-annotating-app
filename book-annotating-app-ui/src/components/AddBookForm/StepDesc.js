import React from "react";
import styles from "./StepDesc.module.scss";

const StepDesc = ({children, smaller}) => {
    return(
        <div className={`${styles.wrapper} ${smaller ? styles.smaller : ""}`}>
            <div className={styles.square}></div>
            <p className={styles.description}>{children}</p>
        </div>
    )
}

export default StepDesc;