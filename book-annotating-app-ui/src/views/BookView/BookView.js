import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import BookSummary from "components/BookSummary/BookSummary";
import Loading from "components/Loading/Loading";
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BookService from "services/BookService";
import { useEffect } from "react";

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

    //set loading or book summary
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

    if(isLoading) return <Loading/>
    else
    return(
        <ContentWrapper>
            <BookSummary bookData = {bookData} userLoggedIn = {isLoggedIn} userProgress = {progress} updateProgressFn = {updateProgressFn}/>
            <div style={{height: "200vh"}}></div>
        </ContentWrapper>
    )
}

export default BookView;