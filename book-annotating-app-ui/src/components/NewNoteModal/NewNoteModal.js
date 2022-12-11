import React from "react";
import { useState } from "react";
import styles from "./NewNote.module.scss";
import quote from "assets/quote.svg";
import noteIcon from "assets/note.svg";
import noteQuote from "assets/note_quote.svg";
import Title from "components/Title/Title";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { useEffect } from "react";
import BuddyReadService from "services/BuddyReadService";
import SelectInput from "components/Input/SelectInput";
import NoteService from "services/NoteService";
import Modal from "components/Modal/Modal";
import Background from "components/Background/Background";

const NewNoteModal = ({type, bookId, page, maxPages, onCloseFn}) => {
    const [progressError, setProgressError] = useState(false);

    const iconsType = {
        "quote": quote,
        "note": noteIcon,
        "quote note":noteQuote
    }

    const headingText = {
        "quote": "Add quote",
        "note": "Add note",
        "quote note": "Add note with quote"
    }

    const [note, setNote] = useState({
        bookId: bookId,
        type: type,
        page: page === 0 ? null : page,
        access: "private",
        quote: null,
        note: null,
        parentNoteId: null,
        buddyReadId: null
    })

    const [isBuddyRead, setIsBuddyRead] = useState(false);
    const [buddyReads, setBuddyReads] = useState([]);
    useEffect(
        () => {
            const getBuddyReads = async() => {
                await BuddyReadService.getBuddyReads(bookId).then(resp => {
                    if(resp === -1) console.log("Błąd");
                    else{
                        const buddyReadData = [];
                        resp.forEach(buddyRead => {
                            const buddyids = buddyReadData.map(el => el.id);
                            if(buddyids.includes(buddyRead.id.buddyReadId))
                                {
                                    buddyReadData.find(el => el.id === buddyRead.id.buddyReadId).name+= `, ${buddyRead.user.username}`
                                }
                                else{
                                    buddyReadData.push({
                                        id:buddyRead.id.buddyReadId,
                                        name: buddyRead.buddyRead.book.title + " with " + buddyRead.user.username
                                    })
                                }
                        })
                        setBuddyReads(buddyReadData);
                        setIsBuddyRead(true);
                    }
                })
            }

            if(note.access === "buddy" && buddyReads.length === 0) getBuddyReads();
            else if(note.access === "buddy" )setIsBuddyRead(true);
            else setIsBuddyRead(false);
        }
        ,[note.access]
    )

    const changeAccessFn = (e) => {
        const classActiveName = styles.active;
        if(e.target.classList.contains(classActiveName)) 
            return;
        const activeAccess = document.querySelectorAll(`.${styles.access} div`)
        
        activeAccess.forEach(el => el.classList.remove(classActiveName));
        e.target.classList.add(classActiveName);

        setNote(prev => ({
            ...prev,
            access: e.target.textContent.toLowerCase()
        }))
    }

    const [userPages, setUserPages] = useState(page)
    const updatePages = (e) => {
        setUserPages(e.target.value);
        if(e.target.value.length === 0){
            setProgressError(false);
                setNote(prev => ({
                    ...prev,
                    page: null
                }))
        }else{
            if(e.target.value < 0 || e.target.value > maxPages)
            {
                setProgressError(true);
            }
            else{
                setProgressError(false);
                setNote(prev => ({
                    ...prev,
                    page: e.target.value
                }))
            }
        }
    }

    const [noteError, setNoteError] = useState(false);
    const [quoteError, setQuoteError] = useState(false);

    const [successModal, setSuccessModal] = useState(false);

    const addNote = async () =>{
        if(type.includes("note") && note.note !== null && note.note.length !== 0 || !type.includes("note")){
            setNoteError(false);
        }
        else{
            setNoteError(true);
        }

        if(type.includes("quote") && note.quote !== null && note.quote.length !== 0 || !type.includes("quote")){
            setQuoteError(false);
        }
        else{
            setQuoteError(true);
        }  

        if((type.includes("quote") && note.quote !== null && note.quote.length !== 0 || !type.includes("quote")) &&
        (type.includes("note") && note.note !== null && note.note.length !== 0 || !type.includes("note")) && !progressError) {
            await NoteService.addNote(note).then(
                resp => {
                    if(resp === -1) console.log("Błąd");
                    else {
                        setSuccessModal(true);
                    }
                }
            )
        }
    }
    if(successModal) return <Modal title = {"Your note was added"} button = {<Button onClickFn = {onCloseFn} ey = {"close"}>Close</Button>} success = {true}/>;
    else
    return(
        <>
            <div className={styles.wrapper}>
            <div className={styles.modal}>
            <Background/>
                <img className = {styles.img} src= {iconsType[type]} alt="Icon type" />
                <Title smaller>{headingText[type]}</Title>
                <div className={styles.controls}>
                    <div className={styles.pages}>
                        Page 
                        <Input 
                        name = {"pages"} 
                        smallInput 
                        type={"number"}
                        label= {""} 
                        key = {"page_note"} 
                        value = {userPages} 
                        min = {0} 
                        max = {maxPages} 
                        onChange = {updatePages} 
                        errorInput = {progressError}>

                        </Input>
                        /{maxPages}
                    </div>
                    <div className={styles.access}>
                        <div className={styles.active} onClick = {changeAccessFn}>Private</div>
                        <div onClick = {changeAccessFn}>Public</div>
                        <div onClick = {changeAccessFn}>Buddy</div>
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    {isBuddyRead &&
                        <SelectInput 
                        name = {"buddy"} 
                        label = {"Buddy read"} 
                        placeholder = {"Select buddy read"} 
                        values = {buddyReads} 
                        startValues = {[]}
                        setStateFn = {(e) => setNote(prev => ({
                            ...prev,
                            buddyReadId: e.target.id
                        }))}
                        single
                        noAdd
                        key = {"buddy"}
                    />
                    }
                {type.includes("quote") && <Input name = {"quote"} label = {"Quote"} labelTop onChange = {(e) => {setNote(prev => ({
                        ...prev,
                        quote: e.target.value
                    }))              
                }}
                    errorInput = {quoteError}/>}

                    {type.includes("note") && <Input name = {"note"} label = {"Note"} tag= {"textarea"} onChange = {(e) => {setNote(prev => ({
                        ...prev,
                        note: e.target.value
                    })
                    )              
                }}
                    errorInput = {noteError}/>}
                </div>

                <div className={styles.buttonWrapper}>
                    <Button onClickFn = {onCloseFn} secondary key = {"close"}>Close</Button>
                    <Button onClickFn = {addNote} key={"add"}>Add note</Button>
                </div>
            </div>
        </div>
        </>
    )

}

export default NewNoteModal;