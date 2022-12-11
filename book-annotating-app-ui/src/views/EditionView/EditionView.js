import React from "react";
import HeaderBookNav from "components/HeaderBookNav/HeaderBookNav";
import {useLocation} from 'react-router-dom';
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import Loading from "components/Loading/Loading";
import { useState } from "react";
import BookService from "services/BookService";
import { useEffect } from "react";
import LeftContentWrapper from "components/LeftContentWrapper/LeftContentWrapper";
import BookList from "components/BookList/BookList";
import { useNavigate } from "react-router-dom";

const EditionView = () => {
    const location = useLocation();
    const [isLoading, setLoading] = useState(true);

    const editionId = window.location.href.slice(window.location.href.lastIndexOf("/") + 1);
    const [bookData, setBookData] = useState();

    useEffect(
        () => {
            const loadBooks = async () =>{
                await BookService.getAllBookEditions(editionId).then(resp => {
                    // TODO: strona 404
                    if(resp === -1) console.log("nie znaleziono");
                    else{
                        setBookData(resp);
                        setLoading(false);
                    }
                })
            };
            loadBooks();
        }, []
    )

    if(isLoading) return <Loading/>
    return(
        <>
            <HeaderBookNav bookAuthors={location.state ? location.state.bookAuthors : []} bookTitle = {location.state ? location.state.bookTitle: ""}/>
            <ContentWrapper>
                <LeftContentWrapper></LeftContentWrapper>
                <BookList data = {bookData}/>
            </ContentWrapper>
        </>
    )
}

export default EditionView;

