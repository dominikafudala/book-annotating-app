import React from "react";
import styles from "./BookSummaryCard.module.scss";
import noCover from "assets/book_no_cover.png"
import LocationContext from "contexts/LocationContext";
import { useContext } from "react";
import noteIcon from "assets/note.svg";


const BookSummaryCard = ({bookModel, basic}) => {
    const locationContext = useContext(LocationContext);
    const classBasic = basic ? styles.basic : styles.full;
    const book = bookModel.bookModel;
    const authors = [];
    
    book.authors.forEach(
        a => authors.push(a.name)
    )

    return(
        <div className={`${styles.wrapper} ${classBasic}`} onClick = {() => window.location.pathname = locationContext.PAGES.book + "/" + book.bookId}>
            <div className={styles.cover}>
                <img src={book.imgUrl !== null ? book.imgUrl : noCover} alt="Book cover"/>
            </div>
            <div className={styles.info}>
                <div className={styles.basicInfo}>
                    <div className={styles.title}>{book.title}</div>
                    <div className={styles.authors}>{authors.join(", ")}</div>
                </div>
                <div className={styles.replies}>
                <img src={noteIcon} alt="Reply icon" />
                <p>{bookModel.replies}</p>
            </div>
            </div>
        </div>
    )

}

export default BookSummaryCard;