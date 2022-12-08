import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import BookSummary from "components/BookSummary/BookSummary";
import Loading from "components/Loading/Loading";
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BookService from "services/BookService";
import { useEffect } from "react";
import Notes from "components/Notes/Notes";
import NoteService from "services/NoteService";

const BookView = () => {
    const params = useParams();
    const bookId = params.bookid;

    const [isLoading, setLoading] = useState(true);
    const [bookData, setBookData] = useState();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [progress, setProgress] = useState();

    const updateProgressFn = async (newProgress) => {
        if(newProgress < 0 || newProgress > bookData.page_number) return;
        else{
            await BookService.updateBookProgress(newProgress, bookId).then(resp => {
                if(resp !== -1) {
                    window.location.reload();
                }
            });
        }
    }

    //set loading or set book data and set if user logged in
    useEffect(
        () => {
            const loadBook = async () =>{
                await BookService.findBookById(bookId).then(resp => {
                    // TODO: strona 404
                    if(resp === -1) console.log("nie znaleziono");
                    else{
                        setBookData(resp);
                        BookService.getBookProgress(bookId).then(progressResp => {
                            if(progressResp === -1){
                                setLoggedIn(false);
                                setProgress(0);
                            }else{
                                setLoggedIn(true);
                                setProgress(progressResp);
                            }
                            setLoading(false);
                        })
                    }
                })
            };
            loadBook();
        }, []
    )

    const [publicNotes, setPublicNotes] = useState();
    const [isLoadingPublicNotes, setisLoadingPublicNotes] = useState(true);
    const [userNotes, setUserNotes] = useState();
    const [isLoadingUserNotes, setisLoadingUserNotes] = useState(true);
    const [buddyNotes, setBuddyNotes] = useState();
    const [isLoadingBuddyNotes, setisLoadingBuddyNotes] = useState(true);

    //set loading or notes
    useEffect(
        () => {
            const loadNotes = async () => {
                await NoteService.getPublicNotes(bookId).then(resp => {
                    if (resp === -1) console.log("Błąd");
                    else {
                        setPublicNotes(resp);
                        setisLoadingPublicNotes(false);
                    }
                })

                if(isLoggedIn){
                    await NoteService.getUserNotes(bookId).then(resp => {
                        if(resp === -1) console.log("Błąd");
                        else{
                            setUserNotes(resp);
                            setisLoadingUserNotes(false);
                        }
                    });
                    await NoteService.getBuddyNotes(bookId).then(resp => {
                        if(resp === -1) console.log("Błąd");
                        else{
                            setBuddyNotes(resp);
                            setisLoadingBuddyNotes(false);
                        }
                    });
                }else{
                    setisLoadingBuddyNotes(false);
                    setisLoadingUserNotes(false);
                }
            };
            loadNotes();
        },[isLoggedIn]
    )

    if(isLoading || isLoadingPublicNotes || isLoadingUserNotes || isLoadingBuddyNotes) return <Loading/>
    else
    return(
        <ContentWrapper>
            <BookSummary bookData = {bookData} userLoggedIn = {isLoggedIn} userProgress = {progress} updateProgressFn = {updateProgressFn}/>
            <Notes isLoggedIn={isLoggedIn} publicNotes = {publicNotes} userNotes = {userNotes} buddyNotes = {buddyNotes}/>
        </ContentWrapper>
    )
}

export default BookView;