import React from "react";
import styles from "./Notes.module.scss";
import NotesSection from "./NotesSection";
import AddNoteButton from "components/AddNoteButton/AddNoteButton";
import quote from "assets/quote.svg";
import note from "assets/note.svg";
import noteQuote from "assets/note_quote.svg";
import NewNoteModal from "components/NewNoteModal/NewNoteModal";
import { useState } from "react";

const Notes = ({isLoggedIn, publicNotes, userNotes, buddyNotes, bookLength, userProgress, bookId, authors, title}) => {
    const [modal, setModal] = useState(false);
    const [type, setType] = useState();

    const closeModal = () => {
        setModal(false);
        window.location.reload();
    }

    const openModal = (e) => {
        const type = e.target.nodeName === "DIV"  ? e.target.dataset.type: e.target.parentElement.dataset.type
        setType(type);
        setModal(true)
    }


    return(
        <>
        {modal && <NewNoteModal type = {type} bookId={bookId} page = {userProgress} maxPages = {bookLength} onCloseFn = {closeModal}/>}
        <div className={styles.wrapperWhole}>
            {isLoggedIn &&
            <div className={styles.noteAddButtons}>
                <AddNoteButton type={"note"} icon = {note} onClickFn = {openModal}>Add note</AddNoteButton>
                <AddNoteButton type={"quote"} icon = {quote} onClickFn = {openModal}>Add quote</AddNoteButton>
                <AddNoteButton type={"quote note"} icon = {noteQuote} onClickFn = {openModal}>Add note with quote</AddNoteButton>
            </div>          
            
            }        
            <div className={styles.wrapper}>
                {isLoggedIn 
                    &&
                    <NotesSection title = {"My notes"} notes= {userNotes} type = {"user"} bookid = {bookId} bookLength = {bookLength} authorsData = {authors} titleData = {title} userProgress = {userProgress}/>
                }
                {isLoggedIn
                &&
                <NotesSection title = {"Buddy read notes"} notes= {buddyNotes} type = {"buddy"} bookid = {bookId} bookLength = {bookLength} authorsData = {authors} titleData = {title} userProgress = {userProgress}/>
                }
                <NotesSection title = {"Community notes"} notes= {publicNotes} type = {"community"} bookid = {bookId} bookLength = {bookLength} authorsData = {authors} titleData = {title} userProgress = {userProgress}/>
            </div>
        </div>  
        </>
    )
}

export default Notes;