import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import SignUpView from "views/SignUpView/SignUpView";
import LoginView from "views/LoginView/LoginView";
import ResetPasswordView from "views/ResetPasswordView/ResetPasswordView";
import CheckEmailView from "views/ResetPasswordView/CheckEmailView";
import SetNewPasswordView from "views/ResetPasswordView/SetNewPasswordView";
import Background from "components/Background/Background";
import Header from "components/Header/Header";

const Root = () => {

    const location = window.location.pathname;

    return (
        <BrowserRouter>
            <Background blobBig={location !== "/signup" ? true : false}/>
            <Header/>
            <Routes>
                <Route path = '/signup' element = {<SignUpView/>}></Route>
                <Route path = '/login' element = {<LoginView/>}></Route>
                <Route path = '/reset' element = {<ResetPasswordView/>}></Route>
                <Route path = '/check' element = {<CheckEmailView/>}></Route>
                <Route path = '/set' element = {<SetNewPasswordView/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Root;