import React from "react";
import styles from "./Subheading.module.scss";

const Subeading = ({children, bigger}) => (
    <p className={`${styles.subheading} ${bigger ? styles.bigger : ""}`}>{children}</p>
)

export default Subeading;