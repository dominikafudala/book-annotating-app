import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import styles from "./EntryForm.module.scss";
import Title from "components/Title/Title";
import Button from "components/Button/Button";
import Input from "components/Input/Input";
import GoBack from "components/GoBack/GoBack";
import OptionInfo from "./OptionInfo";
import Subeading from "components/Subheading/Subheading";
import BACKEND_LOCATION from "properties";
import axios from "axios";
import LocationContext from "contexts/LocationContext";
import LeftContentWrapper from "components/LeftContentWrapper/LeftContentWrapper";

const EntryForm = ({title, buttonText, page, questionText, actionText, link, subtitle}) => {

    const context = useContext(LocationContext);
    const types = context.PAGES;
    const navigation = useNavigate();

    const [user, setUser] = useState(
        {
            username: "",
            email: "",
            password: "",
            repeatPassword: ""
        }
    );

    const onChangeFn = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
         });
    };

    const onSubmitFn = async (e) => {
        e.preventDefault();

        const response = await axios.post(BACKEND_LOCATION+page, user, {
            headers: {
                'Content-Type': page === 'login' ? 'application/x-www-form-urlencoded' : 'application/json'
              }
          });

        if(page === 'login'){
            const [accessToken, refreshToken] = [response.data.access_token, response.data.refresh_token];
            ReactSession.setStoreType("localStorage");
            ReactSession.set("access_token", accessToken);
            ReactSession.set("refresh_token", refreshToken);
        }

        if(page === 'signup'){
            navigation(`/${types.checkSignup}`, {
                state: {
                    mail: user.email
                }
                });
        }
        
    }

    return (
        <LeftContentWrapper>
            <GoBack>Go back</GoBack>
            <Title>{title}</Title>
            {
                page !== types.signup && page !== types.login
                ?
                <Subeading bigger>{subtitle}</Subeading>
                :
                null
            }
            <div className={styles.action}>
                {
                    page === types.signup || page === types.login ?
                    <>
                        <Button secondary google>Sign in with Google</Button>
                        <div className={styles.orLine}>
                            <div></div>
                            <p className={styles.orText}>or</p>
                            <div></div>
                        </div>
                    </> :
                    null
                }
                {
                    page !== types.check && page !== types.checkSignup?
                    <form onSubmit={e => onSubmitFn(e)} className={styles.form}>
                        {
                            page === types.signup ?
                            <Input name = {"username"} label = {"Username"}  onChange = {onChangeFn}/> :
                            null
                        }
                        {
                            page !== types.set && page !== types.verifyEmail ?
                            <Input name = {"email"} label = {"Email"} type = {"email"} onChange = {onChangeFn}/>
                            :
                            null
                        }
                        {
                            page !== types.reset && page !== types.verifyEmail ?
                            <Input name = {"password"} label = {"Password"} type = {"password"}  onChange = {onChangeFn}/>
                            :
                            null
                        }
                        {
                            page === types.set || page === types.signup ?
                            <Input name = {"repeatPassword"} label = {"Repeat password"} type = {"password"}  onChange = {onChangeFn}/>
                            :
                            null
                        }
                        {
                            page === types.login ?
                            <Link to={`/${types.reset}`} className={styles.forgotPassword}>Forgot password?</Link>:
                            null
                        }
                        <Button href={page === types.verifyEmail ? types.login : null}>{buttonText}</Button>
                    </form>
                    :
                    null
                }
                {
                    page !== types.reset ?
                    <OptionInfo question={questionText} action = {actionText} href = {link} left={page === types.check || page === types.checkSignup ? true : false}/> 
                    :
                    null
                }
            </div>
        </LeftContentWrapper>
    )
}

export default EntryForm;