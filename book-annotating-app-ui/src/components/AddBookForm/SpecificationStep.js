import React from "react";
import StepDesc from "./StepDesc";
import SelectInput from "components/Input/SelectInput";
import BookContext from "contexts/BookContext";
import { useContext } from "react";
import Input from "components/Input/Input";
import styles from "./SpecificationStep.module.scss";

const SpecificationStep = () => {
    const context = useContext(BookContext);

    const publishers = [{
        id: 1,
        name: "Wydawnictwo Test"
    },
    {
        id: 2,
        name: "Inne Wydawnictow Dwa"
    }]

    const languages = [{
        id: 1,
        name: "English"
    },
    {
        id: 2,
        name: "Polish"
    }]

    const formats = [{
        id: 1,
        name: "Hardcover"
    },
    {
        id: 2,
        name: "Softcover"
    },
    {
        id: 3,
        name: "Ebook"
    }]

    const formatElements = [];

    for(let f of formats){
        formatElements.push(
            <Input name = {"format"} label = {f.name} type= {"radio"} id = {f.id} key = {f.name} onChange = {context.changeBookState}/>
        );
    }


    return (
        <>
            <StepDesc key = {"step_desc"}>Specification</StepDesc>
            <SelectInput 
                name = {"publisher"} 
                label = {"Publisher"} 
                placeholder = {"Select a publisher"} 
                values = {publishers} 
                setStateFn = {context.changeBookState}
                single
                key = {"publisher"}
            />
            <div className={styles.inputGroup}>
                <Input name = {"publication_date"} label = {"Publication date"} type= {"date"} key = {"publication_date"}labelTop onChange = {context.changeBookState}/>
                <Input name = {"page_number"} label = {"Pages"} type = {"number"} key = {"page_number"} labelTop onChange = {context.changeBookState}/>
            </div>

            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Format</legend>
                {formatElements}
            </fieldset>

            <SelectInput 
                name = {"language"} 
                label = {"Language"} 
                placeholder = {"Select a language"} 
                values = {languages} 
                setStateFn = {context.changeBookState}
                single
                noAdd
                key = {"language"}
            />
        </>
    )
}
export default SpecificationStep;