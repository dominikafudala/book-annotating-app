import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewBookView.module.scss";
import BookContext from "contexts/BookContext";
import LocationContext from "contexts/LocationContext";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import LeftContentWrapper from "components/LeftContentWrapper/LeftContentWrapper";
import GoBack from "components/GoBack/GoBack";
import AddBookForm from "components/AddBookForm/AddBookForm";
import Title from "components/Title/Title";
import Frame from "components/Frame/Frame";
import Button from "components/Button/Button";
import Subeading from "components/Subheading/Subheading";
import Summary from "components/AddBookForm/Summary";


const NewBookView = () => {
    const navigate = useNavigate();
    const locationContext = useContext(LocationContext);
    const types = locationContext.PAGES;

    const [book, setBook] = useState({
        isbn: "",
        title: "",
        series_name: "",
        series_number: "",
        authors: [],
        description: "",
        genres: [],
        publisher: {},
        publication_date: "",
        format: {},
        language: {},
        page_number: ""
    })

    const [formIndex, setFormIndex] = useState({
        formIndex: 0
    })

    const changeBookState = (e) => {
        setBook((prev)=>({
            ...prev,
            [e.target.dataset.name]: 
                e.target.dataset.name === "genres" || e.target.dataset.name === "authors"
                ? [...prev[e.target.dataset.name].map(el => el.id)].includes(e.target.id) 
                    ? [...prev[e.target.dataset.name]].filter(el => el.id !== e.target.id) 
                    : [...prev[e.target.dataset.name], {id: e.target.id, name: e.target.dataset.label}]
                : 
                e.target.value === undefined || e.target.value.includes("on", "off")
                    ? {...prev[e.target.dataset.name]}.id === e.target.id
                    ? {}
                    : {
                        id: e.target.id,
                        name: e.target.dataset.label
                    }
                : e.target.value
    }))
    }

    const context = {changeBookState, book};

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

    const changeFormIndex = (num) => {
        setFormIndex({
            formIndex: num
        })
    }

    const [bookInfoCount, setBookInfoCount] = useState(0);

    const countBookInfo = () => {
        setBookInfoCount(Object.values(book).filter(el => el.length !== 0 && Object.keys(el).length !== 0 ).length);
    }

    useEffect(
        countBookInfo,
         [book]
    )

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
                    <AddBookForm formIndex={formIndex.formIndex} changeFormIndexFn = {changeFormIndex}/>
                </LeftContentWrapper>
                <Frame>
                    <div className={styles.summary}>
                        
                        {
                            bookInfoCount === 0  //check wheter any element exists in book info
                            ?
                            <Subeading>Fill out the form to see the summary.</Subeading>
                            :
                            <Summary/>
                        }
                        <Button onClickFn = {onClickFnForward}>{
                            {
                                0: "Next",
                                1: "Next",
                                2: "Add a book"
                            }[formIndex.formIndex]  
                        }</Button>
                    </div>
                </Frame>
            </BookContext.Provider>
        </ContentWrapper>
    )
}

export default NewBookView;