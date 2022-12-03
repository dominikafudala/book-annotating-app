import React from "react";
import styles from "./AddBookView.module.scss";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import GoBack from "components/GoBack/GoBack";
import Title from "components/Title/Title";
import LeftContentWrapper from "components/LeftContentWrapper/LeftContentWrapper";
import Subeading from "components/Subheading/Subheading";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import LocationContext from "contexts/LocationContext";
import { useContext } from "react";


const AddBookView = () => {
    
    const context = useContext(LocationContext);
    const pages = context.PAGES;
    const nextInputFn = (e) => {
        const inputs = [...document.querySelectorAll('[name="isbn"]')];
        const currentInput = document.querySelector('[name="isbn"]:focus');
        const indexCurrent = inputs.indexOf(currentInput);
        if(indexCurrent > 0 && (e.key === "ArrowLeft" || e.key === "Backspace")){
            inputs[indexCurrent - 1].focus();
        }
        else if((e.key !== "ArrowLeft" && e.key !== "Backspace" && !isNaN(parseInt(e.key)) && isFinite(e.key)) && indexCurrent + 1 < inputs.length){
            inputs[indexCurrent + 1].focus();
        }
    }
    return(
        <ContentWrapper>
            <LeftContentWrapper>
                <GoBack>Cancel and go back</GoBack>
                <Title>Find a book</Title>
                <Subeading bigger>Use an ISBN number to fill in most of the book's information.</Subeading>
                <Input name = {"isbn"} label = {"ISBN number"} inputQuantity = {13} type = "number" autoComplete = "none" min = "0" max = "9" onKeyUp = {nextInputFn}/>
                <div className={styles.buttonContainer}>
                    <Button href = {pages.newBook} secondary>Skip and add manually</Button>
                    <Button>Find my book</Button>
                </div>
            </LeftContentWrapper>
        </ContentWrapper>
    )
}

export default AddBookView;