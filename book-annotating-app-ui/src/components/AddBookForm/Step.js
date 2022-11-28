import React from "react";
import styles from "./Step.module.scss";

const Step = ({step}) => {

    const stepNames = ["general", "plot", "specification"]

    const steps = [];

    for(let i = 0; i < 3; i++){
        let stepDiv;

        if(i === step){
            stepDiv = 
                <div className={styles.step} key = {`step${i}`}>
                    <div className={styles.barBlack}></div>
                    <p className={styles.stepName}>{stepNames[i]}</p>
                </div>
        } else{
            stepDiv = 
                <div className={styles.step} key = {`step${i}`}>
                    <div className={styles.bar}></div>
                    <p className={styles.stepName}>{stepNames[i]}</p>
                </div>
        }
        steps.push(stepDiv);
    }

    return(
        <div className={styles.wrapper}>
            {steps}
        </div>
    )
}

export default Step;