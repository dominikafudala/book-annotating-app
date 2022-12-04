import React, { useContext } from "react";
import styles from "./GeneralStep.module.scss";
import StepDesc from "./StepDesc";
import Input from "components/Input/Input";
import BookContext from "contexts/BookContext";
import SelectInput from "components/Input/SelectInput";
import FormDataContext from "contexts/FormDataContext";
import { useState } from "react";

const GeneralStep = () => {

    const context = useContext(BookContext);
    const formDataContext = useContext(FormDataContext);

    const authors = [...formDataContext.authors];

    const series = [...formDataContext.series];

    return(
        <>
            <StepDesc>General</StepDesc>
            <Input name = {"title"} label = {"Title *"} labelTop value = {context.book.title} onChange = {context.changeBookState}/>
            <div className={styles.inputGroup}>
                <SelectInput 
                    name = {"series_name"} 
                    label = {"Series name"} 
                    placeholder = {"Select series"} 
                    values = {series} 
                    setStateFn = {context.changeBookState}
                    startValues = {[context.book.series_name]}
                    key = {"series_name"}
                    single
                />
                <Input name = {"series_number"} label = {"Number"} type = {"number"} key = {"series_number"} value = {context.book.series_number} labelTop onChange = {context.changeBookState}/>
            </div>
            <SelectInput 
                name = {"authors"} 
                label = {"Author(s)"} 
                placeholder = {"Select author(s)"} 
                values = {authors} 
                setStateFn = {context.changeBookState}
                startValues = {[...context.book.authors]}
            />
        </>
    )
}

export default GeneralStep;