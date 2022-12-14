import React from "react";
import {useLocation} from 'react-router-dom';
import HeaderBookNav from "components/HeaderBookNav/HeaderBookNav";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import styles from "./NotesView.module.scss";
import NoteCard from "components/Notes/NoteCard";
import Input from "components/Input/Input";
import { useState } from "react";
import { useEffect } from "react";

const NotesView = () => {
    const location = useLocation();
    const locationState = location.state;
    if(location.state == null){
        window.location.pathname = "/";
    }

    const [notes, setNotes] = useState([]);
    const originalNotes = [];
    locationState.notes.forEach( note => {
        originalNotes.push(<NoteCard 
            noteid={note.id}
            page = {note.page} 
            type = {note.noteType.name} 
            quoteText = {note.quote} 
            noteText = {note.note} 
            likes = {note.likes}
            dislikes = {note.dislikes} 
            access = {note.access.name} 
            username = {note.user.username} 
            replies = {note.replies}
            key = {note.id}
            noteList/>)
    })

    useEffect(()=> {
        setNotes(originalNotes);
        filterNotesByPages();
    }, []);


    const [pagesFilter, setPagesFilter] = useState(locationState.progress)
    const [accessFilter, setAccessFilter] = useState("All");
    const [progressError, setProgressError] = useState(false);

    const filterNotesByPages = (e) => {
        if(e === undefined){
            if(pagesFilter != 0){
                const filteredNotes = [...originalNotes].filter(el =>  el.props.page == pagesFilter);
                setNotes(filteredNotes)
            }else{
                setNotes(originalNotes);
            }
        }else{
            setPagesFilter(e.target.value);
            if(e.target.value.length === 0) {
                setNotes(originalNotes);
                return
            } else if(e.target.value > locationState.bookLength){
                setProgressError(true);
                return;
            }
            setProgressError(false);
            const filteredNotes = [...originalNotes].filter(el =>  el.props.page == e.target.value && el.props.access == accessFilter.toLowerCase());
            setNotes(filteredNotes);
        }
    }

    const filterNotesAccess = (e) => {
        const classActiveName = styles.active;
        if(e.target.classList.contains(classActiveName)) 
            return;
        const activeAccess = document.querySelectorAll(`.${styles.access} div`)
        
        activeAccess.forEach(el => el.classList.remove(classActiveName));
        e.target.classList.add(classActiveName);
        if(e.target.innerText == "All"){
            setAccessFilter(e.target.innerText);
            filterNotesByPages();
            return;
        }
        setAccessFilter(e.target.innerText);
        setNotes([...originalNotes]
            .filter(el =>  el.props.access == e.target.innerText.toLowerCase() 
            &&
            (pagesFilter  != 0 && pagesFilter.length !== 0 ? el.props.page == pagesFilter : true)));
    }

    return(
        <>
             <HeaderBookNav bookAuthors={locationState ? locationState.bookAuthors : []} bookTitle = {locationState ? locationState.bookTitle: ""}/>
             
             <ContentWrapper>
                <section className={styles.notes}>
                <div className={styles.controls}>
                    <div className={styles.pages}>
                        Page 
                        <Input 
                        name = {"pages"} 
                        smallInput 
                        type={"number"}
                        label= {""} 
                        key = {"page_note"} 
                        defaultValue = {locationState.progress ? locationState.progress : 0} 
                        min = {0} 
                        max = {locationState.bookLength} 
                        onChange = {filterNotesByPages} 
                        errorInput = {progressError}>

                        </Input>
                        /{locationState.bookLength}
                    </div>
                    <div className={styles.access}>
                        {locationState.type === "user" && <div className={locationState.type === "user" ? styles.active : ""} onClick = {filterNotesAccess}>All</div>}
                        {locationState.type === "user" &&<div onClick = {filterNotesAccess}>Private</div>}
                        {(locationState.type === "user" ||
                        locationState.type === "community") &&                            
                            <div className={locationState.type === "community" ? styles.active : ""}  onClick = {filterNotesAccess}>Public</div>}
                        {(locationState.type === "user" ||
                        locationState.type === "buddy")
                        &&
                            <div className={locationState.type === "buddy"? styles.active : ""}  onClick = {filterNotesAccess}>Buddy</div>}
                    </div>
                </div>
                    {notes}
                </section>
             </ContentWrapper>
        </>
    )
}

export default NotesView;