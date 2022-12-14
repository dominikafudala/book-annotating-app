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

    const [isbn, setIsbn] = useState("")

    const nextInputFn = (e) => {
        const isbnNew = document.querySelectorAll(`[name = "isbn"]`);
        let isbnString = "";
        
        isbnNew.forEach(i => {
            isbnString = isbnString + i.value;
        });
        
        setIsbn(isbnString);

        const inputs = [...document.querySelectorAll('[name="isbn"]')];
        const currentInput = document.querySelector('[name="isbn"]:focus');
        const indexCurrent = inputs.indexOf(currentInput);

        // check if ctrlV
        const key = e.keyCode;
        const ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17)? true : false);
        const newValue = e.target.value.slice(0,e.target.maxLength);
        if (key === 86 && ctrl) {
            const nextValue = e.target.value.slice(1);
            for(let i = 0; i < nextValue.length; i++){
                const nextVal = nextValue.slice(i);
                inputs[indexCurrent + 1 + i].value =  nextVal.slice(0,e.target.maxLength);
                inputs[indexCurrent + 1 + i].focus();
            }
        }

        e.target.value= newValue;
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

        if(isbn.length !== 10 && isbn.length !== 13){
            setModalTitle("ISBN Error!");
            setModalSubTitle("ISBN should contain 10 or 13 numbers!");
            setModalButton(<Button onClickFn={() => setModal(false)}>Close</Button>)
            setModalSuccess(false);
            setModal(true);
            return;
        }
        setLoading(true);

        await BookService.addBookByIsbn(isbn).then(resp => {
            if(resp === -1){
                setModalTitle("Something went wrong!");
                setModalSubTitle("Please try again");
                setModalButton(<Button onClickFn={() => setModal(false)}>Close</Button>)
                setModalSuccess(false);
            }else if(resp.length === 0){
                setModalTitle("We couldn't find this book!");
                setModalSubTitle(<>
                    {"Add your book "}
                    <Link to={"/newBook"} state = {{
                        params: isbn
                    }
                    }>{"manually"}</Link>
                </>);
                setModalButton(<Button onClickFn={() => setModal(false)}>Close</Button>)
                setModalSuccess(false);
            }else if(parseInt(resp) < 0){
                setModalTitle(`Book with this ISBN already exists!`);
                setModalSubTitle(<>
                    {"Go to the "}
                    <Link 
                    onClick = {() => context.setLocation({
                        location: "/book"
                    })} 
                    to={"/book/"+ -resp}>{"book page"}</Link>
                </>);
                
                setModalButton(<Button onClickFn={() => setModal(false)}>Close</Button>)
                setModalSuccess(false);
            }else{
                setModalTitle("Book added!");
                setModalSubTitle(<>
                    {"Go to the "}
                    <Link onClick = {() => context.setLocation({
                        location: "/book"
                    })} 
                    to={"/book/"+ resp}>{"book page"}</Link>
                </>);
                setModalButton(<Button onClickFn={() => window.location.reload()}>Got it</Button>)
                setModalSuccess(true);
            }
            setLoading(false);
            setModal(true);
            
        })
    }

    return(<>
        {isLoading && <Loading/>}
        {modal && <Modal title = {modalTitle} subheading = {modalSubtitle} button = {modalButton} success = {modalSuccess}/>}
        <ContentWrapper>
            <LeftContentWrapper>
                <GoBack href = "/">Cancel and go back</GoBack>
                <Title>Find a book</Title>
                <Subeading bigger>Use an ISBN number to fill in most of the book's information.</Subeading>
                <Input 
                name = {"isbn"} 
                label = {"ISBN number"} 
                inputQuantity = {13} 
                type = "number" 
                autoComplete = "none" 
                min = "0" 
                max = "9" 
                onKeyUp = {nextInputFn} 
                maxLength = {1}
                />
                <div className={styles.buttonContainer}>
                    <Button href = {pages.newBook} secondary params = {isbn}>Skip and add manually</Button>
                    <Button onClickFn={addBookFromIsbn}>Find my book</Button>
                </div>
            </LeftContentWrapper>
        </ContentWrapper>
        </>
    )
}

export default AddBookView;