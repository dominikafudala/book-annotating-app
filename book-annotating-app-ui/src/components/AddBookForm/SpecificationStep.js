import React from "react";
import StepDesc from "./StepDesc";
import SelectInput from "components/Input/SelectInput";
import BookContext from "contexts/BookContext";
import { useContext } from "react";
import Input from "components/Input/Input";
import styles from "./SpecificationStep.module.scss";
import FormDataContext from "contexts/FormDataContext";

const SpecificationStep = () => {
    const context = useContext(BookContext);
    const formDataContext = useContext(FormDataContext);

    const publishers = [...formDataContext.publishers];

    const languages = [...formDataContext.languages];

    const formats = [...formDataContext.formats];

    const formatElements = [];

    for(let f of formats){
        formatElements.push(
            <Input 
                name = {"format"} 
                label = {f.name} 
                type= {"radio"} 
                id = {f.id} 
                key = {f.name} 
                defaultChecked = {context.book.format.name === f.name} 
                onChange = {context.changeBookState}
            />
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
                startValues = {[context.book.publisher]}
                setStateFn = {context.changeBookState}
                single
                key = {"publisher"}
            />
            <div className={styles.inputGroup}>
                <Input name = {"publication_date"} label = {"Publication date"} type= {"date"} key = {"publication_date"}labelTop value = {context.book.publication_date} onChange = {context.changeBookState}/>
                <Input name = {"page_number"} label = {"Pages"} type = {"number"} key = {"page_number"} labelTop value = {context.book.page_number} onChange = {context.changeBookState}/>
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
                startValues = {[context.book.language]}
                setStateFn = {context.changeBookState}
                single
                noAdd
                key = {"language"}
            />
        </>
    )
}
export default SpecificationStep;