import React from "react";
import styles from "./NotesSection.module.scss";
import Title from "components/Title/Title";
import Button from "components/Button/Button";
import NoteCard from "./NoteCard";
import PropTypes from 'prop-types';

const NotesSection = ({title, notes, type, cardsAmount}) => {
    const noteCards = []

    if(notes === undefined || notes.length === 0){
        noteCards.push(
            <div className={styles.empty} key = {"empty"}>No notes added</div>
        )
    }else{
        for(let i = 0;  i < notes.length && i < cardsAmount; i++){
            noteCards.push(
                <NoteCard 
                page = {notes[i].page} 
                type = {notes[i].noteType.name} 
                quoteText = {notes[i].quote} 
                noteText = {notes[i].note} 
                likes = {notes[i].likes}
                dislikes = {notes[i].dislikes} 
                access = {notes[i].access.name} 
                username = {notes[i].user.username} 
                replies = {notes[i].replies}
                key = {notes[i].id}/>
            )
        }
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title smaller>{title}</Title>
                <div className={styles.buttonContainer}>
                    <Button>See all <p className={styles.amount}>({notes !== undefined ? notes.length : 0})</p></Button>
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