import React from "react";
import styles from "./BookSummaryCard.module.scss";
import noCover from "assets/book_no_cover.png"
import LocationContext from "contexts/LocationContext";
import { useContext } from "react";
import noteIcon from "assets/note.svg";


const BookSummaryCard = ({bookModel, full, genreCount}) => {
    const locationContext = useContext(LocationContext);
    const classFull = full ? styles.full : "";
    const book = bookModel.bookModel;
    const authors = [];
    const genres = [];

    if(full){
        for(let i = 0; i < genreCount && i < book.genres.length; i++){
            const g = book.genres[i];
            genres.push(<div className={styles.genre} key = {"sum" + g.name}>{g.name}</div>);
        }
        if(book.genres.length > genres.length){
            genres.push(<div className={styles.genre} key = {"sum"}>+{book.genres.length - genres.length}</div>);
        }
    }
    
    book.authors.forEach(
        a => authors.push(a.name)
    )

    return(
        <div className={`${styles.wrapper} ${classFull}`} onClick = {() => window.location.pathname = locationContext.PAGES.book + "/" + book.bookId}>
            <div className={styles.cover}>
                <img src={book.imgUrl !== null ? book.imgUrl : noCover} alt="Book cover"/>
            </div>
            <div className={styles.info}>
                {full && <div className={styles.series}>
                {book.series_name == null ? "No series" : `${book.series_name.name} ${book.series_number ? `#${book.series_number}` : ""}`}
                </div>}
                <div className={styles.basicInfo}>
                    <div className={styles.title}>{book.title}</div>
                    <div className={styles.authors}>{authors.join(", ")}</div>
                </div>
                <div className={styles.replies}>
                <img src={noteIcon} alt="Reply icon" />
                <p>{bookModel.replies}</p>
            </div>
            {full && <div className={styles.genres}>
                    {genres}
                </div>}
            </div>
        </div>
    )

}

export default BookSummaryCard;