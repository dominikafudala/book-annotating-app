import React from "react";
import styles from "./BookSummary.module.scss";
import saveIcon from "assets/save.svg";
import { useEffect } from "react";

const BookSummary = ({bookData}) => {
    useEffect(
        () => {
            const summary = document.querySelector(`.${styles.wrapper}`);
            const imgCover = document.querySelector(`.${styles.coverImg}`);
            const cover = document.querySelector(`.${styles.cover}`);
            const windowHeight = window.innerHeight;
            summary.style.top = `${windowHeight/2 - summary.offsetHeight/2}px`;
            let boundingCover = cover.getBoundingClientRect();
            imgCover.style.top = `${boundingCover.y}px`;
            imgCover.style.left = `${boundingCover.x}px`;
            document.addEventListener("scroll", () => {
                const lastScrollY = window.scrollY;
                summary.style.top = `${windowHeight/2 - summary.offsetHeight/2 + lastScrollY}px`;
                boundingCover = cover.getBoundingClientRect();
                imgCover.style.top = `${boundingCover.y}px`;
                imgCover.style.left = `${boundingCover.x}px`;
            })
            window.addEventListener("resize", () => {
                boundingCover = cover.getBoundingClientRect();
                imgCover.style.top = `${boundingCover.y}px`;
                imgCover.style.left = `${boundingCover.x}px`;
            })
        }, []
    )

    const genres = [];

    bookData.genres.forEach(
        g => genres.push(<div className={styles.genre} key = {g.name}>{g.name}</div>)
    )

    const authors = [];

    bookData.authors.forEach(
        a => authors.push(a.name)
    )
    return(<>
            <div className={styles.wrapper}>
            <div className={styles.save}>
                <img src={saveIcon }alt={"Save icon"} />
            </div>
            <div className={styles.cover}>
                
            </div>
            <div className={styles.genres}>
                {genres}
            </div>
            {bookData.reviewed && <div className={styles.notReviewed}>Not reviewed</div>}
            <div className={styles.seriesName}>{bookData.series_name == null ? "No series" : bookData.series_name}</div>
            <div className={styles.title}>{bookData.title}</div>
            <div className={styles.authors}>{authors.join(", ")}</div>
            </div>
            <img className={styles.coverImg} src={bookData.imgUrl !== null ? bookData.imgUrl : ""} alt={`Cover ${bookData.title}`} />
        </>
    )
}

export default BookSummary;