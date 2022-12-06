import React from "react";
import styles from './Background.module.scss';

const Background = ({blobPink, blobOrange, blobTop, blobBook}) => {

    return(
        <>
        <div className= {styles.wrapper}>
            <div className={styles.overlay}></div>
        </div>
        <img className = {`${styles.img} ${styles.blobPink} ${blobBook? styles.book: ""}`} src={blobPink} alt="Pink blob" />
        <img className = {`${styles.img} ${styles.blobOrange} ${blobTop? styles.top: ""} ${blobBook? styles.book: ""}`} src={blobOrange} alt="Orange blob" />
        </>
    )
}

export default Background;