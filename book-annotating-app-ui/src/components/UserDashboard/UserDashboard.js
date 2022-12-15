import React from "react";
import styles from "./UserDashboard.module.scss";
import Loading from "components/Loading/Loading";
import { useState } from "react";
import BookService from "services/BookService";
import { useEffect } from "react";
import BookSummaryCard from "components/BookSummaryCard/BookSummaryCard";
import arrow from "assets/arrow_scroll.svg";
import NotesSection from "components/Notes/NotesSection";
import NoteService from "services/NoteService";

const UserDashboard = () => {
    const [isCurrentlyLoading, setCurrentlyLoading] = useState(true);
    const [currentBooks, setCurrentBooks] = useState([])
    const [userNotesLoading, setUserNotesLoading] = useState(true);
    const [userNotes, setuserNotes] = useState([])
    const [buddyNotesLoading, setBuddyNotesLoading] = useState(true);
    const [buddyNotes, setBuddyNotes] = useState([])
    const [savedLoading, setSavedLoading] = useState(true);
    const [saved, setSaved] = useState([])

    const getModels = (models) => {
        const modelArr = [];
        models.forEach(m => modelArr.push(<BookSummaryCard bookModel = {m} key = {m.bookModel.bookId}/>));
        return modelArr;
    }
    const changeCurrentBooks = (books) => {
        setCurrentBooks(getModels(books));
    }

    const changeCurrentSaved = (books) => {
        setSaved(getModels(books));
    }

    useEffect(
        ()=> {
            const loadCurrently = async () => {
                await BookService.getCurrentlyReading().then(resp => {
                    changeCurrentBooks(resp);
                    setCurrentlyLoading(false);
                });

                await NoteService.getUserNotes().then(resp => {
                    setuserNotes(resp);
                    setUserNotesLoading(false);
                })

                await NoteService.getBuddyNotes().then(resp => {
                    setBuddyNotes(resp);
                    setBuddyNotesLoading(false);
                })

                await BookService.getSaved().then(resp => {
                    changeCurrentSaved(resp)
                    setSavedLoading(false);
                });
            }

            loadCurrently();
        }, []
    )

    let scroll1 = 0;
    let scroll2 = 0;
    const scrollChange = 233 + 48 +233/2;

    //calculate scroll
    const scrollBooks = (e, forward, scroll, element) => {
        const parentScroll = document.querySelectorAll(`.${styles.bookCards}`)[element];
        const positioning = parentScroll.getBoundingClientRect();
        const gapValue = parseInt(window.getComputedStyle(parentScroll).gap.replace("px", ""));
        const backwardDiv = document.querySelectorAll(`.${styles.backwardArrow}`)[element];
        const forwardDiv = document.querySelectorAll(`.${styles.arrow}`)[element];
        let elemNum = 0;
        let wholeWidth = 0;
        [...parentScroll.children].forEach(c => {
            if(c.classList.contains(styles.arrow) || c.classList.contains(styles.backwardArrow)) return;
            elemNum++;
            wholeWidth += parseInt(window.getComputedStyle(c).width.replace("px", ""));
        })
        wholeWidth += (elemNum-1) * gapValue;

        if(forward) {
            scroll -= scrollChange;
            backwardDiv.style.display = "flex";
            backwardDiv.style.left = (-scroll - 30) + "px";
            if(wholeWidth + scroll - positioning.width <= 0){
                parentScroll.style.transform = "translateX("+(-(wholeWidth - positioning.width))+"px)";
                scroll = positioning.width - wholeWidth;
                forwardDiv.style.display = "none";
                backwardDiv.style.left = (-scroll - 30) +"px";
            }
            else{
                parentScroll.style.transform = "translateX("+scroll+"px)";
                if(e.target.nodeName === "DIV")
                    e.target.style.transform = "translateX("+(-scroll)+"px)";
                else{
                    e.target.parentElement.style.transform = "translateX("+(-scroll)+"px)";
                }
            }
        }else{
            scroll += scrollChange;
            forwardDiv.style.display = "flex";
            forwardDiv.style.transform = "translateX("+(-scroll)+"px)"
            if(scroll > 0){
                parentScroll.style.transform = "translateX(0)";
                scroll = 0;
                backwardDiv.style.display = "none";
                forwardDiv.style.transform = "translateX(0)"
            }
            else{
                parentScroll.style.transform = "translateX("+scroll+"px)";
                if(e.target.nodeName === "DIV")
                    e.target.style.left = (-scroll - 30) + "px";
                else{
                    e.target.parentElement.style.left = (-scroll - 30) + "px";
                }
            }
        }
    }


    if(isCurrentlyLoading || userNotesLoading || buddyNotesLoading) return <Loading/>
    else return(
        <>
            <section className={styles.top}>
            <div className={styles.heading}>
                <p>Currently reading</p>
            </div>
            <div className={styles.bookCards}>
            <div className={styles.backwardArrow} onClick={(e) => scrollBooks(e, false, scroll1, 0)}>
                    <img src={arrow} alt="Arrow scroll"/>
                </div>
                {currentBooks}
                <div className={styles.arrow} onClick={(e) => scrollBooks(e, true, scroll1,0)}>
                    <img src={arrow} alt="Arrow scroll"/>
                </div>
            </div>
        </section>
        <section className={styles.myNotes}>
        <div className={styles.heading}>
                <p>My notes</p>
            </div>
            <NotesSection notes = {userNotes} type = "user" cardsAmount={3}></NotesSection>
        </section>
        <section className={styles.myNotes}>
        <div className={styles.heading}>
                <p>Buddy notes</p>
            </div>
            <NotesSection notes = {buddyNotes} type = "buddy" cardsAmount={3}></NotesSection>
        </section>

        <section className={styles.top}>
            <div className={styles.heading}>
                <p>Saved to read later</p>
            </div>
            <div className={styles.bookCards}>
            <div className={styles.backwardArrow} onClick={(e) => scrollBooks(e, false, scroll2, 1)}>
                    <img src={arrow} alt="Arrow scroll"/>
                </div>
                {saved}
                <div className={styles.arrow} onClick={(e) => scrollBooks(e, true, scroll2, 1)}>
                    <img src={arrow} alt="Arrow scroll"/>
                </div>
            </div>
        </section>
        </>
    )
}

export default UserDashboard;