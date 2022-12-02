import React from "react";
import StepDesc from "./StepDesc";
import Input from "components/Input/Input";
import styles from "./PlotStep.module.scss";
import BookContext from "contexts/BookContext";
import { useContext } from "react";

const PlotStep = () => {
    const context = useContext(BookContext);

    // TODO: pobrac genres z bazy
    const genres = [
        {
            id: 1,
            name: "Young adult"
        },
        {
            id: 2,
            name: "Science fiction"
        }];
    const genresCheckbox = [];
    for(let g of genres){
        const checkbox = <Input    
                    name = {"genres"} 
                    label = {g.name} 
                    id = {g.id} type = {"checkbox"} 
                    defaultChecked = {context.book.genres.length !== 0 ? context.book.genres.map(el  => el.name).includes(g.name) : false} 
                    key = {g.name} 
                    onChange = {context.changeBookState}
        />;
        genresCheckbox.push(checkbox)
    }
    return(
        <>
            <StepDesc>Plot</StepDesc>
            <Input name = {"description"} label = {"Description"} tag = "textarea" value = {context.book.description} onChange = {context.changeBookState}/>
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Genres</legend>
                {genresCheckbox}
            </fieldset>
        </>
    )
}

export default PlotStep;