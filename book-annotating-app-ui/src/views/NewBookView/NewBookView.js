import React from "react";
import BookContext from "contexts/BookContext";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import LeftContentWrapper from "components/LeftContentWrapper/LeftContentWrapper";
import GoBack from "components/GoBack/GoBack";
import AddBookForm from "components/AddBookForm/AddBookForm";
import Title from "components/Title/Title";
import Frame from "components/Frame/Frame";
import Button from "components/Button/Button";
import Subeading from "components/Subheading/Subheading";
import { useState, useContext } from "react";
import styles from "./NewBookView.module.scss";
import LocationContext from "contexts/LocationContext";
import { useNavigate } from "react-router-dom";


const NewBookView = () => {
    const navigate = useNavigate();
    const locationContext = useContext(LocationContext);
    const types = locationContext.PAGES;

    const [book, setBook] = useState({
        isbn: "",
        title: "",
        seriesName: "",
        number: "",
        authors: [],
        description: "",
        genres: [],
        publisher: "",
        publicationDate: "",
        format: "",
        language: ""
    })

    const [formIndex, setFormIndex] = useState({
        formIndex: 0
    })

    const context = {book, setBook};

    const onClickFnForward = () => {
        if(formIndex.formIndex < 2) {
            setFormIndex((prev)=>({
                formIndex: prev.formIndex + 1
            }))
        }
    }
    
    const onClickFnBackward = () => {
        if(formIndex.formIndex > 0) {
            setFormIndex((prev)=>({
                formIndex: prev.formIndex - 1
            }))
        } else if(formIndex.formIndex === 0){
            navigate("/"+ types.addBook)
        }
    }

    return(
        <ContentWrapper>
            <BookContext.Provider value={context}>
                <LeftContentWrapper>
                    <GoBack onClickFn = {onClickFnBackward}>
                        {
                        {
                            0: "Back to: Find a book",
                            1: "Back to: General",
                            2: "Back to: Plot"
                        }[formIndex.formIndex]
                    }
                        </GoBack>
                    <Title smaller>Add a book</Title>
                    <AddBookForm formIndex={formIndex.formIndex}/>
                </LeftContentWrapper>
                <Frame>
                    <div className={styles.summary}>
                        <Subeading>Fill out the form to see the summary.</Subeading>
                        <Button onClickFn = {onClickFnForward}>Next</Button>
                    </div>
                </Frame>
            </BookContext.Provider>
        </ContentWrapper>
    )
}

export default NewBookView;