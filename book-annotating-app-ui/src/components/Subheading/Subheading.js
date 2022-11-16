import React from "react";
import styles from "./Subheading.module.scss";

const Subeading = ({children, size}) => (
    <p className={`${styles.subheading} ${styles.subheading}-${size}`}>{children}</p>
)

export default Subeading;