import React from "react";
import styles from "./NotesSection.module.scss";
import Title from "components/Title/Title";
import Button from "components/Button/Button";
import NoteCard from "./NoteCard";
import PropTypes from 'prop-types';
import LocationContext from "contexts/LocationContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NotesSection = ({title, notes, type, cardsAmount, bookLength, authorsData, titleData, userProgress}) => {
    const noteCards = []
    const context = useContext(LocationContext);
    const navigate = useNavigate();

    if(notes === undefined || notes.length === 0){
        noteCards.push(
            <div className={styles.empty} key = {"empty"}>No notes added</div>
        )
    }else{
        for(let i = 0;  i < notes.length && i < cardsAmount; i++){
            noteCards.push(
                <NoteCard 
                noteid={notes[i].id}
                page = {notes[i].page} 
                type = {notes[i].noteType.name} 
                quoteText = {notes[i].quote} 
                noteText = {notes[i].note} 
                likes = {notes[i].likes}
                dislikes = {notes[i].dislikes} 
                access = {notes[i].access.name} 
                username = {notes[i].user.username} 
                replies = {notes[i].replies}
                bookid= {notes[i].book.id}
                key = {notes[i].id}/>
            )
        }
    }

    const seeAllNotes = () => {
        context.setLocation({location: '/notes'})
        navigate("/notes", {state: {notes: notes, type: type, bookLength: bookLength,bookAuthors: authorsData, bookTitle: titleData, progress: userProgress}});
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title smaller>{title}</Title>
                <div className={styles.buttonContainer}>
                    <Button onClickFn={seeAllNotes}>See all <p className={styles.amount}>({notes !== undefined ? notes.length : 0})</p></Button>
                </div>
            </div>
            <div className={styles.notesContainer}>
                {noteCards}
            </div>
        </div>
    )
}

NotesSection.defaultProps = {
    cardsAmount: 2,
}

export default NotesSection;