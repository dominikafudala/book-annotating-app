import React from "react";
import styles from "./Heading.module.scss";

const Heading = ({children, size}) => (
    <h2 className={`${styles.heading} ${styles.heading}-${size}`}>{children}</h2>
)

export default Heading;