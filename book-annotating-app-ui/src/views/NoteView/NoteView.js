import React from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import styles from "./NoteView.module.scss";
import NoteCard from "components/Notes/NoteCard";
import GoBack from "components/GoBack/GoBack";
import quote from "assets/quote.svg";
import noteIcon from "assets/note.svg";
import noteQuote from "assets/note_quote.svg";
import more from "assets/dots.svg";
import likeIcon from "assets/like.svg";
import dislikeIcon from "assets/dislike.svg";
import privateIcon from "assets/private_icon_small.svg";
import buddyIcon from "assets/buddy_icon_small.svg";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import { useState } from "react";
import SessionService from "services/SessionService";
import AddNoteButton from "components/AddNoteButton/AddNoteButton";
import NewNoteModal from "components/NewNoteModal/NewNoteModal";
import { useEffect } from "react";
import NoteService from "services/NoteService";

const NoteView = () => {
    const location = useLocation();
    const locationState = location.state;
    const navigate = useNavigate();
    if(location.state == null){
        window.location.pathname = "/";
    }

    const iconsType = {
        "quote": quote,
        "note": noteIcon,
        "quote note":noteQuote
    }

    const type = locationState.parentNote.type
    const parentNote = locationState.parentNote;

    const accessType = {
        "public": <div className={styles.likes}>
            <div>
                <img src= {likeIcon} alt="Like icon" />
                <p>{parentNote.likes ? parentNote.likes : 0}</p>
            </div>
            <div>
                <img src= {dislikeIcon} alt="Like icon" />
                <p>{parentNote.dislikes ? parentNote.dislikes : 0}</p>
            </div>
        </div>,
        "private": <div className={styles.access}>
            <div className={styles.accessIcon}>
                <img src={privateIcon} alt="Private icon" />
            </div>
            <p>Private</p>
        </div>,
        "buddy read": <div className={styles.access}>
            <div className={styles.accessIcon}>
                <img src={buddyIcon} alt="Buddy icon" />
            </div>
            <p>Buddy</p>
        </div>
    }

    const [stateReply, setStateReply] = useState([]);
    let replies = [];

    const renderReplies = (repl) => {
        replies = [];
        repl.forEach(note => {
            replies.push(<NoteCard 
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
                noteList
                />)
        })
    }

    renderReplies(locationState.replies);
    
    useEffect(
        ()=> setStateReply(replies),[]
    )

    const [showOptions, setShowOptions] = useState(false);

    const showOptionsReply = () => {
        setShowOptions(true);
    }

    const [newReply, setNewReply] = useState();
    const [typeReply, setTypeReply] = useState()

    const openModal = (e) => {
        setShowOptions(false);
        setTypeReply(e.target.nodeName === "DIV"  ? e.target.dataset.type: e.target.parentElement.dataset.type);
        setNewReply(true);
    }

    const closeModal = async () => {
        setNewReply(false);
        await NoteService.getReplies(parentNote.noteid).then(resp => {
            renderReplies(resp);
            setStateReply(replies);
        })
    }

    let modal;
    if(SessionService.isAccesTokenValid()){
        modal = <Modal 
        title={"Reply"}
        button={<Button onClickFn={() => setShowOptions(false)}>Close</Button>}>
            <div className={styles.noteAddButtons}>
                <AddNoteButton type={"note"} icon = {noteIcon} onClickFn = {openModal}>Add note</AddNoteButton>
                <AddNoteButton type={"quote"} icon = {quote} onClickFn = {openModal}>Add quote</AddNoteButton>
                <AddNoteButton type={"quote note"} icon = {noteQuote} onClickFn = {openModal}>Add note with quote</AddNoteButton>
            </div>  
        </Modal>
    }else{
        modal = <Modal 
        title={"Reply"}
        subheading = {"To reply please create an account"}
        button={[<Button secondary onClickFn={() => setShowOptions(false)}>Close</Button>, <Button href = {"signup"} key = {"sign_up"}>Sign up</Button>]}>
        </Modal>
    }

    return(
        <>
        {showOptions && modal}
        {newReply && <NewNoteModal type = {typeReply} bookId={parentNote.bookid} page = {"parent"} parentNoteId = {parentNote.noteid} accessParent = {parentNote.access} maxPages = {parentNote.page} onCloseFn = {closeModal}/>}
        <div className={styles.wrapper}>
        <GoBack onClickFn={() => {navigate(-1)}}>Go back</GoBack>
                <section className={styles.parent}>
                <div className={styles.cardTop}>
                    <div className={styles.pageInfo}>
                        <p>page:</p>
                        <p>{parentNote.page !== null ? parentNote.page : "all"}</p>
                    </div>
                    <div className={styles.dots}>
                        <img src={more} alt="More icon" />
                    </div>
                </div>
                    <img className = {styles.img} src= {iconsType[type]} alt="Icon type" />
                    {type.includes("quote") &&<div className={styles.quoteText}>
                        {parentNote.quoteText}
                    </div>}
                    {type.includes("note") && <div className={styles.noteText}>
                        {parentNote.noteText}
                    </div>}
                    <div className={styles.bottom}>
                        <div className={styles.accessAction}>
                            {accessType[parentNote.access]}
                        </div>
                        <div className={styles.cardBottom}>
                            <div className={styles.username}>{parentNote.username}</div>
                        </div>
                    </div>
                </section>
                <section className={styles.replies}>
                    <div className={styles.buttonContainer}>
                        <Button onClickFn={showOptionsReply}>Reply</Button>
                    </div>
                    {stateReply}
                </section>
        </div>
        </>
    )
}

export default NoteView;