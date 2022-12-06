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
import { useContext, useState } from "react";
import Modal from "components/Modal/Modal";
import BookService from "services/BookService";
import { Link } from "react-router-dom";
import Loading from "components/Loading/Loading";


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

    //add book and show modal with info if book was added
    const [modal, setModal] = useState(false);

    const [modalTitle, setModalTitle] = useState();
    const [modalSubtitle, setModalSubTitle] = useState();
    const [modalButton, setModalButton] = useState();
    const [modalSuccess, setModalSuccess] = useState();

    const [isLoading, setLoading] = useState(false);

    const addBookFromIsbn = async () => {
        const isbn = document.querySelectorAll(`[name = "isbn"]`);
        let isbnString = "";
        
        isbn.forEach(i => {
            isbnString = isbnString + i.value;
        });

        if(isbnString.length !== 10 && isbnString.length !== 13){
            setModalTitle("ISBN Error!");
            setModalSubTitle("ISBN should contain 10 or 13 numbers!");
            setModalButton(<Button onClickFn={() => setModal(false)}>Close</Button>)
            setModalSuccess(false);
            setModal(true);
            return;
        }

        setLoading(true);
        await BookService.addBookByIsbn(isbnString).then(resp => {
            if(resp === -1){
                setModalTitle("Something went wrong!");
                setModalSubTitle("Please try again");
                setModalButton(<Button onClickFn={() => setModal(false)}>Close</Button>)
                setModalSuccess(false);
            }else if(resp.length === 0){
                setModalTitle("We couldn't find this book!");
                setModalSubTitle(<>
                    {"Add your book "}
                    <Link to={"/newBook"}>{"manually"}</Link>
                </>);
                setModalButton(<Button onClickFn={() => setModal(false)}>Close</Button>)
                setModalSuccess(false);
            }else if(parseInt(resp) < 0){
                setModalTitle(`Book with this ISBN already exists!`);
                setModalSubTitle(<>
                    {"Go to the "}
                    <Link onClick={() => window.location.href = "/book/" + -resp} to={"/book/"+ -resp}>{"book page"}</Link>
                </>);
                setModalButton(<Button onClickFn={() => setModal(false)}>Close</Button>)
                setModalSuccess(false);
            }else{
                setModalTitle("Book added!");
                setModalSubTitle(<>
                    {"Go to the "}
                    <Link to={"/book/"+ resp}>{"book page"}</Link>
                </>);
                setModalButton(<Button onClickFn={() => window.location.reload()}>Got it</Button>)
                setModalSuccess(true);
            }
            setModal(true);
            setLoading(false);
        })
    }

    return(<>
        {isLoading && <Loading/>}
        {modal && <Modal title = {modalTitle} subheading = {modalSubtitle} button = {modalButton} success = {modalSuccess}/>}
        <ContentWrapper>
            <LeftContentWrapper>
                <GoBack>Cancel and go back</GoBack>
                <Title>Find a book</Title>
                <Subeading bigger>Use an ISBN number to fill in most of the book's information.</Subeading>
                <Input name = {"isbn"} label = {"ISBN number"} inputQuantity = {13} type = "number" autoComplete = "none" min = "0" max = "9" onKeyUp = {nextInputFn}/>
                <div className={styles.buttonContainer}>
                    <Button href = {pages.newBook} secondary>Skip and add manually</Button>
                    <Button onClickFn={addBookFromIsbn}>Find my book</Button>
                </div>
            </LeftContentWrapper>
        </ContentWrapper>
        </>
    )
}

export default AddBookView;