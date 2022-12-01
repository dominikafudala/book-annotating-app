import React, { useContext } from "react";
import styles from "./GeneralStep.module.scss";
import StepDesc from "./StepDesc";
import Input from "components/Input/Input";
import BookContext from "contexts/BookContext";
import SelectInput from "components/Input/SelectInput";

const GeneralStep = () => {

    const context = useContext(BookContext);

    const authors = [{
            id: 1,
            name: "name1"
        }, {
            id: 2,
            name: "name2"
        },{
            id: 3,
            name: "nome3"
        }];

    return(
        <>
            <StepDesc>General</StepDesc>
            <Input name = {"title"} label = {"Title"} labelTop onChange = {context.changeBookState}/>
            <div className={styles.inputGroup}>
                <Input name = {"series_name"} label = {"Series name"} labelTop key = {"series_name"} onChange = {context.changeBookState}/>
                <Input name = {"series_number"} label = {"Number"} type = {"number"} key = {"series_number"} labelTop onChange = {context.changeBookState}/>
            </div>
            <SelectInput 
                name = {"authors"} 
                label = {"Author(s)"} 
                placeholder = {"Select author(s)"} 
                values = {authors} 
                setStateFn = {context.changeBookState}
            />
        </>
    )
}

export default GeneralStep;