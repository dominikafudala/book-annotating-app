import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import AppContext from "contexts/LocationContext";
import Background from "components/Background/Background";
import Header from "components/Header/Header";
import SignUpView from "views/SignUpView/SignUpView";
import LoginView from "views/LoginView/LoginView";
import ResetPasswordView from "views/ResetPasswordView/ResetPasswordView";
import CheckEmailView from "views/ResetPasswordView/CheckEmailView";
import SetNewPasswordView from "views/ResetPasswordView/SetNewPasswordView";
import CheckEmailSignupView from "views/SignUpView/CheckEmailSignupView";
import VerifyEmailView from "views/SignUpView/VerifyEmailView";
import AddBookView from "views/AddBookView/AddBookView";
import NewBookView from "views/NewBookView/NewBookView";
import BookView from "views/BookView/BookView";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import EditionView from "views/EditionView/EditionView";
import BookSearchView from "views/BookSearchView/BookSearchView";
import NotesView from "views/NotesView/NotesView";
import NoteView from "views/NoteView/NoteView";
import DashboardView from "views/DashboardView/DashboardView";

import blobBigPink from "assets/blob_big_pink.svg";
import blobSmallPink from "assets/blob_small_pink.svg";
import blobBigOrange from "assets/blob_big_orange.svg";
import blobSmallOrange from "assets/blob_small_orange.svg";
import blobTopOrange from "assets/blob_top_orange.svg";
import blobTopPink from "assets/blob_top_pink.svg";
import blobOrangeBook from "assets/blobOrangeBook.svg";
import blobPinkBook from "assets/blobPinkBook.svg";
import blobPinkMain from "assets/blob_pink_main.svg";
import blobOrangeMain from "assets/blob_orange_main.svg";

const PAGES = {
    signup: 'signup',
    login: 'login',
    reset: 'reset',
    check: 'check',
    set: 'set',
    checkSignup: 'checkSignup',
    verifyEmail: 'VerifyMail',
    addBook: 'addBook',
    newBook: 'newBook',
    book: 'book',
    edition: 'edition',
    notes: 'notes',
    note: 'note',
    dashboard: 'dashboard'
}

const Root = () => {
    const [location, setLocation] = useState({
        location : window.location.pathname
    })


    const context = {PAGES, setLocation};

    return (
        <BrowserRouter>
        <AppContext.Provider value={context}> 
            <Background 
                blobPink = {
                    location.location === "/" || location.location==`/${PAGES.dashboard}`?
                    blobPinkMain:
                    location.location !== `/${PAGES.signup}` ?
                    location.location.includes(`/${PAGES.newBook}`) || location.location==`/${PAGES.note}`? 
                    blobTopPink :
                    location.location.includes(`/${PAGES.book}`) ?
                    blobPinkBook : 
                    location.location.includes(`/${PAGES.edition}`) || location.location.includes(`/${PAGES.notes}`) ?
                    null :             
                    blobBigPink : 
                    blobSmallPink
                } 

                blobOrange = {
                    location.location === "/" || location.location==`/${PAGES.dashboard}`?
                    blobOrangeMain:
                    location.location !== `/${PAGES.signup}` ? 
                    location.location.includes(`/${PAGES.newBook}`) || location.location ==`/${PAGES.note}` ? 
                    blobTopOrange : 
                    location.location.includes(`/${PAGES.book}`) ?
                    blobOrangeBook:
                    location.location.includes(`/${PAGES.edition}`) || location.location.includes(`/${PAGES.notes}`)?
                    null :  
                    blobBigOrange : 
                    blobSmallOrange
                }
                blobTop={location.location === `/${PAGES.newBook}` || location.location === "/" || location.location==`/${PAGES.note}` || location.location==`/${PAGES.dashboard}` ? true : false}
                blobBook={location.location.includes(`/${PAGES.book}`) ? true : false}
                blobMain = {location.location === "/" || location.location==`/${PAGES.dashboard}`? true : false}
                />
            <Header/>
            <Routes>
                <Route exact path = {`/`} element = {<BookSearchView/>}></Route>
                <Route exact path = {`/${PAGES.signup}`} element = {<SignUpView/>}></Route>
                <Route exact path = {`/${PAGES.login}`} element = {<LoginView/>}></Route>
                <Route exact path = {`/${PAGES.reset}`} element = {<ResetPasswordView/>}></Route>
                <Route exact path = {`/${PAGES.check}`} element = {<CheckEmailView/>}></Route>
                <Route exact path = {`/${PAGES.set}`} element = {<SetNewPasswordView/>}></Route>
                <Route exact path = {`/${PAGES.checkSignup}`} element = {<CheckEmailSignupView/>}></Route>
                <Route path = {`/${PAGES.verifyEmail}`} element = {<VerifyEmailView/>}></Route>
                <Route exact path={`/${PAGES.addBook}`} element={<PrivateRoute/>}>
                    <Route path = {`/${PAGES.addBook}`} element = {<AddBookView/>}></Route>
                </Route>
                <Route exact path={`/${PAGES.newBook}`} element={<PrivateRoute/>}>
                    <Route path = {`/${PAGES.newBook}`} element = {<NewBookView/>}></Route>
                </Route>
                <Route path = {`/${PAGES.book}/:bookid`} element = {<BookView/>}></Route>
                <Route path = {`/${PAGES.edition}/:editionid`} element = {<EditionView/>}></Route>
                <Route path = {`/${PAGES.notes}`} element = {<NotesView/>}></Route>
                <Route exact path={`/${PAGES.dashboard}`} element={<PrivateRoute/>}>
                    <Route path = {`/${PAGES.dashboard}`} element = {<DashboardView/>}></Route>
                </Route>
                <Route exact path = {`/${PAGES.note}`} element = {<NoteView/>}></Route>
            </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    )
}

export default Root;