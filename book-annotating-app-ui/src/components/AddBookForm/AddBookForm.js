import React from "react";
import styles from "./AddBookForm.module.scss";
import GeneralStep from "./GeneralStep";
import Step from "./Step";
import PlotStep from "./PlotStep";
import SpecificationStep from "./SpecificationStep";

const AddBookForm = ({formIndex}) => {

    return(
        <>
            <Step step = {formIndex}/> 
            <div className={styles.wrapper}>
                {
                    {
                        0: <GeneralStep/>,
                        1: <PlotStep/>,
                        2: <SpecificationStep/>
                    }[formIndex]
                }
            </div>
        </>
    )
}

export default AddBookForm;