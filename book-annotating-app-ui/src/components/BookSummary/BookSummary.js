import React from "react";
import styles from "./BookSummary.module.scss";
import saveIcon from "assets/save.svg";
import { useEffect } from "react";
import Button from "components/Button/Button";
import noCover from "assets/book_no_cover.png"

const BookSummary = ({bookData}) => {
    // calculating position of fixed elements
    useEffect(
        () => {
            const summary = document.querySelector(`.${styles.wrapper}`);
            const imgCover = document.querySelector(`.${styles.coverImg}`);
            const cover = document.querySelector(`.${styles.cover}`);
            const save = document.querySelector(`.${styles.save}`);
            let windowHeight = window.innerHeight;
            let lastScrollY = window.scrollY;
            summary.style.top = `${windowHeight/2 - summary.offsetHeight/2 -124}px`;
            let boundingSummary = summary.getBoundingClientRect();
            let boundingCover = cover.getBoundingClientRect();
            imgCover.style.top = `${boundingCover.y}px`;
            imgCover.style.left = `${boundingCover.x}px`;
            save.style.top = `${boundingSummary.y + 26}px`;
            save.style.left = `${boundingSummary.x + boundingSummary.width - 50}px`;
            document.addEventListener("scroll", () => {
                lastScrollY = window.scrollY;
                windowHeight = window.innerHeight;
                summary.style.top = `${windowHeight/2 - summary.offsetHeight/2 + lastScrollY -124}px`;
                boundingCover = cover.getBoundingClientRect();
                imgCover.style.top = `${boundingCover.y}px`;
                boundingSummary = summary.getBoundingClientRect();
                save.style.top = `${boundingSummary.y + 26}px`;
            })
            window.addEventListener("resize", () => {
                boundingCover = cover.getBoundingClientRect();
                imgCover.style.top = `${boundingCover.y}px`;
                imgCover.style.left = `${boundingCover.x}px`;
                boundingSummary = summary.getBoundingClientRect();
                save.style.top = `${boundingSummary.y + 26}px`;
                save.style.left = `${boundingSummary.x + boundingSummary.width - 50}px`;
            })
        }, []
    )

    //calcualting progress bar
    useEffect(
        () => {
            const progress = document.querySelector(`.${styles.percentProgress}`);
            if(progress === null) return;
            const userProgress = 100;
            const percent = userProgress/bookData.page_number * 100;
            progress.style.width = `${percent}%`;
        },[]
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

    return(<>
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
                <div className={styles.progress}>2</div>
                <div className={styles.bar}>
                    <div className={styles.percentProgress}></div>
                </div>
                <div className={styles.pageNumber}>{`${bookData.page_number} pages`}</div>
            </div>
            <div className={styles.info}>
                {info}
            </div>
            <div className={styles.buttons}>
                <Button secondary>See other editions</Button>
                <Button>Change progress</Button>
            </div>
            </div>
            <img className={styles.coverImg} src={bookData.imgUrl !== null ? bookData.imgUrl : noCover} alt={`Cover ${bookData.title}`} />
            <div className={styles.save}>
                <img src={saveIcon }alt={"Save icon"} />
            </div>
        </>
    )
}

export default BookSummary;