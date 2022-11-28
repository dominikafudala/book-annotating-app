import React from "react";
import styles from './Title.module.scss';

const Title = ({children, smaller}) => (
        <h1 className={`${styles.title} ${smaller ? styles.smaller : ""}`}>{children}</h1>
    )

export default Title;