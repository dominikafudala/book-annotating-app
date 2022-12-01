import React from "react";
import styles from "./Step.module.scss";

const Step = ({step, changeFormIndexFn}) => {

    const stepNames = ["general", "plot", "specification"]

    const steps = [];

    for(let i = 0; i < 3; i++){
        let stepDiv;
        stepDiv = 
            <div className={styles.step} key = {`step${i}`} onClick = {() => changeFormIndexFn(i)}>
                <div className={i <= step ? styles.barBlack :styles.bar}></div>
                <p className={styles.stepName}>{stepNames[i]}</p>
            </div>
        steps.push(stepDiv);
    }

    return(
        <div className={styles.wrapper}>
            {steps}
        </div>
    )
}

export default Step;