import React from "react";
import styles from "./BookElement.module.scss";
import noCover from "assets/book_no_cover.png";
import Button from "components/Button/Button";
import blobPink from "assets/edition_blob_pink.svg";
import blobOrange from "assets/edition_blob_orange.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";
import { useState } from "react";
import Modal from "components/Modal/Modal";
import BookService from "services/BookService";

const BookElement = ({bookData}) => {
    const navigate = useNavigate();
    const context = useContext(LocationContext);
    const authors = [];

    bookData.authors.forEach(
        a => authors.push(a.name)
    )

    const info = [];
    const pushInfo = (title, content) => {
        info.push(
            <div className={styles.infoElement} key = {title}>
                <p>{title}</p>
                <p>{content}</p>
            </div>
        )
    }

    bookData.format && pushInfo("Format", bookData.format.name);
    bookData.publisher && pushInfo("Publisher", bookData.publisher.name);
    bookData.publication_date && pushInfo("Published", bookData.publication_date);
    bookData.language && pushInfo("Language", bookData.language.name);
    bookData.isbn && pushInfo("ISBN", bookData.isbn);

    const [showProgressModal, setShowProgressModal] = useState(false);

    const [modalSubheading, setModalHubheading] = useState();
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalButton, setModalButton] = useState([]);

    const changeEdition = async (e) => {
        setShowProgressModal(true);
        if(e.target.innerText === "Selected edition"){
            setModalHubheading("This is your selected edition");
            setModalButton([<Button onClickFn = {() =>  setShowProgressModal(false)} key = {"close"}>Close</Button>]);
            setModalSuccess(false);
        }else{
            await BookService.changeEdition(e.target.parentElement.parentElement.parentElement.id).then(resp => {
                if(resp === -1){
                    setModalHubheading("To change edition please create an account");
                    setModalButton([
                        <Button onClickFn = {() =>  setShowProgressModal(false)} secondary key = {"close"}>Close</Button>,
                        <Button href = {"signup"} key = {"sign_up"}>Sign up</Button>
                    ]);
                    setModalSuccess(false);
                }else{
                    setModalHubheading("Your edition was changed");
                    setModalButton([
                        <Button onClickFn = {() =>  {setShowProgressModal(false); window.location.reload()}} key = {"close"}>Close</Button>,
                    ])
                    setModalSuccess(true);
                }
            });
        }
    }

    return (
        <>
        {showProgressModal && <Modal 
                title={"Change edition"} 
                subheading = {modalSubheading}
                button = {modalButton}
                success = {modalSuccess}>
                </Modal>
                }
        <div className={styles.wrapper} id={bookData.bookId} onClick = {(e) => {
            if(e.target.nodeName !== "BUTTON"){
            context.setLocation({location: '/book'});                
            navigate("/book/"+bookData.bookId);
              }
             }}
            >
            <div className={styles.top}>
                <div className={styles.basicInfo}>
                    <div className={styles.cover}>
                        <img className={styles.coverImg} src={bookData.imgUrl !== null ? bookData.imgUrl : noCover} alt={`Cover ${bookData.title}`} />                    
                    </div>
                    <div className={styles.infoTop}>
                    <div className={styles.seriesName}>{bookData.series_name == null ? "No series" : `${bookData.series_name.name} ${bookData.series_number ? `#${bookData.series_number}` : ""}`}</div>
                        <div className={styles.title}>{bookData.title}</div>
                        <div className={styles.authors}>{authors.join(", ")}</div>
                        <div className={styles.pages}>
                            <div className={styles.pageNumber}>{`${bookData.page_number} pages`}</div>
                         </div>
                    </div>
                </div>
                <div className={styles.button}>
                    {
                        bookData.selectedEdition ? <Button secondary checked onClickFn={changeEdition}>Selected edition</Button> : <Button onClickFn={changeEdition}>Select edition</Button>
                    }
                </div>
            </div>
            <div className={styles.info}>
                        {info}
            </div>

            <div className={styles.blobs}>
                    <img src={blobOrange} alt={"Blob orange"} />
                    <img src={blobPink} alt={"Blob pink"} />
            </div>
        </div>
        </>
    )
}

export default BookElement;