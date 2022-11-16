import React from "react";
import styles from './Background.module.scss';
import blobBigPink from "assets/blob_big_pink.svg";
import blobSmallPink from "assets/blob_small_pink.svg";
import blobBigOrange from "assets/blob_big_orange.svg";
import blobSmallOrange from "assets/blob_small_orange.svg";

const Background = ({blobBig}) => (
    <div className= {styles.wrapper}>
        <div className={styles.overlay}></div>
        <img className = {styles.blobPink} src={blobBig ? blobBigPink : blobSmallPink} alt="Pink blob" />
        <img className = {styles.blobOrange} src={blobBig ? blobBigOrange : blobSmallOrange} alt="Orange blob" />
    </div>
)

export default Background;