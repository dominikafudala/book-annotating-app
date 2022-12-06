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

    useEffect(
        () => {
            const loadBook = async () =>{
                await BookService.findBookById(bookId).then(resp => {
                    // TODO: strona 404
                    if(resp === -1) console.log("nie znaleziono");
                    else{
                        setBookData(resp);
                        setLoading(false);
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
            <BookSummary bookData = {bookData}/>
            <div style={{height: "200vh"}}></div>
        </ContentWrapper>
    )
}

export default BookView;