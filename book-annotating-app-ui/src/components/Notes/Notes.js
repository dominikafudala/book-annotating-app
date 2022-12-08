import React from "react";
import styles from "./Notes.module.scss";
import NotesSection from "./NotesSection";

const Notes = ({isLoggedIn, publicNotes}) => {
    return(
        <div className={styles.wrapper}>
            <NotesSection title = {"Community notes"} notes= {publicNotes} type = {"community"}/>
        </div>
    )
}

export default Notes;