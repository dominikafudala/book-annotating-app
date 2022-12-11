import React from "react";
import styles from "./BookElement.module.scss";
import noCover from "assets/book_no_cover.png";
import Button from "components/Button/Button";
import blobPink from "assets/edition_blob_pink.svg";
import blobOrange from "assets/edition_blob_orange.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import LocationContext from "contexts/LocationContext";

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

    return (
        <div className={styles.wrapper} onClick = {() => {context.setLocation({location: '/book'});
                                                            navigate("/book/"+bookData.bookId); }}>
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
                        bookData.selectedEdition ? <Button secondary>Selected edition</Button> : <Button>Select edition</Button>
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
    )
}

export default BookElement;