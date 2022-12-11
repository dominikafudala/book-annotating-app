import React from "react";
import styles from "./BookList.module.scss";
import BookElement from "./BookElement";


const BookList = ({data}) => {
    const books = [];
    data.forEach((element, index) => {
        books.push(<BookElement bookData={element} key = {index}/>)
    });
    return(
        <div className={styles.wrapper}>
            {books}
        </div>
    )
}

export default BookList;