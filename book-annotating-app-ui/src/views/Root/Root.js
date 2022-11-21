import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import AppContext from "contexts/LocationContext";
import SignUpView from "views/SignUpView/SignUpView";
import LoginView from "views/LoginView/LoginView";
import ResetPasswordView from "views/ResetPasswordView/ResetPasswordView";
import CheckEmailView from "views/ResetPasswordView/CheckEmailView";
import SetNewPasswordView from "views/ResetPasswordView/SetNewPasswordView";
import Background from "components/Background/Background";
import Header from "components/Header/Header";
import { useState } from "react";
import CheckEmailSignupView from "views/SignUpView/CheckEmailSignupView";
import VerifyEmailView from "views/SignUpView/VerifyEmailView";

const PAGES = {
    signup: 'signup',
    login: 'login',
    reset: 'reset',
    check: 'check',
    set: 'set',
    checkSignup: 'checkSignup',
    verifyEmail: 'VerifyMail'
}

const Root = () => {
    const [location, setLocation] = useState({
        location : window.location.pathname
    })


    const context = {PAGES, setLocation};

    return (
        <BrowserRouter>
        <AppContext.Provider value={context}> 
            <Background blobBig={location.location !== `/${PAGES.signup}` ? true : false}/>
            <Header/>
            <Routes onChange = {() => console.log(location.location)}>
                <Route path = {`/${PAGES.signup}`} element = {<SignUpView/>}></Route>
                <Route path = {`/${PAGES.login}`} element = {<LoginView/>}></Route>
                <Route path = {`/${PAGES.reset}`} element = {<ResetPasswordView/>}></Route>
                <Route path = {`/${PAGES.check}`} element = {<CheckEmailView/>}></Route>
                <Route path = {`/${PAGES.set}`} element = {<SetNewPasswordView/>}></Route>
                <Route path = {`/${PAGES.checkSignup}`} element = {<CheckEmailSignupView/>}></Route>
                <Route path = {`/${PAGES.verifyEmail}`} element = {<VerifyEmailView/>}></Route>
            </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    )
}

export default Root;