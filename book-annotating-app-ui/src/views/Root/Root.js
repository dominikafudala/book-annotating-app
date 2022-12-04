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
import PrivateRoute from "components/PrivateRoute/PrivateRoute";

const PAGES = {
    signup: 'signup',
    login: 'login',
    reset: 'reset',
    check: 'check',
    set: 'set',
    checkSignup: 'checkSignup',
    verifyEmail: 'VerifyMail',
    addBook: 'addBook',
    newBook: 'newBook'
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
                blobBig={location.location !== `/${PAGES.signup}` ? true : false}
                blobTop={location.location === `/${PAGES.newBook}` ? true : false}
                />
            <Header/>
            <Routes>
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
            </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    )
}

export default Root;