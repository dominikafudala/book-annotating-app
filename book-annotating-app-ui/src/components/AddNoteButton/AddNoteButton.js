import React, { Children } from "react";
import styles from "./AddNoteButton.module.scss";

const AddNoteButton = ({type, icon, children, onClickFn}) => (
    <div className={styles.wrapper} data-type = {type} onClick = {onClickFn}>
        <img src={icon} alt="Type icon" />
        <p>{children}</p>
    </div>
)

export default AddNoteButton;