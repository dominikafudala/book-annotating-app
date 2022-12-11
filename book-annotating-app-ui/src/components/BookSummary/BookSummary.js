import React from "react";
import styles from "./BookSummary.module.scss";
import saveIcon from "assets/save.svg";
import { useEffect, useState } from "react";
import Button from "components/Button/Button";
import noCover from "assets/book_no_cover.png"
import Modal from "components/Modal/Modal";
import Input from "components/Input/Input";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";


const BookSummary = ({bookData, userProgress, userLoggedIn, updateProgressFn}) => {
    // calculating position of fixed elements
    useEffect(
        () => {
            const summary = document.querySelector(`.${styles.wrapper}`);
            const imgCover = document.querySelector(`.${styles.coverImg}`);
            const cover = document.querySelector(`.${styles.cover}`);
            const save = document.querySelector(`.${styles.save}`);
            const buttonsPlaceholder = document.querySelector(`.${styles.buttonsPlaceholder}`);
            const buttons = document.querySelector(`.${styles.buttons}`);

            let windowHeight = window.innerHeight;
            let lastScrollY = window.scrollY;

            summary.style.top = `${windowHeight/2 - summary.offsetHeight/2 -124}px`;

            let boundingSummary = summary.getBoundingClientRect();
            let boundingCover = cover.getBoundingClientRect();

            imgCover.style.top = `${boundingCover.top}px`;
            imgCover.style.left = `${boundingCover.left}px`;
            save.style.top = `${boundingSummary.y + 26}px`;
            save.style.left = `${boundingSummary.x + boundingSummary.width - 50}px`;

            let boundingButtons = buttonsPlaceholder.getBoundingClientRect();

            buttons.style.width = `${boundingButtons.width}px`;
            buttons.style.top = `${boundingButtons.top}px`
            buttons.style.left = `${boundingButtons.left}px`

            document.addEventListener("scroll", () => {
                lastScrollY = window.scrollY;
                windowHeight = window.innerHeight;
                summary.style.top = `${windowHeight/2 - summary.offsetHeight/2 + lastScrollY -124}px`;
                boundingSummary = summary.getBoundingClientRect();
                save.style.top = `${boundingSummary.y + 26}px`;

                boundingCover = cover.getBoundingClientRect();
                imgCover.style.left = `${boundingCover.left}px`;
                imgCover.style.top = `${boundingCover.top}px`;
                

                boundingButtons = buttonsPlaceholder.getBoundingClientRect();
                buttons.style.top = `${boundingButtons.top}px`
            })
            window.addEventListener("resize", () => {
                boundingCover = cover.getBoundingClientRect();
                imgCover.style.top = `${boundingCover.top}px`;
                imgCover.style.left = `${boundingCover.left}px`;

                boundingSummary = summary.getBoundingClientRect();
                save.style.top = `${boundingSummary.y + 26}px`;
                save.style.left = `${boundingSummary.x + boundingSummary.width - 50}px`;

                boundingButtons = buttonsPlaceholder.getBoundingClientRect();
                buttons.style.width = `${boundingButtons.width}px`;
                buttons.style.top = `${boundingButtons.top}px`
                buttons.style.left = `${boundingButtons.left}px`
            })
        }, []
    )

    //calcualting progress bar
    useEffect(
        () => {
            const progress = document.querySelector(`.${styles.percentProgress}`);
            if(progress === null) return;
            const percent = userProgress/bookData.page_number * 100;
            progress.style.width = `${percent}%`;
        },[userProgress]
    )

    const genres = [];

    bookData.genres.forEach(
        g => genres.push(<div className={styles.genre} key = {g.name}>{g.name}</div>)
    )

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

    const [userProgressValue, setUserProgressValue] = useState(userProgress);
    const [progressError, setProgressError] = useState(false);

    const updateUserProgress = (e) => {
        setUserProgressValue(e.target.value);
        if(e.target.value <= 0 || e.target.value > bookData.page_number)
        {
            setProgressError(true);
        }
        else{
            setProgressError(false);
        }
    }


    const changeProgressFn = () => {
        setShowProgressModal(true);
    }

    const navigate = useNavigate();
    const context = useContext(LocationContext);
    const seeOtherEditions = () => {
        context.setLocation({location: '/edition'})
        navigate("/edition/"+bookData.edition.id, {state: {bookAuthors: bookData.authors, bookTitle: bookData.title}});
    }

    return(<>
            {showProgressModal && userLoggedIn && <Modal 
                title={"Change progress"} 
                subheading = {"Enter the page you're on"}
                button = {[
                    <Button onClickFn = {() =>  setShowProgressModal(false)} secondary key = {"close"}>Close</Button>,
                    <Button onClickFn = {() => updateProgressFn(userProgressValue)} key={"update"}>Update progress</Button>
                ]}>
                    <Input name = {"progress_book"} label= {""} type = {"number"} key = {"progress_book"} value = {userProgressValue} min = {0} max = {bookData.page_number} onChange = {updateUserProgress} errorInput = {progressError}/>
                    <div className={styles.pageInfo} key = {"info"}>
                        <div>{`${Math.round(userProgress/bookData.page_number * 100)}%`}</div>
                        <div>
                            <p>{bookData.page_number}</p>
                            pages
                        </div>
                    </div>
                </Modal>}

            {showProgressModal && !userLoggedIn && <Modal 
                title={"Change progress"} 
                subheading = {"To change progress please create  an account"}
                button = {[
                    <Button onClickFn = {() =>  setShowProgressModal(false)} secondary key = {"close"}>Close</Button>,
                    <Button href = {"signup"} key = {"sign_up"}>Sign up</Button>
                ]}>
                </Modal>}
            <div className={styles.wrapper}>
                <div className={styles.cover}>                    
                </div>
                <div className={styles.genres}>
                    {genres}
                </div>
                {!bookData.reviewed && <div className={styles.notReviewed}>Not reviewed</div>}
                <div className={styles.seriesName}>{bookData.series_name == null ? "No series" : `${bookData.series_name.name} ${bookData.series_number ? `#${bookData.series_number}` : ""}`}</div>
                <div className={styles.title}>{bookData.title}</div>
                <div className={styles.authors}>{authors.join(", ")}</div>
                <div className={styles.pages}>
                    <div className={styles.progress}>{userProgress}</div>
                    <div className={styles.bar}>
                        <div className={styles.percentProgress}></div>
                    </div>
                    <div className={styles.pageNumber}>{`${bookData.page_number} pages`}</div>
                </div>
                <div className={styles.info}>
                    {info}
                </div>
                <div className={styles.buttonsPlaceholder}></div>
            </div>
            <img className={styles.coverImg} src={bookData.imgUrl !== null ? bookData.imgUrl : noCover} alt={`Cover ${bookData.title}`} />
            <div className={styles.save}>
                <img src={saveIcon }alt={"Save icon"} />
            </div>
            <div className={styles.buttons}>
                    {bookData.edition.id &&<Button onClickFn = {seeOtherEditions} secondary>See other editions</Button>}
                    <Button onClickFn={changeProgressFn}>Change progress</Button>
            </div>
        </>
    )
}

export default BookSummary;