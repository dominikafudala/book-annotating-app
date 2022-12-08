import React from "react";
import styles from "./Notes.module.scss";
import NotesSection from "./NotesSection";

const Notes = ({isLoggedIn, publicNotes, userNotes, buddyNotes}) => {
    return(
        <div className={styles.wrapper}>
            {isLoggedIn 
                &&
                <NotesSection title = {"My notes"} notes= {userNotes} type = {"user"}/>
             }
             {isLoggedIn
             &&
             <NotesSection title = {"Buddy read notes"} notes= {buddyNotes} type = {"buddy"}/>
             }
            <NotesSection title = {"Community notes"} notes= {publicNotes} type = {"community"}/>
        </div>
    )
}

export default Notes;