import React from "react";
import styles from "./GeneralStep.module.scss";
import StepDesc from "./StepDesc";
import Input from "components/Input/Input";

const GeneralStep = () => {

    return(
        <>
            <StepDesc>General</StepDesc>
            <Input name = {"title"} label = {"Title"} />
            <div className={styles.inputGroup}>
                <Input name = {"series_name"} label = {"Series name"} />
                <Input name = {"series_number"} label = {"Number"} type = {"number"}/>
            </div>
            <Input name = {"authors"} label = {"Author(s)"} />
        </>
    )
}

export default GeneralStep;